import React, { useState, useEffect } from 'react';
import loginCss from './index.module.css';
import loginLogo from '../../assets/logo.jpg';
import { Form, Input, Button, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import ajax from '../../api/ajax';
import { saveUser, getUserList } from '../../redux/actions/user';
import { getChatMessageList } from '../../redux/actions/chat';
import { connect } from 'react-redux';
import MyHeader from '../../components/myHeader';
import Cookies from 'js-cookie';
import { loginAPI } from '../../api/index';

function Login(props) {
	let navigate = useNavigate();
	let [ username, setUsername ] = useState('');
	let [ password, setPassword ] = useState('');

	// 一开始判断cookie里是否有userId
	useEffect(() => {
		if (!Cookies.get('userId')) {
			return;
		}

		let userId = Cookies.get('userId').slice(3, -1);

		ajax('/api/users/findUser', { id: userId }, 'post').then((res) => {
			let { data: { status, data: { user } } } = res;
			// console.log(result);
			let { userType } = user;

			if (status !== -1) {
				props.saveUser(user);
				if (userType === 'jobHunter') {
					props.getUserList('boss');
					navigate('/mainPage/jobHunterMainPage');
				} else {
					props.getUserList('jobHunter');
					navigate('/mainPage/bossMainPage');
				}
				props.getChatMessageList(userId);
				return;
			}
		});
	}, []);

	let confirmLogin = async () => {
		const response = await loginAPI(username, password);
		const result = response.data;
		let { status, data: { user } } = result;
		// props.userLogin(obj);
		if (status === 0) {
			let { userType, userHead, _id } = user;
			props.saveUser(user);

			Toast.show({
				icon: 'success',
				content: '登陆成功'
			});
			if (userType === 'boss') {
				if (!userHead) {
					navigate('/mainPage/bossInfo', {
						state: { id: _id }
					});
				} else {
					props.getUserList('jobHunter');
					navigate('/mainPage/bossMainPage');
				}
			} else {
				if (!userHead) {
					navigate('/mainPage/jobHunterInfo', {
						state: { id: _id }
					});
				} else {
					props.getUserList('boss');
					navigate('/mainPage/jobHunterMainPage');
				}
			}
			props.getChatMessageList(_id);
		} else {
			Toast.show({
				icon: 'fail',
				content: '登陆失败'
			});
		}
	};

	let toRegister = () => {
		navigate('/register');
	};

	return (
		<div>
			<MyHeader title={'登录页面'} />
			<div className={loginCss.loginContainer}>
				<img src={loginLogo} alt="" />
				<Form layout="horizontal">
					<Form.Item label="用户名：" name="username">
						<Input
							placeholder="请输入用户名"
							clearable
							value={username}
							onChange={(val) => {
								setUsername(val);
							}}
						/>
					</Form.Item>
					<Form.Item label="密码：" name="password">
						<Input
							placeholder="请输入密码"
							clearable
							type="password"
							value={password}
							onChange={(val) => {
								setPassword(val);
							}}
						/>
					</Form.Item>
				</Form>
				<Button color="success" onClick={confirmLogin}>
					确认登录
				</Button>
				<span onClick={toRegister}>没有账号，去注册</span>
			</div>
		</div>
	);
}

export default connect(null, { saveUser, getChatMessageList, getUserList })(Login);
