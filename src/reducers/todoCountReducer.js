import { COUNT_TODOS } from "../actions/types";

const INITIAL_STATE = {
	pending: 0,
	ongoing: 0,
	completed: 0
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case COUNT_TODOS:
			return action.payload.data;

		default:
			return state;
	}
};
