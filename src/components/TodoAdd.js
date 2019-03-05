import React from "react";
import { connect } from "react-redux";
import { createTodo } from "../actions";

const ESC_KEY_CODE = 27;
const INITIAL_STATE = {
	addClicked: false,
	description: ""
};

class TodoAdd extends React.Component {
	state = INITIAL_STATE;

	onInputChange = e => {
		this.setState({ description: e.target.value });
	};

	onFormSubmit = e => {
		// Cause we don't want our page to refresh
		e.preventDefault();

		this.props.createTodo(this.state.description);
		this.setState(INITIAL_STATE);
	};

	onKeyPressed = e => {
		if (e.keyCode === ESC_KEY_CODE) {
			this.setState(INITIAL_STATE);
		}
	};

	render() {
		if (!this.state.addClicked) {
			return (
				<div>
					<button
						className="tiny ui circular icon button"
						onClick={() => {
							this.setState({ addClicked: true });
						}}
					>
						<i className="icon add" />
					</button>
				</div>
			);
		}
		return (
			<div>
				<form className="ui form" onSubmit={this.onFormSubmit}>
					<input
						type="text"
						placeholder="Description..."
						value={this.state.description}
						onChange={this.onInputChange}
						onKeyDown={this.onKeyPressed}
					/>
				</form>
			</div>
		);
	}
}

export default connect(
	null,
	{ createTodo }
)(TodoAdd);
