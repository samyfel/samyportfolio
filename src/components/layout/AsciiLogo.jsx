import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import logoSrc from '../../assets/images/af-mark.svg';

const FONT_SIZE = 10;
const CHAR_WIDTH_RATIO = 0.6;
const CHAR_ASPECT = 0.55;
const MIN_COLS = 30;
const MAX_COLS = 100;
const MIN_ALPHA = 24;
const TEXTURE_CHARS = '.:-=+*#%@';
const SCRAMBLE_CHARS = '!<>-_\\/[]{}=+*^?#%&01';
const HOVER_RADIUS = 5.5;
const HOVER_JITTER = 5.5;
const TICK_MS = 55;

// Deterministic per-cell noise (not Math.random) so a given cell's jitter
// stays fixed — otherwise the ragged edge would reshuffle every mousemove
// instead of reading as one consistent, irregular burst shape.
const cellNoise = (r, c) => {
    const x = Math.sin(r * 127.1 + c * 311.7) * 43758.5453;
    return x - Math.floor(x);
};
const SIGNAL_HEX = '#B8752E';
const FILL_RATIO = 0.7; // letterform occupies this fraction of the square
const WORK_SIZE = 320;

// The source PNG has transparent margin baked in around the mark — find the
// actual content bounds so the glyph fills the grid instead of floating in dead space.
const findContentBounds = (img) => {
    const WORK_SIZE = 300;
    const scale = Math.min(WORK_SIZE / img.naturalWidth, WORK_SIZE / img.naturalHeight, 1);
    const w = Math.max(1, Math.round(img.naturalWidth * scale));
    const h = Math.max(1, Math.round(img.naturalHeight * scale));
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);
    const { data } = ctx.getImageData(0, 0, w, h);

    let minX = w, minY = h, maxX = -1, maxY = -1;
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            if (data[(y * w + x) * 4 + 3] > MIN_ALPHA) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }
    if (maxX < minX || maxY < minY) {
        return { sx: 0, sy: 0, sw: img.naturalWidth, sh: img.naturalHeight };
    }

    const pad = 0.05;
    const bw = maxX - minX + 1;
    const bh = maxY - minY + 1;
    const padX = bw * pad;
    const padY = bh * pad;
    const sx = Math.max(0, (minX - padX) / scale);
    const sy = Math.max(0, (minY - padY) / scale);
    const sw = Math.min(img.naturalWidth - sx, (bw + padX * 2) / scale);
    const sh = Math.min(img.naturalHeight - sy, (bh + padY * 2) / scale);
    return { sx, sy, sw, sh };
};

// Recenter the cropped letter onto its own square canvas at a controlled fill
// ratio, independent of whatever margin happens to exist in the source file.
const buildSquareCanvas = (img, bounds) => {
    const canvas = document.createElement('canvas');
    canvas.width = WORK_SIZE;
    canvas.height = WORK_SIZE;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, WORK_SIZE, WORK_SIZE);

    const longSide = Math.max(bounds.sw, bounds.sh);
    const scale = (WORK_SIZE * FILL_RATIO) / longSide;
    const destW = bounds.sw * scale;
    const destH = bounds.sh * scale;
    const dx = (WORK_SIZE - destW) / 2;
    const dy = (WORK_SIZE - destH) / 2;

    ctx.drawImage(img, bounds.sx, bounds.sy, bounds.sw, bounds.sh, dx, dy, destW, destH);
    return canvas;
};

// Figure-ground reversal: the letterform stays blank (paper shows through);
// the surrounding field gets a random static texture and is what scrambles on hover.
const buildGrid = (squareCanvas, cols) => {
    const rows = Math.max(1, Math.round(cols * CHAR_ASPECT));
    const canvas = document.createElement('canvas');
    canvas.width = cols;
    canvas.height = rows;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, cols, rows);
    ctx.drawImage(squareCanvas, 0, 0, cols, rows);
    const { data } = ctx.getImageData(0, 0, cols, rows);

    const grid = [];
    for (let y = 0; y < rows; y++) {
        const row = [];
        for (let x = 0; x < cols; x++) {
            const alpha = data[(y * cols + x) * 4 + 3];
            const isLetter = alpha > MIN_ALPHA;
            const filled = !isLetter;
            const char = filled ? TEXTURE_CHARS[Math.floor(Math.random() * TEXTURE_CHARS.length)] : ' ';
            row.push({ filled, char });
        }
        grid.push(row);
    }
    return { grid, rows, cols };
};

const randomScrambleChar = () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];

