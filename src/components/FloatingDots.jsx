import React, { useRef, useEffect } from 'react';
import bgDesktop from '../img/bg__desktop__date.jpg';
import bgMobile from '../img/bg__mobile__date.jpg';

const FloatingDots = ({ offset = 0 }) => {
    const canvasRef = useRef(null);
    const imgDataRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: true });
        let animationFrameId;
        let dots = [];

        const isMobile = () => window.innerWidth <= 480;

        const createColorMap = (img) => {
            const tempCanvas = document.createElement('canvas');
            const tCtx = tempCanvas.getContext('2d', { willReadFrequently: true });

            const viewW = window.innerWidth;
            const viewH = window.innerHeight;
            const layerH = viewH * 1.2; // Синхронізація з 120% висотою в CSS

            tempCanvas.width = viewW;
            tempCanvas.height = layerH;

            const scale = Math.max(viewW / img.width, layerH / img.height);
            const nw = img.width * scale;
            const nh = img.height * scale;
            const nx = (viewW - nw) / 2;
            const ny = (layerH - nh) / 2;

            tCtx.drawImage(img, nx, ny, nw, nh);

            imgDataRef.current = {
                data: tCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height).data,
                width: tempCanvas.width,
                height: tempCanvas.height
            };
        };

        const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

        class Dot {
            constructor() {
                this.init();
            }

            init() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // Твої параметри швидкості
                const speed = isMobile() ? 0.8 : 1;
                this.vx = (Math.random() - 0.5) * speed;
                this.vy = (Math.random() - 0.5) * speed;
                this.radius = Math.random() * (isMobile() ? 1.2 : 1.6) + 0.6;

                // Стартові значення
                this.r = 150; this.g = 150; this.b = 150;
                this.a = 0;
            }

            update(currentOffset) {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;

                const map = imgDataRef.current;
                if (map) {
                    const ix = Math.floor(this.x);
                    const iy = Math.floor(this.y + currentOffset);

                    if (ix >= 0 && ix < map.width && iy >= 0 && iy < map.height) {
                        const index = (iy * map.width + ix) * 4;
                        const pR = map.data[index];
                        const pG = map.data[index + 1];
                        const pB = map.data[index + 2];

                        // HDR-Ефект: множимо на 1.5 для насиченості кольору
                        // та додаємо 40 для яскравості (замість вибілюючого +88)
                        const targetR = Math.min(pR * 1.5 + 40, 255);
                        const targetG = Math.min(pG * 1.5 + 40, 255);
                        const targetB = Math.min(pB * 1.5 + 40, 255);

                        const brightness = (pR + pG + pB) / 3;
                        // Підсилена видимість (0.8), щоб не були тусклими
                        const targetA = brightness > 8 ? 0.8 : 0.15;

                        // Плавний перехід (твої 0.17)
                        this.r = lerp(this.r, targetR, 0.17);
                        this.g = lerp(this.g, targetG, 0.17);
                        this.b = lerp(this.b, targetB, 0.17);
                        this.a = lerp(this.a, targetA, 0.17);
                    }
                }
            }

            draw() {
                const r = Math.round(this.r);
                const g = Math.round(this.g);
                const b = Math.round(this.b);
                const coreColor = `rgba(${r}, ${g}, ${b}, ${this.a})`;
                const glowColor = `rgba(${r}, ${g}, ${b}, ${this.a * 0.45})`;

                // 1. Малюємо об'ємне світіння (ореол)
                const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 6);
                grad.addColorStop(0, glowColor);
                grad.addColorStop(1, 'rgba(0,0,0,0)');

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius * 6, 0, Math.PI * 2);
                ctx.fillStyle = grad;
                ctx.fill();

                // 2. Малюємо яскраве ядро
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = coreColor;
                ctx.fill();
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dots.forEach(dot => {
                dot.update(window.currentParallax || 0);
                dot.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        const img = new Image();
        img.src = isMobile() ? bgMobile : bgDesktop;
        img.crossOrigin = "Anonymous";

        img.onload = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            createColorMap(img);
            // Твоя кількість точок: ПК=130, Моб=65
            dots = Array.from({ length: isMobile() ? 65 : 130 }, () => new Dot());
            animate();
        };

        const handleResize = () => {
            if (img.complete) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                createColorMap(img);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    useEffect(() => {
        window.currentParallax = offset;
    }, [offset]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 6,
                mixBlendMode: 'screen' // Змінено на screen для кращого неонового ефекту
            }}
        />
    );
};

export default FloatingDots;