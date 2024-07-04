import React, { useState, useEffect } from 'react';

export default function Slider({ reviews }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (reviews && reviews.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
            }, 5000); 
            return () => clearInterval(interval);
        }
    }, [reviews]);

    if (!reviews || reviews.length === 0) {
        return <div>Loading...</div>;
    }

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? 'star filled' : 'star'}>
                    ★
                </span>
            );
        }
        return stars;
    };


    return (
        <div className="slider">
            <button onClick={handlePrev}>Prev</button>
            <div className="slider-content">
                {reviews.length > 0 && (
                    <div className="slide">
                        <div key={`review${reviews.id}`}  className="slide-info">
                            <h3>{reviews[currentIndex].userName}</h3>
                            <div className="rating">{renderStars(reviews[currentIndex].rating)}</div>
                            <p>{reviews[currentIndex].comment}</p>
                        </div>
                    </div>
                )}
            </div>
            <button onClick={handleNext}>Next</button>
        </div>
    );
}
