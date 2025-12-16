import React, { useEffect, useRef } from 'react';
import '../styles/app.css';

const WelcomePage = () => {
    const bgNoTextRef = useRef(null);
    const bgTextRef = useRef(null);
    const isAnimating = useRef(false);

    // Зберігаємо координату початку дотику
    const touchStartY = useRef(0);

    // Easing: easeOutQuart (Плавний і елегантний)
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

        // --- ЛОГІКА ДЛЯ МИШКИ (DESKTOP) ---
        const handleWheel = (e) => {
            if (isAnimating.current) { e.preventDefault(); return; }

            if (window.scrollY < 50 && e.deltaY > 0) {
                e.preventDefault();
                isAnimating.current = true;
                smoothScrollTo(window.innerHeight, 2000);
            }
        };

        // --- НОВА ЛОГІКА ДЛЯ ТЕЛЕФОНІВ (TOUCH) ---

        // 1. Коли палець торкається екрану
        const handleTouchStart = (e) => {
            // Запам'ятовуємо Y координату першого пальця
            touchStartY.current = e.touches[0].clientY;
        };

        // 2. Коли палець рухається по екрану
        const handleTouchMove = (e) => {
            if (isAnimating.current) {
                e.preventDefault(); // Блокуємо, якщо анімація йде
                return;
            }

            const currentY = e.touches[0].clientY;
            // Різниця: якщо touchStartY > currentY, значить палець йде ВГОРУ (скрол ВНИЗ)
            const diff = touchStartY.current - currentY;

            // Перевіряємо умови:
            // 1. Ми на самому верху сторінки
            // 2. Свайп достатньо сильний (> 50px), щоб не реагувати на випадкові дотики
            // 3. Напрямок свайпу - вниз (diff > 0)
            if (window.scrollY < 10 && diff > 50) {
                e.preventDefault(); // Блокуємо нативний скрол Safari/Chrome
                isAnimating.current = true;

                // Для мобільних можна трохи швидше (1500), бо екрани менші,
                // але 2000 теж буде виглядати плавно
                smoothScrollTo(window.innerHeight, 1500);
            }
        };

        // Слухачі подій
        window.addEventListener('scroll', handleParallax, { passive: true });

        // desktop
        window.addEventListener('wheel', handleWheel, { passive: false });

        // mobile (passive: false ОБОВ'ЯЗКОВО, щоб працював preventDefault)
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