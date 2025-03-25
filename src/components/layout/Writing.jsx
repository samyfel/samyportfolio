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