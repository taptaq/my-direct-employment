import React from 'react';
import { List, Button, Dialog, Toast } from 'antd-mobile';
import mineCss from './index.module.css';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Mine(props) {
	const Item = List.Item;
	let { username, userHead, company, pos, info, salary } = props.user;
	let navigate = useNavigate();
	let logout = async () => {
		const result = await Dialog.confirm({
			content: '是否退出登录'
		});
		if (result) {
			Cookies.remove('userId');
			props.setUser({});
			navigate('/login');
			Toast.show({
				icon: 'success',
				content: '退出成功'
			});
		}
	};

	return (
		<div className={mineCss.mineWrap}>
			<div className={mineCss.userMsg}>
				<img src={require(`../../assets/${userHead}.png`)} alt="" />
				<div className={mineCss.name}>{username}</div>
				<div className={mineCss.describe}>{company}</div>
			</div>
			<List renderHeader={() => '相关信息'}>
				<Item multipleLine>职位: {pos || '暂无'}</Item>
				<Item multipleLine>简介: {info || '暂无'}</Item>
				<Item multipleLine>薪资: {salary || '保密'}</Item>
			</List>
			<Button color="danger" onClick={logout}>
				退出登录
			</Button>
		</div>
	);
}

export default connect((state) => {
	return { user: state.userMsg.userMsg };
})(Mine);
