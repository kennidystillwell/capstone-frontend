import React, { useEffect, useRef } from 'react';
import M from 'materialize-css';
import fact1 from '../images/fact1.png';
import fact2 from '../images/fact2.png';
import fact3 from '../images/fact3.png';
import fact4 from '../images/fact4.png'; 
import fact5 from '../images/fact5.png';
import '../css/Fact.css';

const FactCarousel = () => {
    const carouselRef = useRef(null);

    useEffect(() => {
        M.Carousel.init(carouselRef.current, {
            fullWidth: true, 
            indicators: true, 
            duration: 200
        });

        const interval = setInterval(() => {
            const instance = M.Carousel.getInstance(carouselRef.current);
            instance.next();
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="carousel carousel-slider" ref={carouselRef}> 
            <a className="carousel-item" href="#one!"><img src={fact1} alt="Fact 1" /></a>
            <a className="carousel-item" href="#two!"><img src={fact2} alt="Fact 2" /></a>
            <a className="carousel-item" href="#three!"><img src={fact3} alt="Fact 3" /></a>
            <a className="carousel-item" href="#four!"><img src={fact4} alt="Fact 4" /></a>
            <a className="carousel-item" href="#five!"><img src={fact5} alt="Fact 5" /></a>
        </div>
    );
};

export default FactCarousel;
