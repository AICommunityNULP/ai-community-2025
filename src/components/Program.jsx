import React from 'react'
import "../styles/program.css"

const Program = () => {
    return (
        <section className='program' id='program'>
            <div className="program__title__container">
                <h1 className="program__title">Програма</h1>
            </div>
            <div className="program__content__container">
                <hr />
                {/* 10:00-11:00 Реєстрація/ Кава брейк */}
                <div className="program__txt__container">
                    <div className="time__container">
                        <h4>10:00 - 11:00</h4>
                    </div>
                    <div className="event__container">
                        <h4><span>Реєстрація / Кава брейк</span></h4>
                    </div>
                </div>
                <hr />
                {/* 11:00-11:15 Вітальне слово */}
                <div className="program__txt__container">
                    <div className="time__container">
                        <h4>11:00 - 11:15</h4>
                    </div>
                    <div className="event__container">
                        <h4><span>Вітальне слово</span> <br />
                            Шаховська Наталя, Мельникова Наталя
                        </h4>
                    </div>
                </div>
                <hr />
                {/* 11:15-11:55 Спікер1? Богдан Діденко */}
                <div className="program__txt__container">
                    <div className="time__container">
                        <h4>11:15 - 11:55</h4>
                    </div>
                    <div className="event__container">
                        <h4><br /> Богдан Діденко</h4>
                    </div>
                </div>
                <hr />
                {/* 11:55-12:00 Перерва */}
                <div className="program__txt__container">
                    <div className="time__container">
                        <h4>11:55 - 12:00</h4>
                    </div>
                    <div className="event__container">
                        <h4><span>Перерва</span></h4>
                    </div>
                </div>
                <hr />
                {/* 12:00-12:40 Спікер2? Сивоконь Олексій */}
                <div className="program__txt__container">
                    <div className="time__container">
                        <h4>12:00 - 12:40</h4>
                    </div>
                    <div className="event__container">
                        <h4><span>Спікер 2</span> <br /> Сивоконь Олексій</h4>
                    </div>
                </div>
                <hr />
                {/* 12:40-13:40 Кава брейк /Ланч */}
                <div className="program__txt__container">
                    <div className="time__container">
                        <h4>12:40 - 13:40</h4>
                    </div>
                    <div className="event__container">
                        <h4><span>Кава брейк / Ланч</span>
                        </h4>
                    </div>
                </div>
                <hr />
                {/* Панельні дискусії (13:40-14:10): розділені за темою */}
                <div className="program__txt__container">
                    <div className="time__container">
                        <h4>13:40 - 14:10</h4>
                    </div>
                    <div className="event__container">
                        <h4><span>Панельна дискусія 1: Як ваш АІ-проєкт оцінюють інвестори</span> <br />
                            Модератор: **Модератор** <br />
                            Учасники: Бойчук Андрій, Кицмей Тарас, Горовий Євген, Панін Юрій (Lapa), Костянтин Комаров (Uklon)
                        </h4>
                        <br />
                        <h4><span>Панельна дискусія 2: Технічна тема (AI-Engineering Panel)</span> <br />
                            Модератор: **Яцишин Володя** <br />
                            Учасники: Засоба Олександр, Шамуратов Олексій, GlobalLogic / EPAM, Чирка Юрій
                        </h4>
                    </div>
                </div>
                <hr />
                {/* 14:10-14:15 Перерва */}
                <div className="program__txt__container">
                    <div className="time__container">
                        <h4>14:10 - 14:15</h4>
                    </div>
                    <div className="event__container">
                        <h4><span>Перерва</span></h4>
                    </div>
                </div>
                <hr />
                {/* 14:15-14:35 Звіт по БФК та */}
                <div className="program__txt__container">
                    <div className="time__container">
                        <h4>14:15 - 14:35</h4>
                    </div>
                    <div className="event__container">
                        <h4><span>Звіт по БФК</span> <br /> Басистюк Олег</h4>
                    </div>
                </div>
                <hr />
                {/* 14:35-14:50 Нагородження стипендіатів */}
                <div className="program__txt__container">
                    <div className="time__container">
                        <h4>14:35 - 14:50</h4>
                    </div>
                    <div className="event__container">
                        <h4><span>Нагородження стипендіатів</span> <br /> Мельникова Наталія</h4>
                    </div>
                </div>
                <hr />
                {/* 14:50-15:20 Кава брейк Bingo */}
                <div className="program__txt__container">
                    <div className="time__container">
                        <h4>14:50 - 15:20</h4>
                    </div>
                    <div className="event__container">
                        <h4><span>Кава брейк / Bingo</span>
                        </h4>
                    </div>
                </div>
                <hr />
                {/* 15:20-16:00 Спікер 3? Бойчук Андрій */}
                <div className="program__txt__container">
                    <div className="time__container">
                        <h4>15:20 - 16:00</h4>
                    </div>
                    <div className="event__container">
                        <h4><span>Спікер 3</span> <br /> Бойчук Андрій</h4>
                    </div>
                </div>
                <hr />
                {/* 16:00-16:05 Перерва */}
                <div className="program__txt__container">
                    <div className="time__container">
                        <h4>16:00 - 16:05</h4>
                    </div>
                    <div className="event__container">
                        <h4><span>Перерва</span>
                        </h4>
                    </div>
                </div>
                <hr />
                {/* 16:05-16:30 Аукціон Для 25 бригади (Час трохи змінено на 16:05-16:30) */}
                <div className="program__txt__container">
                    <div className="time__container">
                        <h4>16:05 - 16:30</h4>
                    </div>
                    <div className="event__container">
                        <h4><span>Аукціон для 25 бригади</span> <br /> Басистюк Олег</h4>
                    </div>
                </div>
                <hr />
                {/* 16:30-16:35 Перерва */}
                <div className="program__txt__container">
                    <div className="time__container">
                        <h4>16:30 - 16:35</h4>
                    </div>
                    <div className="event__container">
                        <h4><span>Перерва</span></h4>
                    </div>
                </div>
                <hr />
                {/* 16:35-17:05 Панельна3 Етичні та соціальні аспекти впровадження AI в Україні */}
                <div className="program__txt__container">
                    <div className="time__container">
                        <h4>16:35 - 17:05</h4>
                    </div>
                    <div className="event__container">
                        <h4><span>Панельна дискусія 3: Етичні та соціальні аспекти впровадження AI в Україні</span> <br />
                            Модератор: Мельникова Наталя <br />
                            Учасники: Шаховська Наталя, Молчановський Олексій, Москаленко Андрій, Кицмей Тарас
                        </h4>
                    </div>
                </div>
                <hr />
                {/* 17:05-17:15 Завершення/Подяка (Час трохи змінено на 17:05-17:15) */}
                <div className="program__txt__container">
                    <div className="time__container">
                        <h4>17:05 - 17:15</h4>
                    </div>
                    <div className="event__container">
                        <h4><span>Завершення / Подяка</span> <br />Мельникова Наталія
                        </h4>
                    </div>
                </div>
                <hr />
            </div>
        </section>
    )
}

export default Program