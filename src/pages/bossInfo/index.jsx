import React, { useState } from 'react';
import MyHeader from '../../components/myHeader';
import HeaderSelector from '../../components/headerSelector';
import { Form, Input, Button, Toast } from 'antd-mobile';
import bossInfoCss from './index.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import ajax from '../../api/ajax';

export default function BossInfo() {
	let [ userHead, setUserHead ] = useState('');
	let [ pos, setPos ] = useState('');
	let [ company, setCompany ] = useState('');
	let [ salary, setSalary ] = useState('');
	let [ info, setInfo ] = useState('');
	let navigate = useNavigate();
	let { state: { id } } = useLocation();

	let saveBossInfo = async () => {
		let obj = {};
		obj['id'] = id;
		obj['userHead'] = userHead;
		obj['pos'] = pos;
		obj['company'] = company;
		obj['info'] = info;
		obj['salary'] = salary;
		let result = await ajax('/api/users/saveBossInfo', obj, 'post');
		let { data: { status, msg } } = result;
		if (status != -1) {
			Toast.show({
				icon: 'success',
				content: msg
			});
			navigate('/mainPage/bossMainPage');
		} else {
			Toast.show({
				icon: 'fail',
				content: msg
			});
		}
	};

	let selectHeader = (val) => {
		setUserHead(val);
	};

	return (
		<div>
			<MyHeader title={'老板信息完善页面'} />
			<div className={bossInfoCss.bossInfoWrap}>
				<HeaderSelector selectHeader={selectHeader} />
				<Form layout="horizontal">
					<Form.Item label="招聘职位" name="username">
						<Input
							placeholder="请输入招聘职位"
							clearable
							value={pos}
							onChange={(val) => {
								setPos(val);
							}}
						/>
					</Form.Item>
					<Form.Item label="公司名称" name="company">
						<Input
							placeholder="请输入公司名称"
							clearable
							value={company}
							onChange={(val) => {
								setCompany(val);
							}}
						/>
					</Form.Item>
					<Form.Item label="职位薪资" name="salary">
						<Input
							placeholder="请输入职位薪资"
							clearable
							value={salary}
							onChange={(val) => {
								setSalary(val);
							}}
						/>
					</Form.Item>
					<Form.Item label="职位要求" name="info">
						<Input
							placeholder="请输入职位要求"
							clearable
							value={info}
							onChange={(val) => {
								setInfo(val);
							}}
						/>
					</Form.Item>
				</Form>
				<Button color="success" onClick={saveBossInfo}>
					保存
				</Button>
			</div>
		</div>
	);
}
