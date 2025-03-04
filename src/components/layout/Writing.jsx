import { useState } from 'react';
import './Writing.css'; // Import the CSS file for styles
import Animation from './Animation';
import sicilyImage from '../../assets/photography/sicily_architecture.jpg'; // Import the image

function Writing() {
    const [showAnimation, setShowAnimation] = useState(false);
    const [unlocked, setUnlocked] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [expandedIndex, setExpandedIndex] = useState(null);

    const writings = [
        {
            title: "Exploring Sicily",
            excerpt: "A journey through the beautiful landscapes and rich culture of Sicily.",
            content: `Sicily, the largest Mediterranean island, is a treasure trove of history, culture, and natural beauty. From the ancient Greek temples of Agrigento to the bustling markets of Palermo, every corner of this island tells a story.

            The island's diverse landscape includes the imposing Mount Etna, Europe's largest active volcano, pristine beaches with crystal-clear waters, and rolling hills covered with olive groves and vineyards.`,
            image: sicilyImage,
            imageCaption: "Ancient architecture in Sicily, showcasing the island's rich historical heritage.",
            contentAfterImage: `Sicilian cuisine is a reflection of its complex history, with influences from Greek, Arab, Spanish, and Italian traditions. The food scene is characterized by fresh seafood, aromatic herbs, and sweet delicacies like cannoli and cassata.

            The warmth of Sicilian hospitality makes visitors feel instantly at home, creating memories that last a lifetime.`
        },
        {
            title: "The Art of Photography",
            excerpt: "Understanding the nuances of capturing moments through a lens.",
            content: `Photography is more than just pointing a camera and clicking a button; it's about seeing the world differently and capturing moments that tell a story.

            The technical aspects of photography—understanding exposure, composition, and lighting—are just the foundation. The true art lies in developing a unique perspective and style that reflects your vision.

            Digital photography has democratized the medium, allowing anyone with a smartphone to create compelling images. However, mastering the craft still requires dedication, practice, and a keen eye for detail.

            Whether you're capturing landscapes, portraits, or street scenes, the goal remains the same: to freeze a moment in time that evokes emotion and connects with viewers on a deeper level.`
        },
        {
            title: "Traveling on a Budget",
            excerpt: "Tips and tricks for exploring the world without breaking the bank.",
            content: `Traveling doesn't have to be expensive. With careful planning and a few smart strategies, you can explore the world without emptying your wallet.

            Start by being flexible with your travel dates and destinations. Off-season travel often means lower prices for flights and accommodations, as well as fewer crowds at popular attractions.

            Consider alternative accommodations like hostels, guesthouses, or vacation rentals, which can be significantly cheaper than hotels. Many also offer kitchen facilities, allowing you to save money by preparing some of your own meals.

            Public transportation, walking, and cycling are not only budget-friendly ways to get around but also provide opportunities to experience local life and discover hidden gems off the tourist path.

            Take advantage of free activities like walking tours, public parks, and museums with free admission days. Often, the most memorable experiences come from simply wandering through local neighborhoods and markets.`
        },
        {
            title: "The Digital Nomad Lifestyle",
            excerpt: "Balancing work and travel in the age of remote work.",
            content: `The rise of remote work has given birth to a new lifestyle: the digital nomad. These location-independent professionals leverage technology to work from anywhere in the world, blending productivity with exploration.

            While the freedom to work from a beach in Bali or a café in Lisbon sounds idyllic, the digital nomad lifestyle comes with its own set of challenges. Reliable internet, time zone differences, work-life balance, and loneliness are hurdles that nomads must navigate.

            Successful digital nomads develop routines and systems that allow them to maintain productivity while embracing the spontaneity of travel. Co-working spaces, productivity apps, and communities of like-minded individuals have emerged to support this growing movement.

            Despite the challenges, the rewards of the digital nomad lifestyle—cultural immersion, personal growth, and a broader worldview—make it an appealing option for those seeking an alternative to the traditional 9-to-5.`
        },
        {
            title: "Sustainable Travel Practices",
            excerpt: "How to explore the world while minimizing your environmental impact.",
            content: `As awareness of climate change and environmental degradation grows, travelers are increasingly seeking ways to explore the world more sustainably.

            Start with transportation choices: consider trains over planes for shorter distances, use public transportation or bike-sharing programs at your destination, and offset carbon emissions when flying is unavoidable.

            Choose accommodations that demonstrate environmental commitment through practices like water conservation, renewable energy use, waste reduction, and support for local communities.

            Respect local ecosystems by staying on marked trails, avoiding wildlife disturbance, and never removing natural or cultural artifacts. Participate in beach cleanups or conservation projects to leave destinations better than you found them.

            Support the local economy by eating at locally-owned restaurants, shopping at markets and artisan shops, and hiring local guides. This not only reduces the carbon footprint of your consumption but also ensures tourism benefits host communities.

            Remember that sustainable travel is not just about environmental impact but also about cultural respect and economic fairness. By traveling thoughtfully, we can ensure that the places we love remain vibrant and accessible for generations to come.`
        },
        {
            title: "The Psychology of Travel",
            excerpt: "How exploring new places changes our brain and perspective.",
            content: `Travel is more than just a leisure activity; it's a powerful catalyst for personal growth and cognitive development. Research shows that experiencing new environments and cultures can literally rewire our brains.

            Novel experiences trigger the release of dopamine, enhancing our mood and motivation. The challenges of navigating unfamiliar situations build cognitive flexibility and problem-solving skills, while exposure to different cultural perspectives increases empathy and reduces implicit bias.

            The psychological benefits of travel extend beyond the trip itself. Anticipation of upcoming travel boosts happiness, while memories of past adventures provide lasting well-being benefits. Studies suggest that money spent on experiences like travel creates more lasting happiness than material purchases.

            Even brief exposures to different environments can spark creativity and innovation by breaking established thought patterns. This "psychological distance" allows us to see problems from new angles and consider solutions we might otherwise overlook.

            In an increasingly divided world, the perspective-shifting power of travel may be more valuable than ever, reminding us of our common humanity despite cultural differences.`
        },
        {
            title: "Thinking...",
            excerpt: "will have more soon",
            content: "Coming soon..."
        },
        {
            title: "Thinking...",
            excerpt: "will have more soon",
            content: "Coming soon..."
        },
        {
            title: "Thinking...",
            excerpt: "will have more soon",
            content: "Coming soon..."
        },
        {
            title: "Thinking...",
            excerpt: "will have more soon",
            content: "Coming soon..."
        }
    ];

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === 'samyfel') { // Change this to your desired password
            setError('');
            setShowAnimation(true);
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