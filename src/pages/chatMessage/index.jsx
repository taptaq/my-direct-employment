import React, { useEffect, useState } from 'react';
import QueueAnim from 'rc-queue-anim';
import MyHeader from '../../components/myHeader';
import chatMsgCss from './index.module.css';
import { Image, Input } from 'antd-mobile';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { sendMsg, changeChatMsgRead } from '../../redux/actions/chat';

function ChatMessage(props) {
	let { userHead } = props.user;
	let [ content, setContent ] = useState('');
	let [ isShowEmoji, setShowEmoji ] = useState(false);
	let { allUser, chatMessageList } = props.userChatMsgList;
	let selfId = Cookies.get('userId').slice(3, -1);
	let { userId, oppositeName } = useParams();
	let emojiArr = [
		'😀',
		'😃',
		'😄',
		'😆',
		'😅',
		'🤣',
		'😂',
		'🙂',
		'🙃',
		'😉',
		'😊',
		'😇',
		'😍',
		'🤩',
		'😘',
		'😗',
		'😚',
		'😙',
		'😋',
		'😛',
		'😜',
		'🤪',
		'😝',
		'🤑',
		'🤗',
		'🤭',
		'🤫',
		'🤔',
		'🤐',
		'🤨'
	];

	emojiArr = emojiArr.map((item) => {
		return {
			text: item
		};
	});

	useEffect(() => {
		// 聊天框滚动到底部
		window.scrollTo(0, document.body.scrollHeight);

		// 更新信息的未读状态
		props.changeChatMsgRead(userId, selfId);
	}, []);

	// 当前聊天的chat_id
	let chat_id = [ selfId, userId ].sort().join('_');

	let chatMsg = chatMessageList.filter((item) => {
		return item.chat_id === chat_id;
	});

	// console.log(chatMsg, 'chatMsg');

	let sendMsg = () => {
		let from = selfId;
		let to = userId;
		if (content.trim()) {
			props.sendMsg({
				from,
				to,
				content
			});
			setContent('');
			setShowEmoji(false);
		}
	};

	let showToInput = (emojiItem) => {
		if (emojiItem) {
			setContent(`${content}${emojiItem}`.trim());
		}
	};

	let oppositeHeadImg = allUser[userId].userHead;
	let oppositeHead = require(`../../assets/${oppositeHeadImg}.png`);

	let selfHead = require(`../../assets/${userHead}.png`);

	return (
		<div>
			<MyHeader title={oppositeName} hasBack={true} />
			<div className={chatMsgCss.chatMsgWrap}>
				<div className={chatMsgCss.dialogWrap} style={{ marginBottom: isShowEmoji ? '32%' : '6%' }}>
					<QueueAnim type="alpha">
						{chatMsg.map((item, index) => {
							if (item.from === userId) {
								return (
									<div className={chatMsgCss.oppositeDialog} key={index}>
										<Image width={30} height={30} src={oppositeHead} />
										<span>{item.content}</span>
									</div>
								);
							} else {
								return (
									<div className={chatMsgCss.selfDialog} key={index}>
										<span>{item.content}</span>
										<Image width={30} height={30} src={selfHead} />
									</div>
								);
							}
						})}
					</QueueAnim>
				</div>

				<div className={chatMsgCss.bottomWrap} style={{ height: isShowEmoji ? '25%' : '7.5%' }}>
					<div className={chatMsgCss.inputWrap}>
						<Input placeholder="请输入内容" clearable value={content} onChange={(val) => setContent(val)} />
						<button onClick={() => setShowEmoji(!isShowEmoji)}>😀</button>
						<button onClick={sendMsg}>发送</button>
					</div>

					{isShowEmoji ? (
						<div className={chatMsgCss.emojiWrap}>
							{emojiArr.map((item) => {
								return (
									<div className={chatMsgCss.emojiItem} onClick={() => showToInput(item.text)}>
										{item.text}
									</div>
								);
							})}
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default connect(
	(state) => {
		return { userChatMsgList: state.userChatMsgList, user: state.userMsg.userMsg };
	},
	{
		sendMsg,
		changeChatMsgRead
	}
)(ChatMessage);