const AsciiLogo = () => {
    const wrapRef = useRef(null);
    const imgRef = useRef(null);
    const boundsRef = useRef(null);
    const squareCanvasRef = useRef(null);
    const gridRef = useRef(null);
    const cellRefs = useRef([]);
    const activeRef = useRef(new Set());
    const [ready, setReady] = useState(false);
    const [, forceRender] = useState(0);

    useEffect(() => {
        const generate = () => {
            if (!imgRef.current || !wrapRef.current) return;
            const containerW = wrapRef.current.clientWidth;
            if (!containerW) return;
            const cols = Math.max(MIN_COLS, Math.min(MAX_COLS, Math.round(containerW / (FONT_SIZE * CHAR_WIDTH_RATIO))));
            if (gridRef.current && gridRef.current.cols === cols) return;
            gridRef.current = buildGrid(squareCanvasRef.current, cols);
            cellRefs.current = [];
            activeRef.current = new Set();
            setReady(true);
            forceRender((n) => n + 1);
        };

        const img = new Image();
        img.src = logoSrc;
        img.onload = () => {
            imgRef.current = img;
            boundsRef.current = findContentBounds(img);
            squareCanvasRef.current = buildSquareCanvas(img, boundsRef.current);
            generate();
        };

        const ro = new ResizeObserver(generate);
        if (wrapRef.current) ro.observe(wrapRef.current);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            activeRef.current.forEach((key) => {
                // Skipping some cells each tick (rather than refreshing the whole
                // patch in lockstep) reads as static/noise instead of one uniform
                // block blinking together.
                if (Math.random() < 0.3) return;
                const [r, c] = key.split(',').map(Number);
                const cell = gridRef.current?.grid[r]?.[c];
                const el = cellRefs.current[r]?.[c];
                if (cell?.filled && el) el.textContent = randomScrambleChar();
            });
        }, TICK_MS);
        return () => clearInterval(interval);
    }, []);

    const restoreCell = (r, c) => {
        const cell = gridRef.current?.grid[r]?.[c];
        const el = cellRefs.current[r]?.[c];
        if (cell && el) {
            el.textContent = cell.char;
            el.style.color = '';
        }
    };

    const handleMouseMove = (e) => {
        const g = gridRef.current;
        if (!g || !wrapRef.current) return;
        const rect = wrapRef.current.getBoundingClientRect();
        const charW = FONT_SIZE * CHAR_WIDTH_RATIO;
        const lineH = FONT_SIZE;
        const col = (e.clientX - rect.left) / charW;
        const row = (e.clientY - rect.top) / lineH;

        const next = new Set();
        const R = Math.ceil(HOVER_RADIUS + HOVER_JITTER)
        const baseRow = Math.round(row);
        const baseCol = Math.round(col);
        for (let dr = -R; dr <= R; dr++) {
            for (let dc = -R; dc <= R; dc++) {
                const rr = baseRow + dr;
                const cc = baseCol + dc;
                if (rr < 0 || cc < 0 || rr >= g.rows || cc >= g.cols) continue;
                // Each cell's own threshold wobbles around the base radius, so the
                // activated patch reads as a ragged burst instead of a clean disc.
                const jitter = (cellNoise(rr, cc) - 0.5) * HOVER_JITTER;
                if (Math.hypot(rr - row, cc - col) <= HOVER_RADIUS + jitter) next.add(`${rr},${cc}`);
            }
        }

        activeRef.current.forEach((key) => {
            if (!next.has(key)) {
                const [r, c] = key.split(',').map(Number);
                restoreCell(r, c);
            }
        });
        next.forEach((key) => {
            if (!activeRef.current.has(key)) {
                const [r, c] = key.split(',').map(Number);
                const cell = g.grid[r]?.[c];
                const el = cellRefs.current[r]?.[c];
                if (cell?.filled && el) el.style.color = SIGNAL_HEX;
            }
        });
        activeRef.current = next;
    };

    const handleMouseLeave = () => {
        activeRef.current.forEach((key) => {
            const [r, c] = key.split(',').map(Number);
            restoreCell(r, c);
        });
        activeRef.current = new Set();
    };

    return (
        <div ref={wrapRef} className="w-full" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            {ready && gridRef.current && (
                <motion.pre
                    initial={{ clipPath: 'inset(100% 0 0 0)', filter: 'blur(6px)' }}
                    animate={{ clipPath: 'inset(0% 0 0 0)', filter: 'blur(0px)' }}
                    transition={{ duration: 1.6, ease: 'easeOut' }}
                    className="font-mono text-ink leading-none whitespace-pre select-none cursor-crosshair"
                    style={{ fontSize: FONT_SIZE }}
                    aria-label="AF mark as negative space in a field of ASCII static — hover to scramble"
                >
                    {gridRef.current.grid.map((row, r) => (
                        <div key={r}>
                            {row.map((cell, c) => (
                                <span
                                    key={c}
                                    ref={(el) => {
                                        if (!cellRefs.current[r]) cellRefs.current[r] = [];
                                        cellRefs.current[r][c] = el;
                                    }}
                                >
                                    {cell.char}
                                </span>
                            ))}
                        </div>
                    ))}
                </motion.pre>
            )}
        </div>
    );
};

export default AsciiLogo;
