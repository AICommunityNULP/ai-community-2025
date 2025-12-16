import React, { useState } from 'react';
import "../styles/speakers.css"

const Speakers = () => {
    // Стан для керування видимістю секцій: isVisible = true означає "розгорнуто"
    const [isMainVisible, setIsMainVisible] = useState(true);
    const [isPanelVisible, setIsPanelVisible] = useState(false);
    const [isOtherVisible, setIsOtherVisible] = useState(false);

    // Об'єднаний список усіх учасників для відображення з фото
    const allParticipants = [
        // !!! ПРИМІТКА: Порядок imgId тут важливий і відповідає CSS-класам speakers__img[N] !!!
        { name: "Богдан Діденко", title: "Спікер 1 (час 11:15-11:55)", type: "main", imgId: 1 },
        { name: "Засоба Євген", title: "Спікер 2 (час 12:00-12:40)", type: "main", imgId: 2 },
        { name: "Бойчук Андрій", title: "Спікер 3 (час 15:20-16:00)", type: "main", imgId: 3 },
        //{ name: "Кицмей Тарас", title: "Панель 1: Інвестори / Панель 3: Етика", type: "panel", imgId: 4 },
        { name: "Горовий Євген", title: "Панель 1: Інвестори", type: "panel", imgId: 5 },
        { name: "Панін Юрій (Lapa)", title: "Панель 1: Інвестори", type: "panel", imgId: 6 },
        //{ name: "Костянтин Комаров (Uklon)", title: "Панель 1: Інвестори", type: "panel", imgId: 7 },
        { name: "Яцишин Володимир", title: "Модератор Панелі 2: AI-Engineering Panel", type: "panel", imgId: 8 },
        { name: "Засоба Євген", title: "Панель 2: AI-Engineering Panel", type: "panel", imgId: 2 },
        { name: "Шамуратов Олексій", title: "Панель 2: AI-Engineering Panel", type: "panel", imgId: 9 },
        { name: "Красній Данило (IT-Jim)", title: "Панель 2: AI-Engineering Panel", type: "panel", imgId: 10 },
        //{ name: "Чирка Юрій", title: "Панель 2: AI-Engineering Panel", type: "panel", imgId: 11 },
        { name: "Молчановський Олексій", title: "Панель 3: Етичні та соціальні аспекти", type: "panel", imgId: 12 },
        { name: "Москаленко Андрій", title: "Панель 3: Етичні та соціальні аспекти", type: "panel", imgId: 13 },
        //{ name: "Анастасія Фролова", title: "Панель 3: Етичні та соціальні аспекти", type: "panel", imgId: 10 },
        { name: "Басистюк Олег", title: "Звіт по БФК", type: "other", imgId: 14 },
        { name: "Шаховська Наталя", title: "Вітальне слово / Учасник Панелі 3", type: "other", imgId: 15 },
        { name: "Мельникова Наталя", title: "Вітальне слово / Модератор Панелі 3 / Нагородження", type: "other", imgId: 16 },
    ];

    const mainSpeakers = allParticipants.filter(p => p.type === 'main');
    const panelParticipants = allParticipants.filter(p => p.type === 'panel');
    const otherParticipants = allParticipants.filter(p => p.type === 'other');


    const renderParticipantBlock = (person, index, offset = 0) => {
        const effectiveIndex = index + offset;
        const isImageFirst = effectiveIndex % 2 === 0;
        const imgClassName = `speakers__img speakers__img${person.imgId}`;

        const photoStyle = {
            width: '300px',
            height: '300px',
        };

        const content = (
            <>
                <div className={imgClassName} style={photoStyle} aria-label={`Фото ${person.name}`}>
                </div>
                <div className="speakers__txt">
                    <h3>{person.name}</h3>
                    <h4>{person.title}</h4>
                </div>
            </>
        );

        const contentReverse = (
            <>
                <div className="speakers__txt__end">
                    <h3>{person.name}</h3>
                    <h4>{person.title}</h4>
                </div>
                <div className={imgClassName} style={photoStyle} aria-label={`Фото ${person.name}`}>
                </div>
                <div className="speakers__txt__adaptive">
                    <h3>{person.name}</h3>
                    <h4>{person.title}</h4>
                </div>
            </>
        );

        return (
            <div className={`speakers__content__${isImageFirst ? 'img' : 'txt'}`} key={person.name}>
                {isImageFirst ? content : contentReverse}
            </div>
        );
    };


    return (
        <section className='speakers snap-section' id='speakers'>

            {/* 1. ОСНОВНІ СПІКЕРИ (Accordion Header) */}
            <div className="speakers__title__container" onClick={() => setIsMainVisible(!isMainVisible)}>
                <h1 className="title__speakers">
                    Основні спікери
                    <span className="accordion-icon">{isMainVisible ? '▲' : '▼'}</span>
                </h1>
            </div>
            {/* Використовуємо клас 'is-visible' для розгорнутого стану */}
            <div className={`speakers__container ${isMainVisible ? 'is-visible' : ''}`}>
                {mainSpeakers.map((person, index) => renderParticipantBlock(person, index))}
            </div>

            <hr style={{width: '80%', margin: '40px auto', borderTop: '1px solid rgba(255, 255, 255, 0.1)'}} />

            {/* 2. ПАНЕЛЬНІ ДИСКУСІЇ (Accordion Header) */}
            <div className="speakers__title__container" onClick={() => setIsPanelVisible(!isPanelVisible)}>
                <h1 className="title__speakers">
                    Учасники панельних дискусій
                    <span className="accordion-icon">{isPanelVisible ? '▲' : '▼'}</span>
                </h1>
            </div>
            <div className={`speakers__container ${isPanelVisible ? 'is-visible' : ''}`}>
                {panelParticipants.map((person, index) =>
                    renderParticipantBlock(person, index, mainSpeakers.length)
                )}
            </div>

            <hr style={{width: '80%', margin: '40px auto', borderTop: '1px solid rgba(255, 255, 255, 0.1)'}} />

            {/* 3. ІНШІ УЧАСНИКИ (Accordion Header) */}
            <div className="speakers__title__container" onClick={() => setIsOtherVisible(!isOtherVisible)}>
                <h1 className="title__speakers">
                    Інші учасники програми
                    <span className="accordion-icon">{isOtherVisible ? '▲' : '▼'}</span>
                </h1>
            </div>
            <div className={`speakers__container ${isOtherVisible ? 'is-visible' : ''}`} style={{paddingBottom: '50px'}}>
                {otherParticipants.map((person, index) =>
                    renderParticipantBlock(person, index, mainSpeakers.length + panelParticipants.length)
                )}
            </div>
        </section>
    )
}

export default Speakers