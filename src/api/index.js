import ajax from './ajax';
export const loginAPI = (username, password) => ajax('/api/users/login', { username, password }, 'post');
export const reqUserList = (type) => ajax('/api/users/getUserList', { type }, 'get');
export const getChatMessageListAPI = () => ajax('/api/chats/getChatMessageList', {}, 'get');
export const changeChatMsgReadAPI = (userId) => ajax('/api/chats/readMsg', { userId }, 'post');
