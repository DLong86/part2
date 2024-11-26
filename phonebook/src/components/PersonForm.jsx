function PersonForm({
	onAddNewNumber,
	onAddNewName,
	onSubmit,
	newName,
	newNumber,
}) {
	return (
		<form onSubmit={onSubmit}>
			<div>
				name: <input value={newName} onChange={onAddNewName} />
				number: <input value={newNumber} onChange={onAddNewNumber} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
}

export default PersonForm;
