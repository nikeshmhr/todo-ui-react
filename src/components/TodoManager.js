import React from "react";
import TodoList from "./TodoList";
import Faker from "faker";

class TodoManager extends React.Component {
	state = {
		todoItems: [
			{ id: 1, text: Faker.lorem.text(), checked: true },
			{ id: 2, text: Faker.lorem.text(), checked: false },
			{ id: 3, text: Faker.lorem.text(), checked: true },
			{ id: 4, text: Faker.lorem.text(), checked: false },
			{ id: 5, text: Faker.lorem.text(), checked: true },
			{ id: 6, text: Faker.lorem.text(), checked: true }
		]
	};

	updateListItem = item => {
		this.setState(item);
	};

	render() {
		return (
			<div className="ui relaxed divided list">
				<TodoList todos={this.state.todoItems} />
			</div>
		);
	}
}

export default TodoManager;
