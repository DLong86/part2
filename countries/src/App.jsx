import { useState, useEffect } from "react";
import countryService from "./services/countries";
import Search from "./components/Search";
import FindCountry from "./components/FindCountry";

const App = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		countryService
			.getAll()
			.then((response) => {
				setCountries(response);
			})
			.catch((error) => {
				console.error("Error fetching countries", error);
			});
	}, []);

	const filteredCountry = countries.filter((country) =>
		country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleChange = (e) => {
		setSearchTerm(e.target.value);
	};

	return (
		<div className="">
			<Search searchTerm={searchTerm} handleChange={handleChange} />
			<FindCountry filteredCountry={filteredCountry} />
		</div>
	);
};

export default App;
