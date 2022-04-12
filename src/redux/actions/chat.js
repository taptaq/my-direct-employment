import { GET_CHAT_MESSAGE_LIST, CHANGE_MESSAGE_READ, GET_CHAT_MESSAGE } from '../constant';
import { getChatMessageListAPI, changeChatMsgReadAPI } from '../../api/index';
import { io } from 'socket.io-client';

const receiveChatMsgList = (obj) => ({ type: GET_CHAT_MESSAGE_LIST, data: obj });
const changeChatMsgReadObj = (obj) => ({ type: CHANGE_MESSAGE_READ, data: obj });
const receiveChatMsg = (obj) => ({ type: GET_CHAT_MESSAGE, data: obj });

export const getChatMessageList = (userId) => {
	return async (dispatch) => {
		initIo(dispatch, userId);
		const response = await getChatMessageListAPI();
		const result = response.data;
		if (result.status === 0) {
			result.data.userId = userId;
			dispatch(receiveChatMsgList(result.data));
		}
	};
};

export const changeChatMsgRead = (from, to) => {
	return async (dispatch) => {
		const response = await changeChatMsgReadAPI(from);
		const result = response.data;
		if (result.status === 0) {
			let count = result.data.modifiedCount;
			dispatch(changeChatMsgReadObj({ count, from, to }));
		}
	};
};

function initIo(dispatch, userId) {
	if (!io.socket) {
		io.socket = io('ws://localhost:8888');
		io.socket.on('receiveMsg', (msg) => {
			// console.log('客户端接收服务端发送的信息', msg);
			// 只有当信息与自身相关，才保存该信息
			if (userId === msg.from || userId === msg.to) {
				dispatch(receiveChatMsg({ msg, userId }));
			}
		});
	}
}

export const sendMsg = (obj) => {
	return async (dispatch) => {
		io.socket.emit('sendMsg', obj);
	};
};
