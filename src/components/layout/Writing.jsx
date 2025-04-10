import { useState, useEffect } from 'react';
import './Writing.css'; // Import the CSS file for styles
import Animation from './Animation';
import sicilyImage from '../../assets/photography/sicily_architecture.jpg'; // Import the image

function Writing() {
    const [showAnimation, setShowAnimation] = useState(false);
    const [unlocked, setUnlocked] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [expandedIndex, setExpandedIndex] = useState(null);

    // Check for existing authentication on component mount
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('writingAuthenticated');
        if (isAuthenticated === 'true') {
            setUnlocked(true);
        }
    }, []);

    const writings = [
        {
            title: "Solitude",
            excerpt: "A brief, personal, reflection on solitude.",
            content: `i think solitude is important. more specifically being comfortable in a state of solitude. this is a state that is ever present in the subconscious and that one can't escape, hence, being able to notice it, understand it and what you're feeling, and flourishing in it is extremely important. It's definitely something i'm still trying to learn myself and i think it's one of the more difficult things to master. While i tell myself that im okay with being alone and am comfortable in a state of solitude, i often revert to thinking about whether or not i actually am alone. I think at times you might not have a certain aspect of a relationship in your life and you might feel alone, and in turn, think you're alone and in solitude, when in reality that's not the case. I think few people have truly embraced a state of solitude and even fewer have been able to master it. In our daily lives i feel like we find excuses and reasons to not be alone. Relationships to fill in voids that don't necessarily need to be filled. I try and think about these relationships and open my eyes when im chasing something simply for a need of comfort versus an actual necessity. Sometimes i'll say im comfortable alone and then fill up my time and thoughts with people that maybe arent part supposed to be there in the first place and have been forced in by my urge of wanting. then again, those people and that urge and the way that my urge attracted those people was meant to happen and i was meant to be in such a place and position to notice something that maybe isn't apparent now but will be eventually.`,
            
        },
        {
            title: "Quotes",
            excerpt: "A compilation of quotes I think about.",
            content: "The right way to live is something we can teach only the dead. - Fernando Pessoa\n\nSerenita, Coraggio, Saggezza\n\nAttachment, Ignorance, Aversion\n\nSpeak like a diplomat, Think like a visionary, Act like a leader\n\npack me up like a tu mi - Ye\n\nCompare yourself to who you were yesterday, not to who someone else is today\n\nNo man is free who is not master of himself\n\n",
            
        },
        {
            title: "Matrix",
            excerpt: "Developmental philosophy of the 'Matrix'.",
            content: "I would like to define the 'Matrix' as a specific microcosm of society, we live in a world with many matrices. People can be aware they're in the matrix, some can't, others know they're in the matrix and be aware of other matrices, and some may believe that their matrix is the only matrix. I will preface this by saying that nobody is free from the matrix, the matrix is a subconscious human condition that is symbiotic with presence, the shape of the matrix is then formed by society and the environment of the individual. No one specific state of consciousness about the matrix is superior to any other state. The person who is 'aware' of the matrix has no advantage to that who is not...\n\nPeak of the materialistic matrix (as i know it) - There's a level of moeny, power, and influence in this world that very few achieve. When you find yousrelf in this upper echelon of society, normalities such as religion, values, and moral don't appeal to you to the same way. I think whether subconcsioucly or consciously this is a mindset engrained in one's brain from that level of society. I see these grotesque images, sinful events, abnormal experiences, and I realize the rules of the world don't apply to them in the way they do to the proles. It is not a correct or incorrect of being, simply different. Can one really be blamed for something that their environment imposed on them?  "
        },
        {
            title: "Mindfullness",
            excerpt: "A reflection on mindfullness.",
            content: "Life doesn’t always fall apart in dramatic ways. Sometimes the hardest parts are quiet—the days when you wake up and everything seems fine on paper, but inside, there’s just this heaviness. Like you’re doing all the things you’re supposed to, but still feel a little lost. A little numb. A little unsure about what any of it is for. If you’re feeling that way, I just want to say this: you’re not broken. You’re not alone. And you’re definitely not the only one who’s felt this. One of the biggest things I’ve learned from mindfulness is that dissatisfaction isn’t something to be ashamed of—it’s part of the human experience. It’s actually the first of the Four Noble Truths in Buddhism: that suffering exists. Not just pain or tragedy, but subtle, underlying dissatisfaction—the craving for things to be different, better, more fulfilling. But the rest of that teaching is hopeful: suffering has causes, and those causes can be understood, worked with, and even let go. And I know that sounds kind of abstract, but it starts really simply. With attention. With noticing. With actually being where we are. That’s the heart of mindfulness: not escaping, not fixing—but being fully present in this moment, even if it’s uncomfortable. Especially then. I think about what David Foster Wallace said in This is Water—how we move through life on autopilot, wrapped in our own heads, assuming our view of the world is the only one. That speech shook something loose in me. It’s easy to live that way, isn’t it? To get caught in the loop of comparing ourselves, chasing success, thinking once we reach some milestone we’ll finally be okay. But he reminds us that we have a choice. We get to decide how we see. We get to decide what we pay attention to. And when we choose to be aware—when we choose to see the person in line next to us, or our own breath, or the way sunlight hits the sidewalk—we’re not just reacting anymore. We’re living. I know that sounds poetic, maybe even idealistic, but it’s also deeply practical. That’s why we practiced shamatha meditation in class—to train the mind to rest in the present. We learned about pranayama to anchor ourselves through the breath. And yoga nidra, where you lie down and let go, taught me that rest is not something we earn. It’s something we need. We talked about sleep, gratitude, compassion—all these seemingly small things that actually shape the way we experience our lives. But beyond all the techniques, the heart of mindfulness is simple: be here now. And when dissatisfaction shows up, don’t run. Don’t numb. Just sit with it for a second. Ask it what it wants you to know. If we were sitting across from each other right now—just you and me—I wouldn’t try to give you advice or tell you how to fix anything. I’d probably just ask: What’s really going on? And I’d listen. Not to solve, but to be with you in it. Because sometimes the most powerful thing is to feel seen. To know that someone else gets it. And maybe we’d talk about the Four Limitless Qualities—loving-kindness, compassion, joy, and equanimity. Not as some lofty ideal, but as real things you can offer yourself. Maybe you’re being too hard on yourself. Maybe you haven’t felt joy in a while. Maybe the ground beneath you feels shaky, and you just need a moment of stillness. That’s okay. It makes sense. And I’d probably remind you, too, that there’s nothing wrong with wanting more from life. The path toward extraordinary happiness—the kind that doesn’t depend on praise, or money, or achievements—starts when we stop running and begin paying attention. It’s found in intention, in presence, in choosing how to see. That’s the whole message of This is Water, right? That the most important realities are often the hardest to see and talk about. That we have the power to wake up. And that waking up doesn’t mean fixing everything—it just means being here, with our eyes and hearts open. So if you’re feeling dissatisfied, don’t panic. Don’t shut it down. Let it speak. Let it guide you. It might be pointing you not to some massive change, but to something deeper: a return to yourself."
        },
        {
            title: "Thinking...",
            excerpt: "will have more soon",
            content: "Coming soon...",
            image: sicilyImage,
            imageCaption: "Ancient architecture in Sicily, showcasing the island's rich historical heritage.",
            contentAfterImage: `Sicilian cuisine is a reflection of its complex history, with influences from Greek, Arab, Spanish, and Italian traditions. The food scene is characterized by fresh seafood, aromatic herbs, and sweet delicacies like cannoli and cassata.

            The warmth of Sicilian hospitality makes visitors feel instantly at home, creating memories that last a lifetime.`
        },
        {
            title: "Thinking...",
            excerpt: "will have more soon",
            content: "Coming soon..."
        }
    ];

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === 'samyfel') {
            setError('');
            setShowAnimation(true);
            // Store authentication state
            localStorage.setItem('writingAuthenticated', 'true');
        } else {
            setError('Incorrect password. Access denied.');
        }
    };

    const handleAnimationComplete = () => {
        setShowAnimation(false);
        setUnlocked(true);
    };

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className="writing-page">
            {showAnimation && <Animation onComplete={handleAnimationComplete} />}
            
            {!unlocked ? (
                <div className="password-container">
                    <h2>RESTRICTED ACCESS</h2>
                    <form onSubmit={handlePasswordSubmit}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                        <button type="submit">ACCESS</button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                </div>
            ) : (
                <div className="writing-container">
                    <div style={{ marginTop: '80px' }}>
                        <h2 className="writing-title">Writing</h2>
                        <p className="writing-intro">This is a collection of my writings:</p>
                        <div className="writing-list">
                            {writings.map((writing, index) => (
                                <div key={index} className={`writing-item ${expandedIndex === index ? 'expanded' : ''}`}>
                                    <h3 className="writing-item-title">{writing.title}</h3>
                                    <p className="writing-item-excerpt">{writing.excerpt}</p>
                                    
                                    {expandedIndex === index && (
                                        <div className="writing-item-content">
                                            {writing.content && writing.content.split('\n\n').map((paragraph, i) => (
                                                <p key={i} className="content-paragraph">{paragraph}</p>
                                            ))}
                                            
                                            {writing.image && (
                                                <div className="writing-item-image-container">
                                                    <img 
                                                        src={writing.image} 
                                                        alt={writing.imageCaption || writing.title} 
                                                        className="writing-item-image"
                                                    />
                                                    {writing.imageCaption && (
                                                        <p className="writing-item-image-caption">{writing.imageCaption}</p>
                                                    )}
                                                </div>
                                            )}
                                            
                                            {writing.contentAfterImage && writing.contentAfterImage.split('\n\n').map((paragraph, i) => (
                                                <p key={`after-${i}`} className="content-paragraph">{paragraph}</p>
                                            ))}
                                        </div>
                                    )}
                                    
                                    <button 
                                        onClick={() => toggleExpand(index)} 
                                        className="writing-item-toggle"
                                    >
                                        {expandedIndex === index ? 'Read less' : 'Read more'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Writing;