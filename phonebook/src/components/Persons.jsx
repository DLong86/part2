function Persons({ filteredNames, deletePerson }) {
	return (
		<ul style={{ paddingLeft: 0 }}>
			{filteredNames.map((filtered) => (
				<p key={filtered.id}>
					{filtered.name} {filtered.number}
					<button onClick={() => deletePerson(filtered)}>delete</button>
				</p>
			))}
		</ul>
	);
}

export default Persons;
