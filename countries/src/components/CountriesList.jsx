import { useState } from "react";
import SingleCountry from "./SingleCountry";

const CountriesList = ({ country }) => {
	const [show, setShow] = useState(false);
	const handleShow = () => {
		setShow(!show);
	};
	return (
		<div>
			{country.name.common} <button onClick={handleShow}>show</button>{" "}
			{show && <SingleCountry country={country} />}
		</div>
	);
};

export default CountriesList;
