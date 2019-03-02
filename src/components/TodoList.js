import React from "react";
import TodoItem from "./TodoItem";
import { connect } from "react-redux";
import _ from "lodash";

class TodoList extends React.Component {
	renderItem = item => {
		return (
			<TodoItem
				className="item"
				key={item._id}
				item={item}
				onCheckBoxClick={this.updateListItem}
			/>
		);
	};

	renderList = (headerText, todoElements) => {
		if (todoElements.length) {
			return (
				<>
					<h4>{headerText}</h4>
					<div className="ui middle aligned divided list">
						{todoElements}
					</div>
					<hr />
				</>
			);
		}
	};

	render() {
		const selectedStatus = this.props.status;
		const selectedTodos = this.props.todos[selectedStatus].data;

		if (_.isUndefined(selectedTodos.high) || _.isNull(selectedTodos.high)) {
			return <div>Loading...</div>;
		}
		const highPriorityTodos = selectedTodos.high.map(this.renderItem);
		const mediumPriorityTodos = selectedTodos.medium.map(this.renderItem);
		const lowPriorityTodos = selectedTodos.low.map(this.renderItem);
		return (
			<>
				{this.renderList("High", highPriorityTodos)}
				{this.renderList("Medium", mediumPriorityTodos)}
				{this.renderList("Low", lowPriorityTodos)}
			</>
		);
	}
}

const mapStateToProps = state => {
	return {
		todos: state.todos
	};
};

export default connect(mapStateToProps)(TodoList);
