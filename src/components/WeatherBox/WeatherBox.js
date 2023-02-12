import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';

const WeatherBox = (props) => {
  // const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState('');
  const [icon, setIcon] = useState('');
  const [description, setDescription] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  //console.log('weatherData', weatherData.name);
  const handleCityChange = useCallback((city) => {
    setError(false);
    setPending(true);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f677ce87b388ec2a978cd8961ef7672e&units=metric`
    ).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          setCity(data.name);
          setTemp(data.main.temp);
          setIcon(data.weather[0].icon);
          setDescription(data.weather[0].main);
          setPending(false);
        });
      } else {
        setError(true);
      }
    });
  }, []);

  // const weatherData = {
  //   city: data.name,
  //   temp: data.main.temp,
  //   icon: data.weather[0].icon,
  //   description: data.weather[0].main,
  // };

  // if (!city)
  //   return (
  //     <section>
  //       <PickCity handleCityChange={handleCityChange} />
  //     </section>
  //   );
  return (
    <section>
      <PickCity handleCityChange={handleCityChange} />
      {city && !pending && !error && (
        <WeatherSummary
          city={city}
          temp={temp}
          icon={icon}
          description={description}
        />
      )}
      {pending && !error && <Loader />}
      {error && <ErrorBox />}
    </section>
  );
};

export default WeatherBox;
