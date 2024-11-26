const Search = ({ searchTerm, handleChange }) => {
	return (
		<form>
			find countries <input value={searchTerm} onChange={handleChange} />
		</form>
	);
};

export default Search;
