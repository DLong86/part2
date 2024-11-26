import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/person";
import Notification from "./components/Notification";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchedName, setSearchedName] = useState("");
	const [notificationMessage, setnotificationMessage] = useState(null);

	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	const handleNotificationMessage = (message, type) => {
		setnotificationMessage({
			message,
			type,
		});
		setTimeout(() => {
			setnotificationMessage(null);
		}, 5000);
		console.log("notification", notificationMessage);
	};

	const handleAddNewName = (e) => {
		setNewName(e.target.value);
	};

	const handleNewNumber = (e) => {
		setNewNumber(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let nameExists = false;

		persons.forEach((person) => {
			if (person.name === newName) {
				nameExists = true;
				if (
					window.confirm(
						`${newName} is already added to the phonebook. Replace the old number with a new one?`
					)
				) {
					const changeNumber = {
						...person,
						number: newNumber,
					};
					personService
						.update(person.id, changeNumber)
						.then((returnedPerson) => {
							setPersons(
								persons.map((person) =>
									person.id !== returnedPerson.id ? person : returnedPerson
								)
							);
							handleNotificationMessage(
								`Updated ${returnedPerson.name}'s number`,
								"success"
							);
						})
						.catch((error) => {
							if (error.response && error.response.status === 404) {
								setPersons(persons.filter((p) => p.id !== person.id));
								handleNotificationMessage(
									`${person.name} has already been removed from the server`,
									"error"
								);
							} else {
								handleNotificationMessage(
									`An error occurred while updating ${person.name}'s number`,
									"error"
								);
							}
						});
				}
			}
		});
		if (!nameExists) {
			const newPerson = {
				name: newName,
				number: newNumber,
			};
			personService.create(newPerson).then((returnedPerson) => {
				setPersons(persons.concat(returnedPerson));
				handleNotificationMessage(`Added ${returnedPerson.name}`, "success");
			});
		}

		setNewName("");
		setNewNumber("");
	};

	const filteredNames = persons.filter((person) => {
		return person.name.toLowerCase().includes(searchedName.toLowerCase());
	});

	const handleDelete = (person) => {
		// const personId = persons.find((person) => person.id === id);
		if (window.confirm(`Do you really want to delete ${person.name}?`))
			personService
				.deletePerson(person.id)
				.then(() => {
					setPersons(persons.filter((p) => p.id !== person.id));
					handleNotificationMessage(
						`${person.name} has been deleted`,
						"success"
					);
				})
				.catch((error) => {
					console.log(error);
					handleNotificationMessage(
						`${person.name} has already been removed from the server`,
						"error"
					);
				});
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={notificationMessage} />
			<Filter searchedName={searchedName} setSearchedName={setSearchedName} />

			<h3>add a new</h3>
			<PersonForm
				onSubmit={handleSubmit}
				newName={newName}
				newNumber={newNumber}
				onAddNewName={handleAddNewName}
				onAddNewNumber={handleNewNumber}
			/>

			<h3>Numbers</h3>
			<Persons filteredNames={filteredNames} deletePerson={handleDelete} />
		</div>
	);
};

export default App;
