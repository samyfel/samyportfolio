import './Writing.css'; // Import the CSS file for styles

function Writing() {
    const writings = [
        {
            title: "Exploring Sicily",
            excerpt: "A journey through the beautiful landscapes and rich culture of Sicily.",
            link: "/writing/exploring-sicily" // Link to the full article
        },
        {
            title: "The Art of Photography",
            excerpt: "Understanding the nuances of capturing moments through a lens.",
            link: "/writing/art-of-photography"
        },
        {
            title: "Traveling on a Budget",
            excerpt: "Tips and tricks for exploring the world without breaking the bank.",
            link: "/writing/traveling-on-a-budget"
        },
        {
            title: "Traveling on a Budget",
            excerpt: "Tips and tricks for exploring the world without breaking the bank.",
            link: "/writing/traveling-on-a-budget"
        },
        {
            title: "Thinking...",
            excerpt: "will have more soon",
            link: "/writing/traveling-on-a-budget"
        },
        {
            title: "Thinking...",
            excerpt: "will have more soon",
            link: "/writing/traveling-on-a-budget"
        },
        {
            title: "Thinking...",
            excerpt: "will have more soon",
            link: "/writing/traveling-on-a-budget"
        },
        {
            title: "Thinking...",
            excerpt: "will have more soon",
            link: "/writing/traveling-on-a-budget"
        },
        {
            title: "Thinking...",
            excerpt: "will have more soon",
            link: "/writing/traveling-on-a-budget"
        },
        {
            title: "Thinking...",
            excerpt: "will have more soon",
            link: "/writing/traveling-on-a-budget"
        }
        // Add more writing pieces as needed
    ];

    console.log("Writings array:", writings); // Debug log

    return (
        <div className="writing-container">
            <div style={{ marginTop: '80px' }}> {/* Add margin to create space from the top */}
                <h2 className="writing-title">Writing</h2>
                
                <p className="writing-intro">This is a collection of my writings:</p>

                <div className="writing-list">
                    {writings.map((writing, index) => {
                        console.log("Rendering writing:", writing); // Debug log
                        return (
                            <div key={index} className="writing-item">
                                <h3 className="writing-item-title">{writing.title}</h3>
                                <p className="writing-item-excerpt">{writing.excerpt}</p>
                                <a href={writing.link} className="writing-item-link">Read more</a>
                            </div>
                        );
                    })}
                    
                </div>
            </div>
        </div>
    );
}

export default Writing;