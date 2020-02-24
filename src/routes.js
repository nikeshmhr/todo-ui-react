import React from "react";
import { Route, Router } from "react-router-dom";
import Callback from "./callback/Callback";
import App from "./components/App";
import Entry from "./components/Entry";
import Auth from "./auth/Auth";
import history from "./history";

const auth = new Auth();

const handleAuthentication = ({ location }) => {
	if (/access_toke|id_token|error/.test(location.hash))
		auth.handleAuthentication();
};

export const makeMainRouters = () => {
	return (
		<Router history={history}>
			<div>
				<Route
					path="/"
					exact
					render={props => <Entry auth={auth} {...props} />}
				/>
				<Route
					path="/home"
					exact
					render={props => <App auth={auth} {...props} />}
				/>
				<Route
					path="/callback"
					exact
					render={props => {
						handleAuthentication(props);
						return <Callback {...props} />;
					}}
				/>
			</div>
		</Router>
	);
};
