import history from "../history";
import auth0 from "auth0-js";
import { AUTH_CONFIG } from "./auth0-variables";

export default class Auth {
	accessToken;
	idToken;
	expiresAt;

	auth0 = new auth0.WebAuth({
		domain: AUTH_CONFIG.domain,
		clientID: AUTH_CONFIG.clientId,
		redirectUri: AUTH_CONFIG.callbackUrl,
		responseType: "token id_token",
		scope: "openid profile email",
		audience: AUTH_CONFIG.audience
	});

	login = () => {
		this.auth0.authorize();
	};

	handleAuthentication = () => {
		this.auth0.parseHash((err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				this.setSession(authResult);
			} else if (err) {
				console.log(err);
				alert(
					`Error: ${
						err.error
					}. Check the console for further details.`
				);
			}
		});
	};

	getAccessToken = () => {
		return this.accessToken || localStorage.getItem("accessToken");
	};

	getIdToken = () => {
		return this.idToken;
	};

	setSession = authResult => {
		// Set isLoggedIn, accessToken, expiresAt, idToken flag in localStorage
		localStorage.setItem("isLoggedIn", "true");
		localStorage.setItem("accessToken", authResult.accessToken);
		localStorage.setItem("idToken", authResult.idToken);

		// Set the time that the access token will expire at
		let expireAt = authResult.expiresIn * 1000 + new Date().getTime();
		this.accessToken = authResult.accessToken;
		this.idToken = authResult.idToken;
		this.expiresAt = expireAt;
		localStorage.setItem("expiresAt", expireAt);

		// navigate to the main app route
		history.replace("/home");
	};

	renewSession = () => {
		this.auth0.checkSession((err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				this.setSession(authResult);
			} else if (err) {
				this.logout();
				console.log(err);
				alert(
					`Could not get a new token (${err.error}: ${
						err.error_description
					}).`
				);
			}
		});
	};

	logout = () => {
		// Remove tokens and expiry time
		this.accessToken = null;
		this.idToken = null;
		this.expiresAt = 0;

		// Remove isLoggedIn flag from localStorage
		localStorage.removeItem("isLoggedIn");
		localStorage.removeItem("accessToken");
		localStorage.removeItem("idToken");
		localStorage.removeItem("expiresAt");

		// navigate to main(login) route
		history.replace("/");
	};

	isAuthenticated = () => {
		// Check whether the current time is past the
		// access token's expiry time
		let expiresAt = this.expiresAt || localStorage.getItem("expiresAt");
		return new Date().getTime() < expiresAt;
	};

	/**
	 * Constructs and returns the Authorization header.
	 */
	getAuthorizationHeader = () => {
		console.log("Access token", this.getAccessToken());
		return {
			headers: { Authorization: `Bearer ${this.getAccessToken()}` }
		};
	};
}
