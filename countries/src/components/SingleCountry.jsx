import WeatherInfo from "./WeatherInfo";

const SingleCountry = ({ country }) => {
	return (
		<ul>
			<h1>{country.name.common}</h1>
			<p>Capital: {country.capital[0]}</p>
			<p>Area: {country.area}</p>
			<h3>Languages:</h3>
			<ul style={{ marginBottom: "20px" }}>
				{Object.values(country.languages).map((language) => (
					<li>{language}</li>
				))}
			</ul>
			<img
				src={country.flags.png}
				alt={`${country.name.common}'s national flag.'`}
				height="200"
				width="250"
			/>
			<WeatherInfo country={country} />
		</ul>
	);
};

export default SingleCountry;
