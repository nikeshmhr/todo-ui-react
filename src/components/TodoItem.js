import "./TodoItem.css";
import React from "react";
import { changeTodoStatus, changePriority } from "../actions";
import { connect } from "react-redux";
import { PENDING, COMPLETED, ONGOING } from "../components/todo-status";
import { HIGH, MEDIUM, LOW } from "../components/todo-priority";

class TodoItem extends React.Component {
	state = {
		editing: false
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

	/**
	 * Changes priority of given item to provided priority.
	 */
	onPriorityButtonClick = (item, changePriorityTo) => {
		this.props.changePriority(item, changePriorityTo);
	};

	/**
	 * Renders a Up arrow button for given item and attaches an click event listener.
	 */
	renderUpButton = item => {
		const currentPriorityOfItem = item.priority[0];

		const changePriorityTo =
			currentPriorityOfItem === MEDIUM ? HIGH : MEDIUM;
		return (
			<button
				className="tiny ui circular icon button"
				onClick={() => {
					this.onPriorityButtonClick(item, changePriorityTo);
				}}
			>
				<i className="angle up icon" />
			</button>
		);
	};

	/**
	 * Renders an Down arrow button for given item and attaches an click event listener.
	 */
	renderDownButton = item => {
		const currentPriorityOfItem = item.priority[0];

		const changePriorityTo = currentPriorityOfItem === HIGH ? MEDIUM : LOW;
		return (
			<button
				className="tiny ui circular icon button"
				onClick={() => {
					this.onPriorityButtonClick(item, changePriorityTo);
				}}
			>
				<i className="angle down icon" />
			</button>
		);
	};

	renderChangePriorityButton = item => {
		const { priority } = item;

		if (priority.includes(HIGH)) {
			// Render single button component to change priority to medium
			return (
				<div className="left floated content">
					{this.renderDownButton(item)}
				</div>
			);
		} else if (priority.includes(MEDIUM)) {
			// Render two button components to change priority to either high or low
			return (
				<div className="left floated content">
					{this.renderUpButton(item)}
					{this.renderDownButton(item)}
				</div>
			);
		} else if (priority.includes(LOW)) {
			// Render single button component to change priority to medium
			return (
				<div className="left floated content">
					{this.renderUpButton(item)}
				</div>
			);
		}
	};

	/**
	 * Calls an action creator to update the status
	 */
	onActionButtonClick = (changeStatusTo, item) => {
		this.props.changeTodoStatus(changeStatusTo, item._id);
	};

	render() {
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
				{this.renderChangePriorityButton(item)}
				<div className="content">{item.description}</div>
			</div>
		);
	}
}

// TODO: this might not be required, remove this
TodoItem.defaultProps = {
	item: {
		id: 0,
		description: "TODO",
		checked: false
	}
};

export default connect(
	null,
	{ changeTodoStatus, changePriority }
)(TodoItem);
