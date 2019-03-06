import axios from "axios";
import config from "../config/config";

let baseURL = config["development"].apiURL;
if (process.env.NODE_ENV === "production") {
	baseURL = config[process.env.NODE_ENV].apiURL;
}

export default axios.create({
	baseURL
});
