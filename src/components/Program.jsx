import React, { useState, useEffect } from 'react';
import "../styles/program.css";

const Program = () => {
    // Стан для збереження поточного часу
    const [currentTime, setCurrentTime] = useState(new Date());

    // Оновлюємо час кожну хвилину.
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); //  = 1 хвилина

        return () => clearInterval(timer);
    }, []);

    // Функція перевірки: чи зараз цей час?
    const isActiveSlot = (start, end) => {
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        const [startHour, startMin] = start.split(':').map(Number);
        const [endHour, endMin] = end.split(':').map(Number);

        const startTotal = startHour * 60 + startMin;
        const endTotal = endHour * 60 + endMin;

        return currentMinutes >= startTotal && currentMinutes < endTotal;
    };

    // Дані програми (винесені в масив для зручності)
    const scheduleItems = [
        { start: "10:00", end: "11:00", title: "Реєстрація", desc: null },
        { start: "11:00", end: "11:15", title: "Вітальне слово", desc: "Шаховська Наталя, Мельникова Наталя" },
        { start: "11:15", end: "11:55", title: "Богдан Діденко", desc: "Поточний стан справ у галузі українських LLM" },
        { start: "11:55", end: "12:00", title: "Перерва", desc: null },
        { start: "12:00", end: "12:40", title: "Засоба Євген", desc: "Поєднання академічного ML з реальними проблемами робототехніки"},
        { start: "12:40", end: "13:40", title: "Перерва на каву", desc: null },
        {
            start: "13:40", end: "14:10",
            title: null, // Спеціальний випадок для складної верстки
            customContent: (
                <>
                    <h4><span>Панельна дискусія 1: Як ваш АІ-проєкт оцінюють інвестори</span> <br />
                        Модератор: Бойчук Андрій <br />
                        Учасники: Горовий Євген, Панів Юрій
                    </h4>
                    <br />
                    <h4><span>Панельна дискусія 2: Технічна тема (AI-Engineering Panel)</span> <br />
                        Модератор: Яцишин Володимир <br />
                        Учасники: Засоба Євгеній, Шамуратов Олексій, Красій Данило
                    </h4>
                </>
            )
        },
        { start: "14:10", end: "14:15", title: "Перерва", desc: null },
        { start: "14:15", end: "14:25", title: "Звіт по БФК", desc: "Басистюк Олег" },
        { start: "14:25", end: "14:40", title: "Нагородження стипендіатів", desc: "Мельникова Наталія" },
        { start: "14:50", end: "15:20", title: "Перерва на каву, Bingo", desc: null },
        { start: "15:10", end: "15:40", title: "Бойчук Андрій", desc: "AI як інструмент покращення процесу вивчення та впровадження військового досвіду" },
        { start: "15:40", end: "15:45", title: "Перерва", desc: null },
        { start: "15:45", end: "16:25", title: "Аукціон для 3, 25 та 93 бригад", desc: null },
        { start: "16:25", end: "16:30", title: "Перерва", desc: null },
        {
            start: "16:30", end: "17:00",
            title: "Панельна дискусія 3: Етичні та соціальні аспекти впровадження AI в Україні",
            desc: "Модератор: Мельникова Наталя \nУчасники: Шаховська Наталя, Молчановський Олексій, Москаленко Андрій"
        },
        { start: "17:00", end: "17:05", title: "Завершальне слово", desc: "Мельникова Наталія" },
    ];

    return (
        <section className='program' id='program'>
            <div className="program__title__container">
                <h1 className="program__title">Програма</h1>
            </div>
            <div className="program__content__container">
                <hr />
                {scheduleItems.map((item, index) => {
                    const active = isActiveSlot(item.start, item.end);

                    return (
                        <React.Fragment key={index}>
                            {/* Додаємо клас active-slot, якщо час співпадає */}
                            <div className={`program__txt__container ${active ? 'active-slot' : ''}`}>
                                <div className="time__container">
                                    <h4>{item.start} - {item.end}</h4>
                                </div>
                                <div className="event__container">
                                    {item.customContent ? (
                                        item.customContent
                                    ) : (
                                        <h4>
                                            <span>{item.title}</span>
                                            {item.desc && <><br /> {item.desc}</>}
                                        </h4>
                                    )}
                                </div>
                            </div>
                            <hr />
                        </React.Fragment>
                    );
                })}
            </div>
        </section>
    );
}

export default Program;