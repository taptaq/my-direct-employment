import React from 'react';
import { Card } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import QueueAnim from 'rc-queue-anim';

function UserList(props) {
	let { userList } = props;
	let navigate = useNavigate();
	// 跳转到聊天界面
	let toChatMessage = (userId, oppositeName) => {
		navigate(`/mainPage/chatMessage/${userId}/${oppositeName}`);
	};
	return (
		<div style={{ margin: '50px 0' }}>
			{/* <QueueAnim type="alpha" delay={100}> */}
			{userList.map((item) => {
				return (
					<Card
						headerStyle={{
							fontSize: '18px',
							color: '#999'
						}}
						title={<img src={require(`../../assets/${item.userHead}.png`)} />}
						extra={item.username}
						bodyStyle={{
							fontSize: '16px'
						}}
						key={item._id}
						onClick={() => toChatMessage(item._id, item.username)}
					>
						<div>职位：{item.pos}</div>
						{item.company ? <div>公司：{item.company}</div> : null}
						{item.salary ? <div>月薪：{item.salary}</div> : null}
						<div>描述：{item.info}</div>
					</Card>
				);
			})}
			{/* </QueueAnim> */}
		</div>
	);
}

export default connect((state) => {
	return { userList: state.userMsg.userList };
})(UserList);
