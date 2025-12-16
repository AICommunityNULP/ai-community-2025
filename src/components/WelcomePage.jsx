import React, { useEffect, useRef } from 'react';
import '../styles/app.css';

const WelcomePage = () => {
    const bgNoTextRef = useRef(null);
    const bgTextRef = useRef(null);
    const isAnimating = useRef(false);

    // --- 1. Easing: easeOutQuart ---
    // Це "золота середина". Вона стартує плавно (не так різко, як Expo),
    // але все ще має приємну інерцію в кінці.
    const easeOutQuart = (t, b, c, d) => {
        t /= d;
        t--;
        return -c * (t * t * t * t - 1) + b;
    };

    const smoothScrollTo = (targetPosition, duration) => {
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime = null;

        document.documentElement.style.scrollBehavior = 'auto';
        document.body.style.scrollBehavior = 'auto';

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
        // --- Паралакс ---
        const handleParallax = () => {
            const y = window.scrollY;
            if (y > window.innerHeight + 50) return;

            const offset = y * 0.5;
            const opacity = Math.max(0, 1 - y / 600);

            if (bgNoTextRef.current) {
                bgNoTextRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
            }
            if (bgTextRef.current) {
                bgTextRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
                bgTextRef.current.style.opacity = opacity;
            }
        };

        // --- Обробка скролу ---
        const handleWheel = (e) => {
            if (isAnimating.current) {
                e.preventDefault();
                return;
            }

            // Ловимо тільки якщо ми на самому верху
            if (window.scrollY < 50) {
                if (e.deltaY > 0) { // Рух вниз
                    e.preventDefault();
                    isAnimating.current = true;

                    // --- НАЛАШТУВАННЯ ПЛАВНОСТІ ---
                    // 2000ms (2 секунди) - це дасть дуже довгий, кінематографічний проліт.
                    // Якщо буде занадто повільно - спробуйте 1500.
                    smoothScrollTo(window.innerHeight, 2000);
                }
            }
        };

        // Слухачі
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('scroll', handleParallax, { passive: true });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('scroll', handleParallax);
        };
    }, []);

    return (
        <section className='welcome__page'>
            <div className="welcome__backgrounds">
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
    )
}

export default WelcomePage;