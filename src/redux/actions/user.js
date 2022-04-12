import { SAVE_USER, RECEIVE_USER_LIST } from '../constant';
import { reqUserList } from '../../api/index';

const receiveUserList = (userList) => ({ type: RECEIVE_USER_LIST, data: userList });
const saveUserObj = (user) => ({ type: SAVE_USER, data: user });

export const saveUser = (user) => {
	return async (dispatch) => {
		dispatch(saveUserObj(user));
	};
};

export const getUserList = (type) => {
	return async (dispatch) => {
		const response = await reqUserList(type);
		const result = response.data;
		if (result.status === 0) {
			dispatch(receiveUserList(result.data.userList));
		}
	};
};
