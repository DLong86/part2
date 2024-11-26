import CountriesList from "./CountriesList";
import SingleCountry from "./SingleCountry";

const FindCountry = ({ filteredCountry }) => {
	if (filteredCountry.length > 10) {
		return <p>Too many matches, specify another filter.</p>;
	} else if (filteredCountry.length === 1) {
		return filteredCountry.map((country) => (
			<SingleCountry key={country.name.common} country={country} />
		));
	} else {
		return filteredCountry.map((country) => (
			<CountriesList key={country.name.common} country={country} />
		));
	}
};

export default FindCountry;
