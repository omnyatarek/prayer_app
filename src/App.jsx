import { useEffect, useState } from 'react';
import Prayer from './component/Prayer';
import './index.css';

function App() {
  const cities = [
    { name: 'القاهره', value: 'Cairo' },
    { name: 'الاسكندريه', value: 'Alexandria' },
    { name: 'الدقهليه', value: 'Dakahlia' },
    { name: 'الجيزه', value: 'Giza' },
    { name: 'اسوان', value: 'Aswan' },
  ];

  const [selectedCity, setSelectedCity] = useState('Cairo');
  const [prayerTimes, setPrayerTimes] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=Egypt&method=5`
    )
      .then((res) => res.json())
      .then((data) => {
        setPrayerTimes(data.data.timings);
      })
      .catch((err) => {
        console.error('Error fetching prayer times:', err);
      });
  }, [selectedCity]);

  return (
    <section>
      <div className="container">
        <div className="top_sec">
          <div className="city">
            <h3>المدينه</h3>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {cities.map((city_obj) => (
                <option key={city_obj.value} value={city_obj.value}>
                  {city_obj.name}
                </option>
              ))}
            </select>
          </div>
          <div className="date">
            <h3>التاريخ</h3>
            <h4>{new Date().toLocaleDateString('EN-EG')}</h4>
          </div>
        </div>

        {prayerTimes ? (
          <>
            <Prayer name="الفجر" time={`${prayerTimes.Fajr} AM`} />
            <Prayer name="الظهر" time={`${prayerTimes.Dhuhr} PM`} />
            <Prayer name="العصر" time={`${prayerTimes.Asr} PM`} />
            <Prayer name="المغرب" time={`${prayerTimes.Maghrib} PM`} />
            <Prayer name="العشاء" time={`${prayerTimes.Isha} PM`} />
          </>
        ) : (
          <p>جاري التحميل...</p>
        )}
      </div>
    </section>
  );
}

export default App;
