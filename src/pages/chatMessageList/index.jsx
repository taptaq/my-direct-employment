import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import chatMsgListCss from './index.module.css';
import { Image, Badge } from 'antd-mobile';
import { RightOutline } from 'antd-mobile-icons';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function ChatMessageList(props) {
	let { allUser, chatMessageList } = props.userChatMsgList;
	// console.log(props.userChatMsgList, 'userChatMsgList');

	let selfId = Cookies.get('userId').slice(3, -1);

	function getLsatChatMsgListArr(arr) {
		let lastMsgObj = {};
		arr.forEach((item) => {
			if (item.to === selfId && !item.isRead) {
				item.unReadCount = 1;
			} else {
				item.unReadCount = 0;
			}

			let chatId = item.chat_id;
			let lastChatMsg = lastMsgObj[chatId];
			if (!lastChatMsg) {
				lastMsgObj[chatId] = item;
			} else {
				let unReadCount = lastChatMsg.unReadCount + item.unReadCount;
				// 晚时间创建的信息覆盖掉早时间创建的，得出该聊天的最后一条信息
				if (item.create_time > lastChatMsg.create_time) {
					lastMsgObj[chatId] = item;
				}
				lastMsgObj[chatId].unReadCount = unReadCount;
			}
		});

		let newArr = Object.values(lastMsgObj).sort((item1, item2) => {
			return item2.create_time - item1.create_time;
		});

		return newArr;
	}

	// 对chatMessageList按chat_id进行分组
	let chatLastMessageListArr = getLsatChatMsgListArr(chatMessageList);
	// console.log(chatLastMessageListArr);

	let navigate = useNavigate();
	let toChatMsg = (userId, oppositeName) => {
		navigate(`/mainPage/chatMessage/${userId}/${oppositeName}`);
	};

	return (
		<div style={{ margin: '50px 0', padding: '10px', background: '#eee' }}>
			{chatLastMessageListArr.map((item, index) => {
				let targetUserId = item.to === selfId ? item.from : item.to;
				return (
					<div
						className={chatMsgListCss.oppositeDialog}
						key={index}
						onClick={() => toChatMsg(targetUserId, allUser[targetUserId].username)}
					>
						<Image
							width={30}
							height={30}
							src={require(`../../assets/${allUser[targetUserId].userHead}.png`)}
						/>
						<div className={chatMsgListCss.content}>
							<span>{item.content}</span>
							<span>{allUser[targetUserId].username}</span>
						</div>
						<div style={{ position: 'absolute', right: '10px' }}>
							{item.unReadCount ? <Badge content={item.unReadCount} style={{ margin: '0 5px' }} /> : null}
							<RightOutline />
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default connect((state) => {
	return { userChatMsgList: state.userChatMsgList };
})(ChatMessageList);
