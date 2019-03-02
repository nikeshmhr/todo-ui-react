import { FETCH_BY_STATUS } from "../actions/types";

const EMPTY_DATA = {
	count: 0,
	data: {}
};
const INITIAL_STATE = {
	pending: EMPTY_DATA,
	ongoing: EMPTY_DATA,
	completed: EMPTY_DATA
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FETCH_BY_STATUS:
			return { ...state, [action.payload.status]: action.payload };

		default:
			return state;
	}
};
