import { combineReducers } from "redux";
import todoReducer from "./todoReducer";
import todoCountReducer from "./todoCountReducer";

export default combineReducers({
	todos: todoReducer,
	todoCount: todoCountReducer
});
