import React, { useState } from 'react';
import loginCss from './index.module.css';
import loginLogo from '../../assets/logo.jpg';
import { Form, Input, Button, Radio, Space, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import ajax from '../../api/ajax';
import MyHeader from '../../components/myHeader';

export default function Register(props) {
	let [ username, setUsername ] = useState('');
	let [ password, setPassword ] = useState('');
	let [ password2, setPassword2 ] = useState('');
	let [ userType, setUserType ] = useState('jobHunter');

	let navigate = useNavigate();

	let confirmRegister = async () => {
		let obj = {};
		obj['username'] = username;
		obj['password'] = password;
		obj['password2'] = password2;
		obj['userType'] = userType;
		if (password !== password2) {
			Toast.show({
				content: '两次密码不一致'
			});
			return;
		}
		let result = await ajax('/api/users/register', obj, 'post');
		if (result.data.status !== -1) {
			Toast.show({
				icon: 'success',
				content: result.data.msg
			});
			navigate('/login');
		} else {
			Toast.show({
				icon: 'fail',
				content: result.data.msg
			});
		}
	};

	let toLogin = () => {
		// props.setLoginHeaderTitle();
		navigate('/login');
	};

	return (
		<div>
			<MyHeader title={'注册页面'} />
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
					<Form.Item label="确认密码：" name="confirmPassword">
						<Input
							placeholder="请再次输入密码"
							clearable
							type="password"
							value={password2}
							onChange={(val) => {
								setPassword2(val);
							}}
						/>
					</Form.Item>
					<Form.Item label="用户类型：">
						<Radio.Group value={userType} onChange={(val) => setUserType(val)}>
							<Space>
								<Radio value="jobHunter">求职者</Radio>
								<Radio value="boss">老板</Radio>
							</Space>
						</Radio.Group>
					</Form.Item>
				</Form>
				<Button color="success" onClick={confirmRegister}>
					确认注册
				</Button>
				<span onClick={toLogin}>已有账号，去登录</span>
			</div>
		</div>
	);
}

// export default connect(null, (dispatch) => {
// 	return { setLoginHeaderTitle: () => dispatch(setLoginHeaderTitle()) };
// })(Register);
