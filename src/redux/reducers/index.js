import {
	SAVE_USER,
	RECEIVE_USER_LIST,
	GET_CHAT_MESSAGE_LIST,
	GET_CHAT_MESSAGE,
	CHANGE_MESSAGE_READ
} from '../constant';

import { combineReducers } from 'redux';

let initUserState = {
	userMsg: {},
	userList: []
};
function userMsg(state = initUserState, action) {
	let { type, data } = action;
	switch (type) {
		case SAVE_USER:
			let userMsg = data;
			return { ...state, userMsg };
		case RECEIVE_USER_LIST:
			let userList = data;
			return { ...state, userList };
		default:
			return state;
	}
}

let initChatMsgListAndUserMsg = {
	allUser: {},
	chatMessageList: [],
	unReadCount: 0 //总的未读信息数量
};
function userChatMsgList(state = initChatMsgListAndUserMsg, action) {
	let { type, data } = action;

	// console.log(chatMessageList, 'data');

	switch (type) {
		case GET_CHAT_MESSAGE_LIST:
			let { allUser, userId, chatMessageList } = { ...data };
			return {
				allUser,
				chatMessageList,
				unReadCount: chatMessageList.reduce((init, cur) => {
					return init + (!cur.isRead && cur.to === userId ? 1 : 0);
				}, 0)
			};
		case GET_CHAT_MESSAGE:
			let { msg: chatMsg, userId: userId1 } = { ...data };
			return {
				allUser: state.allUser,
				chatMessageList: [ ...state.chatMessageList, chatMsg ],
				unReadCount: state.unReadCount + (!data.isRead && data.to === userId1 ? 1 : 0)
			};

		case CHANGE_MESSAGE_READ:
			let { count, from, to } = { ...data };
			state.chatMessageList.forEach((item) => {
				if (item.from === from && item.to === to && !item.isRead) {
					item.isRead = true;
				}
			});
			state.unReadCount -= count;
			return {
				allUser: state.allUser,
				chatMessageList: state.chatMessageList.map((item) => {
					if (item.from === from && item.to === to && !item.isRead) {
						return { ...item, isRead: true };
					} else {
						return item;
					}
				}),
				unReadCount: state.unReadCount < 0 ? 0 : state.unReadCount
			};

		default:
			return state;
	}
}

export default combineReducers({
	userMsg,
	userChatMsgList
});
