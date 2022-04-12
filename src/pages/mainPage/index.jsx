import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import MyHeader from '../../components/myHeader';
import MyFooter from '../../components/myFooter';
import { AppstoreOutline, MessageOutline, UserOutline } from 'antd-mobile-icons';
import { connect } from 'react-redux';

function MainPage(props) {
	let navList = [
		{
			path: '/mainPage/bossMainPage',
			title: '求职者列表',
			icon: <AppstoreOutline />,
			text: '求职者'
		},
		{
			path: '/mainPage/jobHunterMainPage',
			title: '老板列表',
			icon: <AppstoreOutline />,
			text: '老板'
		},
		{
			path: '/mainPage/chatMessageList',
			title: '消息列表',
			icon: <MessageOutline />,
			text: '消息',
			badge: true
		},
		{
			path: '/mainPage/mine',
			title: '用户中心',
			icon: <UserOutline />,
			text: '个人'
		}
	];

	let location = useLocation();
	let path = location.pathname;
	let curNav = navList.find((item) => item.path === path); //当前导航路由

	// console.log(props.state, 'state');

	let { userType } = props.user;

	if (userType === 'jobHunter') {
		navList = navList.filter((item) => {
			return item.text !== '求职者';
		});
	} else {
		navList = navList.filter((item) => {
			return item.text !== '老板';
		});
	}

	return (
		<div>
			{curNav ? <MyHeader title={curNav.title} /> : null}
			<Outlet />
			{curNav ? <MyFooter navList={navList} unReadCount={props.unReadCount} /> : null}
		</div>
	);
}

export default connect((state) => {
	return { user: state.userMsg.userMsg, unReadCount: state.userChatMsgList.unReadCount };
})(MainPage);
