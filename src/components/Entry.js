import React from "react";
import history from "../history";

class Entry extends React.Component {
	login = () => {
		this.props.auth.login();
	};

	logout = () => {
		this.props.auth.logout();
	};

	componentDidMount() {
		const { renewSession } = this.props.auth;

		if (localStorage.getItem("isLoggedIn") === "true") {
			renewSession();
		}
	}

	render() {
		const { isAuthenticated } = this.props.auth;
		if (!isAuthenticated()) {
			this.login();
			return null;
		} else {
			history.replace("/home");
		}
	}
}

export default Entry;
