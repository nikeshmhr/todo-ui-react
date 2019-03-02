import React from "react";
import TodoItem from "./TodoItem";
import { connect } from "react-redux";
import _ from "lodash";

class TodoList extends React.Component {
	/**
	 * Construct ListItem component for given todo item.
	 */
	renderItem = item => {
		return <TodoItem className="item" key={item._id} item={item} />;
	};

	/**
	 * Renders the header and todo item elements provided in a list.
	 */
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

	renderNoTodos(shouldRender) {
		if (shouldRender)
			return (
				<div className="ui visible message">
					<p>There aren't any todos here...</p>
				</div>
			);
	}

	render() {
		const selectedStatus = this.props.status;
		const selectedTodos = this.props.todos[selectedStatus].data;

		if (_.isUndefined(selectedTodos.high) || _.isNull(selectedTodos.high)) {
			return <div>Loading...</div>;
		}
		const highPriorityTodos = selectedTodos.high.map(this.renderItem);
		const mediumPriorityTodos = selectedTodos.medium.map(this.renderItem);
		const lowPriorityTodos = selectedTodos.low.map(this.renderItem);

		// Check if there aren't any todos in the list
		const isEmpty =
			highPriorityTodos.length === 0 &&
			highPriorityTodos.length === mediumPriorityTodos.length &&
			mediumPriorityTodos.length === lowPriorityTodos.length;

		return (
			<>
				{this.renderList("High", highPriorityTodos)}
				{this.renderList("Medium", mediumPriorityTodos)}
				{this.renderList("Low", lowPriorityTodos)}
				{this.renderNoTodos(isEmpty)}
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
