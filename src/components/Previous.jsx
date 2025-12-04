import React from 'react';
import "../styles/previous_events.css";

const PreviousEvents = () => {
    return (
        <section className="previous-events-section">
            <div className="title-container">
                <h2 className="title-events">Минулі події</h2>
            </div>
            <div className="links-container">

                {/* Картка 1: Сайт */}
                <a
                    href="https://lviv-ai-community.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="event-link-card website-card"
                >
                    <h3 className="link-title">Сайт минулої конференції</h3>
                    <p className="link-subtitle">lviv-ai-community.vercel.app</p>
                    <div className="icon-overlay">
                        {/* Іконка сайту (SVG) */}
                        <svg className="link-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </div>
                </a>

                {/* Картка 2: YouTube */}
                <a
                    href="https://www.youtube.com/live/NdUxEB3xblg?si=cErOAiahpO6mh_Ul"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="event-link-card youtube-card"
                >
                    <h3 className="link-title">YouTube Трансляція 2024</h3>
                    <p className="link-subtitle">Дивіться запис на YouTube</p>
                    <div className="icon-overlay">
                        {/* Іконка YouTube (SVG) */}
                        <svg className="link-icon" viewBox="0 0 24 24" fill="#FF0000">
                            <path d="M19.615 3.197a2.76 2.76 0 00-1.954-1.954C16.897 1 12 1 12 1s-4.897 0-5.661.243a2.76 2.76 0 00-1.954 1.954C4 4.103 4 8 4 8s0 3.9.243 4.661a2.76 2.76 0 001.954 1.954C7.103 15 12 15 12 15s4.897 0 5.661-.243a2.76 2.76 0 001.954-1.954C20 11.9 20 8 20 8s0-3.9-.243-4.661zM9.546 12.338V7.662L15.01 10l-5.464 2.338z"/>
                        </svg>
                    </div>
                </a>
            </div>
        </section>
    );
};

export default PreviousEvents;