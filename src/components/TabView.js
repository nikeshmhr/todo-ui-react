import React from "react";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";
import TodoList from "./TodoList";
import { connect } from "react-redux";
import { fetchByStatus, fetchCounts } from "../actions";

class TabView extends React.Component {
	onTabClick = key => {
		this.props.fetchByStatus(key);
	};

	componentDidMount() {
		// Fetch counts to show in tab
		this.props.fetchCounts();
		// This is to initially fetch data
		this.props.fetchByStatus("pending");
	}

	render() {
		const { todosCount } = this.props;
		return (
			<Tab.Container defaultActiveKey="pending">
				<Nav className="nav nav-tabs">
					<Nav.Item>
						<Nav.Link eventKey="pending" onSelect={this.onTabClick}>
							Pending&nbsp;
							<Badge pill variant="warning">
								{todosCount.pending || "0"}
							</Badge>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link eventKey="ongoing" onSelect={this.onTabClick}>
							Ongoing&nbsp;
							<Badge pill variant="primary">
								{todosCount.ongoing || "0"}
							</Badge>
						</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link
							eventKey="completed"
							onSelect={this.onTabClick}
						>
							Completed&nbsp;
							<Badge pill variant="success">
								{todosCount.completed || "0"}
							</Badge>
						</Nav.Link>
					</Nav.Item>
				</Nav>
				<Tab.Content>
					<Tab.Pane eventKey="pending">
						<TodoList status="pending" />
					</Tab.Pane>
					<Tab.Pane eventKey="ongoing">
						<TodoList status="ongoing" />
					</Tab.Pane>
					<Tab.Pane eventKey="completed">
						<TodoList status="completed" />
					</Tab.Pane>
				</Tab.Content>
			</Tab.Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		todosCount: state.todoCount
	};
};

export default connect(
	mapStateToProps,
	{ fetchByStatus, fetchCounts }
)(TabView);
