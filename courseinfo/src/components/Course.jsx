const Total = ({ parts }) => {
	const totalExercises = parts.reduce(
		(accumulator, currentValue) => accumulator + currentValue.exercises,
		0
	);
	console.log(totalExercises);

	return (
		<>
			<p style={{ fontWeight: "bold" }}>total of {totalExercises} exercises</p>
		</>
	);
};

const Header = ({ title }) => <h1>{title}</h1>;

const Content = ({ parts }) => {
	return (
		<>
			{parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
		</>
	);
};

const Part = ({ part }) => {
	return (
		<>
			<p>
				{part.name} {part.exercises}
			</p>
		</>
	);
};

const Course = ({ course }) => {
	console.log(course);

	return (
		<div>
			<Header title={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

export default Course;
