export const START_YEAR = 2021;
export const END_YEAR = 2026;
export const TOTAL_QUARTERS = (END_YEAR - START_YEAR + 1) * 4;

export const qIndex = (year, quarter) => (year - START_YEAR) * 4 + (quarter - 1);

// Chronological order matters: later entries win shared quarters when roles overlap.
export const EXPERIENCE = [
    {
        org: 'Bain',
        title: 'Business Analyst, Co-op',
        period: 'Jan 2023 – Jun 2023',
        start: [2023, 1],
        end: [2023, 2],
        blurb: 'Piloted a knowledge-management chatbot; built a company-wide LLM prompting training video (1,500+ views).',
    },
    {
        org: 'Fells View',
        title: 'Search Fund Intern',
        period: 'Oct 2023 – Feb 2024',
        start: [2023, 4],
        end: [2024, 1],
        blurb: 'Diligenced SaaS & supply-chain targets; ran outreach to 200+ companies/month at a 22% response rate.',
    },
    {
        org: 'McKinsey',
        title: 'Solutions Delivery Analyst, Co-op',
        period: 'Jan 2024 – Jun 2024',
        start: [2024, 1],
        end: [2024, 2],
        blurb: 'Classified $25B+ in spend data; built a taxonomy framework that lifted spend efficiency 65%.',
    },
    {
        org: 'Blai',
        title: 'Co-Founder & CTO',
        period: 'Jan 2025 – Jan 2026',
        start: [2025, 1],
        end: [2026, 1],
        href: 'https://blaiapp.io',
        blurb: 'Raised $150K pre-seed, shipped a live AI crypto research & trading app, hit a $10M token market-cap ATH.',
    },
    {
        org: 'BCG',
        title: 'Returning Associate',
        period: 'Aug 2025 – Present',
        start: [2025, 3],
        end: [END_YEAR, 4],
        blurb: 'Shipped an AI retention tool to 1,000+ reps (2x retention lift) and a RAG chatbot cutting response times 40%.',
    },
];

export const EDUCATION = {
    org: 'Northeastern',
    title: 'BS, Computer Science & Business Administration',
    period: '2021 – 2025',
    start: [2021, 3],
    end: [2025, 2],
    blurb: 'Finance & Fintech concentrations · GPA 3.6/4.0 · Boston, MA',
};

export const withIntensity = (entries) =>
    entries.map((e, i) => ({
        ...e,
        intensity: entries.length === 1 ? 0.9 : 0.3 + (i / (entries.length - 1)) * 0.6,
    }));

export const buildCells = (entries) => {
    const cells = new Array(TOTAL_QUARTERS).fill(null);
    entries.forEach((entry) => {
        const from = qIndex(...entry.start);
        const to = qIndex(...entry.end);
        for (let i = from; i <= to && i < TOTAL_QUARTERS; i++) cells[i] = entry;
    });
    return cells;
};

export const spanStyle = (entry) => {
    const from = qIndex(...entry.start);
    const to = qIndex(...entry.end);
    return {
        marginLeft: `${(from / TOTAL_QUARTERS) * 100}%`,
        width: `${((to - from + 1) / TOTAL_QUARTERS) * 100}%`,
    };
};
