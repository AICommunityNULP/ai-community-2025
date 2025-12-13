import React, { useState, useEffect } from 'react';
import "../styles/program.css";

const Program = () => {
    // Стан для збереження поточного часу
    const [currentTime, setCurrentTime] = useState(new Date());

    // Оновлюємо час кожну хвилину
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // 60000 мс = 1 хвилина

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
        { start: "10:00", end: "11:00", title: "Реєстрація / Кава брейк", desc: null },
        { start: "11:00", end: "11:15", title: "Вітальне слово", desc: "Шаховська Наталя, Мельникова Наталя" },
        { start: "11:15", end: "11:55", title: "Богдан Діденко", desc: null },
        { start: "11:55", end: "12:00", title: "Перерва", desc: null },
        { start: "12:00", end: "12:40", title: "Спікер 2", desc: "Сивоконь Олексій" },
        { start: "12:40", end: "13:40", title: "Кава брейк / Ланч", desc: null },
        {
            start: "13:40", end: "14:10",
            title: null, // Спеціальний випадок для складної верстки
            customContent: (
                <>
                    <h4><span>Панельна дискусія 1: Як ваш АІ-проєкт оцінюють інвестори</span> <br />
                        Модератор: **Модератор** <br />
                        Учасники: Бойчук Андрій, Кицмей Тарас, Горовий Євген, Панін Юрій (Lapa), Костянтин Комаров (Uklon)
                    </h4>
                    <br />
                    <h4><span>Панельна дискусія 2: Технічна тема (AI-Engineering Panel)</span> <br />
                        Модератор: **Яцишин Володя** <br />
                        Учасники: Засоба Олександр, Шамуратов Олексій, GlobalLogic / EPAM, Чирка Юрій
                    </h4>
                </>
            )
        },
        { start: "14:10", end: "14:15", title: "Перерва", desc: null },
        { start: "14:15", end: "14:35", title: "Звіт по БФК", desc: "Басистюк Олег" },
        { start: "14:35", end: "14:50", title: "Нагородження стипендіатів", desc: "Мельникова Наталія" },
        { start: "14:50", end: "15:20", title: "Кава брейк / Bingo", desc: null },
        { start: "15:20", end: "16:00", title: "Спікер 3", desc: "Бойчук Андрій" },
        { start: "16:00", end: "16:05", title: "Перерва", desc: null },
        { start: "16:05", end: "16:30", title: "Аукціон для 25 бригади", desc: "Басистюк Олег" },
        { start: "16:30", end: "16:35", title: "Перерва", desc: null },
        {
            start: "16:35", end: "17:05",
            title: "Панельна дискусія 3: Етичні та соціальні аспекти впровадження AI в Україні",
            desc: "Модератор: Мельникова Наталя. Учасники: Шаховська Наталя, Молчановський Олексій, Москаленко Андрій, Кицмей Тарас"
        },
        { start: "17:05", end: "17:15", title: "Завершення / Подяка", desc: "Мельникова Наталія" },
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