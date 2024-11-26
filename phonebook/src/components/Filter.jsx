function Filter({ searchedName, setSearchedName }) {
	const handleFilter = (e) => {
		setSearchedName(e.target.value);
	};
	return (
		<div>
			filter shown with: <input value={searchedName} onChange={handleFilter} />
		</div>
	);
}

export default Filter;
