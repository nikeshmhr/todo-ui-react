import React from "react";
import AppHeader from "./AppHeader";
import TabView from "./TabView";
import TodoAdd from "./TodoAdd";

const appConfig = {
	header: {
		appName: "My Todos",
		appIconClass: "calendar check outline icon"
	}
};

class App extends React.Component {
	login = () => {
		this.props.auth.login();
	};

	logout = () => {
		this.props.auth.logout();
	};

	render() {
		const { isAuthenticated } = this.props.auth;
		if (!isAuthenticated()) {
			this.login();
			return null;
		}
		return (
			<div className="ui raised very padded text container segment">
				<AppHeader
					onLogoutClick={this.logout}
					appName={appConfig.header.appName}
					iconClass={appConfig.header.appIconClass}
				/>
				<TodoAdd />

				<TabView />
			</div>
		);
	}
}

export default App;
