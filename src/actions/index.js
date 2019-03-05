import todoapi from "../apis/todoapi";
import { PENDING, ONGOING, COMPLETED } from "../components/todo-status";
import {
	FETCH_BY_STATUS,
	COUNT_TODOS,
	UPDATE_TODO,
	CREATE_TODO
} from "./types";

/**
 * Fetches the list of todos for given staus
 * @param {} status
 */
export const fetchByStatus = status => async dispath => {
	const response = await todoapi.get(`/tasks/status/${status}`);

	dispath({ type: FETCH_BY_STATUS, payload: { ...response.data, status } });
};

/**
 * Fetches a count for each todo category/status
 */
export const fetchCounts = () => async dispatch => {
	const response = await todoapi.get("/tasks/tcount/all");

	dispatch({ type: COUNT_TODOS, payload: response.data });
};

/**
 * Updates the status of todo for given id to given status value.
 * @param {*} changeTo
 * @param {*} id
 */
export const changeTodoStatus = (changeTo, id) => async dispatch => {
	// TODO: refactor needed, repetitive steps in changePriority function
	const body = {
		status: changeTo
	};
	const response = await todoapi.put(`/tasks/${id}`, body);
	dispatch({ type: UPDATE_TODO, payload: response.data });
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
	} else {
		dispatch(fetchByStatus(PENDING));
		dispatch(fetchByStatus(ONGOING));
		dispatch(fetchByStatus(COMPLETED));
	}
};

/**
 * Changes the priority for given item._id with provided priority value
 * @param {*} item
 * @param {*} changeTo
 */
export const changePriority = (item, changeTo) => async dispatch => {
	// TODO: refactor needed, repetitive steps in changeTodoStatus function
	const body = {
		priority: changeTo
	};
	const response = await todoapi.put(`/tasks/${item._id}`, body);
	dispatch({ type: UPDATE_TODO, payload: response.data });
	dispatch(fetchByStatus(item.status[0]));
};

export const deleteTodo = item => async dispatch => {
	await todoapi.delete(`/tasks/${item._id}`);
	dispatch(fetchByStatus(item.status[0]));
	dispatch(fetchCounts());
};

export const createTodo = description => async dispatch => {
	const response = await todoapi.post(`/tasks`, { description });
	dispatch({ type: CREATE_TODO, payload: response.data });
	dispatch(fetchByStatus(response.data.data.status[0]));
	dispatch(fetchCounts());
};

export const updateDescription = item => async dispatch => {
	// Update description only.
	const response = await todoapi.put(`/tasks/${item._id}`, {
		description: item.description
	});
	dispatch({ type: UPDATE_TODO, payload: response.data });
	dispatch(fetchByStatus(item.status[0]));
};
