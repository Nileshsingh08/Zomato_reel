import React, { useRef, useEffect, useState } from 'react';

const ReelFeed = ({ items, onLike, onSave, emptyMessage = "No videos available." }) => {
    const [currentVideo, setCurrentVideo] = useState(0);
    const containerRef = useRef(null);
    const videoRefs = useRef(new Map());

    // Set up scroll handling
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, clientHeight } = container;
            const index = Math.round(scrollTop / clientHeight);
            setCurrentVideo(index);
            
            // Play current video and pause others
            items.forEach((item, i) => {
                const video = videoRefs.current.get(item._id);
                if (video) {
                    if (i === index) {
                        video.play().catch(() => {
                            // Autoplay may be blocked by browser
                            console.log("Autoplay prevented");
                        });
                    } else {
                        video.pause();
                        video.currentTime = 0;
                    }
                }
            });
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [items]);

    // Store video refs
    const setVideoRef = (id) => (element) => {
        if (element) {
            videoRefs.current.set(id, element);
        } else {
            videoRefs.current.delete(id);
        }
    };

    if (!items.length) {
        return <div className="empty-message">{emptyMessage}</div>;
    }

    return (
        <div ref={containerRef} className="reels-feed">
            {items.map((item, index) => (
                <section key={item._id} className="reel">
                    <video
                        ref={setVideoRef(item._id)}
                        className="reel-video"
                        src={item.videoUrl}
                        muted
                        playsInline
                        loop
                        preload="metadata"
                    />
                    <div className="reel-overlay">
                        <p className="reel-description">{item.description}</p>
                        <div className="reel-actions">
                            <button 
                                className="reel-button like-button"
                                onClick={() => onLike(item)}
                            >
                                ❤️ Like {item.likeCount}
                            </button>
                            <button 
                                className="reel-button save-button"
                                onClick={() => onSave(item)}
                            >
                                📌 Save {item.savesCount}
                            </button>
                            <button 
                                className="reel-button"
                                onClick={() => window.location.href = `/store/${item.foodPartnerId}`}
                            >
                                Visit Store
                            </button>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

export default ReelFeed;