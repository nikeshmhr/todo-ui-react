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

const App = () => {
	return (
		<div className="ui raised very padded text container segment">
			<AppHeader
				appName={appConfig.header.appName}
				iconClass={appConfig.header.appIconClass}
			/>
			<TodoAdd />

			<TabView />
		</div>
	);
};

export default App;
