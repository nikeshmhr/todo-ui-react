import todoapi from "../apis/todoapi";
import { PENDING, ONGOING, COMPLETED } from "../components/todo-status";
import { FETCH_BY_STATUS, COUNT_TODOS, CHANGE_STATUS } from "./types";

export const fetchByStatus = status => async dispath => {
	const response = await todoapi.get(`/tasks/status/${status}`);

	dispath({ type: FETCH_BY_STATUS, payload: { ...response.data, status } });
};

export const fetchCounts = () => async dispatch => {
	const response = await todoapi.get("/tasks/tcount/all");

	dispatch({ type: COUNT_TODOS, payload: response.data });
};

export const changeTodoStatus = (changeTo, id) => async dispatch => {
	const body = {
		status: changeTo
	};
	const response = await todoapi.put(`/tasks/${id}`, body);
	dispatch({ type: CHANGE_STATUS, payload: response.data });
	dispatch(fetchTodosBesides(changeTo));
	dispatch(fetchCounts());
};

/**
 * Fetch all todos besides the given status
 * @param {} status
 */
export const fetchTodosBesides = status => async dispatch => {
	if (status === PENDING) {
		dispatch(fetchByStatus(ONGOING));
		dispatch(fetchByStatus(COMPLETED));
	} else if (status === ONGOING) {
		dispatch(fetchByStatus(PENDING));
		dispatch(fetchByStatus(COMPLETED));
	} else if (status === COMPLETED) {
		dispatch(fetchByStatus(PENDING));
		dispatch(fetchByStatus(ONGOING));
	}
};
