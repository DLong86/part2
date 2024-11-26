import { useState, useEffect } from "react";
import axios from "axios";

const WeatherInfo = ({ country }) => {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		const apiKey = import.meta.env.VITE_API_KEY;

		axios
			.get(
				`https://api.openweathermap.org/data/3.0/weather?q=${country.capital[0]}&appid=${apiKey}`
			)
			.then((response) => {
				console.log("Weather data:", response.data);
				setWeather(response.data);
			});
	}, [country]);

	if (weather === null) return null;

	return (
		<div className="">
			<h2>{`Weasther in ${country.capital[0]}`}</h2>
			<p>{`temperature ${weather.main.temp - (273.5).toFixed(2)} Celcius`}</p>
			<img
				src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
				alt="current icon to show weather"
			/>
			<p>{`wind ${weather.wind.speed} m/s`}</p>
		</div>
	);
};

export default WeatherInfo;
