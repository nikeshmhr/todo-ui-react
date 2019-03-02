import "./TodoItem.css";
import React from "react";
import { changeTodoStatus } from "../actions";
import { connect } from "react-redux";
import { PENDING, COMPLETED, ONGOING } from "../components/todo-status";

class TodoItem extends React.Component {
	state = {
		editing: false
	};

	onCheckboxChange = e => {
		this.props.item.checked = e.target.checked;
		this.props.onCheckBoxClick(this.props.item);
	};

	renderPendingButton = item => {
		return (
			<button
				className="ui circular yellow icon button"
				data-tooltip="Pending"
				onClick={() => {
					this.onActionButtonClick(PENDING, item);
				}}
			>
				<i className="hourglass end icon" />
			</button>
		);
	};

	renderOngoingButton = item => {
		return (
			<button
				className="ui circular blue icon button"
				data-tooltip="Ongoing"
				onClick={() => {
					this.onActionButtonClick(ONGOING, item);
				}}
			>
				<i className="sync icon" />
			</button>
		);
	};

	renderCompletedButton = item => {
		return (
			<button
				className="ui circular green icon button"
				data-tooltip="Completed"
				onClick={() => {
					this.onActionButtonClick(COMPLETED, item);
				}}
			>
				<i className="flag checkered icon" />
			</button>
		);
	};

	/**
	 * Renders action button based on the status of an item provided as prop.
	 * Either move to (Ongoing, Completed, Pending)
	 */
	renderActionButtons = item => {
		var status = item.status[0];

		switch (status) {
			case PENDING:
				return (
					<div className="right floated content">
						<div className="ui icon buttons">
							{this.renderOngoingButton(item)}
							{this.renderCompletedButton(item)}
						</div>
					</div>
				);

			case ONGOING:
				return (
					<div className="right floated content">
						<div className="ui icon buttons">
							{this.renderPendingButton(item)}
							{this.renderCompletedButton(item)}
						</div>
					</div>
				);

			case COMPLETED:
				return (
					<div className="right floated content">
						<div className="ui icon buttons">
							{this.renderPendingButton(item)}
							{this.renderOngoingButton(item)}
						</div>
					</div>
				);

			default:
				return;
		}
	};

	onActionButtonClick = (actionType, item) => {
		console.log(
			"clicked button with action " + actionType + " for item ",
			item
		);
		this.props.changeTodoStatus(actionType, item._id);
	};

	render() {
		console.log("todoitem", this.props.item);
		var item = this.props.item;
		return (
			<div className="item">
				{this.renderActionButtons(item)}
				<div className="right floated content">
					<div className="ui icon buttons">
						<button
							className="ui circular icon button"
							data-tooltip="Edit"
						>
							<i className="edit icon" />
						</button>
						<button
							className="ui circular red icon button"
							data-tooltip="Delete"
						>
							<i className="cut icon" />
						</button>
					</div>
				</div>
				<i className="angle down icon" />
				<div className="content">{item.description}</div>
			</div>
		);
	}
}

TodoItem.defaultProps = {
	item: {
		id: 0,
		description: "TODO",
		checked: false
	}
};

export default connect(
	null,
	{ changeTodoStatus }
)(TodoItem);
