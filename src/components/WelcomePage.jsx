import React, { useEffect, useRef, useState } from 'react';
import FloatingDots from './FloatingDots';
import '../styles/app.css';

const WelcomePage = () => {
    const bgNoTextRef = useRef(null);
    const bgTextRef = useRef(null);
    const isAnimating = useRef(false);
    const touchStartY = useRef(0);

    // Стан для передачі зміщення паралаксу в точки
    const [parallaxOffset, setParallaxOffset] = useState(0);

    const easeOutQuart = (t, b, c, d) => {
        t /= d; t--;
        return -c * (t * t * t * t - 1) + b;
    };

    const smoothScrollTo = (targetPosition, duration) => {
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const nextY = easeOutQuart(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, nextY);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                window.scrollTo(0, targetPosition);
                isAnimating.current = false;
            }
        };
        requestAnimationFrame(animation);
    };

    useEffect(() => {
        const handleParallax = () => {
            const y = window.scrollY;
            if (y > window.innerHeight + 50) return;

            const offset = y * 0.5;
            const opacity = Math.max(0, 1 - y / 600);

            // Оновлюємо стан для канвасу
            setParallaxOffset(offset);

            if (bgNoTextRef.current) {
                bgNoTextRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
            }
            if (bgTextRef.current) {
                bgTextRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
                bgTextRef.current.style.opacity = opacity;
            }
        };

        const handleWheel = (e) => {
            if (isAnimating.current) { e.preventDefault(); return; }
            if (window.scrollY < 50 && e.deltaY > 0) {
                e.preventDefault();
                isAnimating.current = true;
                smoothScrollTo(window.innerHeight, 2000);
            }
        };

        const handleTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
        const handleTouchMove = (e) => {
            if (isAnimating.current) { e.preventDefault(); return; }
            const currentY = e.touches[0].clientY;
            const diff = touchStartY.current - currentY;
            if (window.scrollY < 10 && diff > 50) {
                e.preventDefault();
                isAnimating.current = true;
                smoothScrollTo(window.innerHeight, 1500);
            }
        };

        window.addEventListener('scroll', handleParallax, { passive: true });
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener('scroll', handleParallax);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <section className='welcome__page'>
            <div className="welcome__backgrounds">
                {/* Точки тепер отримують актуальний offset */}
                <FloatingDots offset={parallaxOffset} />

                <div
                    ref={bgNoTextRef}
                    className="bg-layer bg-no-text"
                    style={{ willChange: 'transform' }}
                ></div>
                <div
                    ref={bgTextRef}
                    className="bg-layer bg-text"
                    style={{ willChange: 'transform, opacity' }}
                ></div>
            </div>

            <div className="header__block"></div>
        </section>
    );
};

export default WelcomePage;