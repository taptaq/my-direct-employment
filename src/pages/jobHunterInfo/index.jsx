import React, { useState } from 'react';
import MyHeader from '../../components/myHeader';
import HeaderSelector from '../../components/headerSelector';
import { Form, Input, Button, Toast } from 'antd-mobile';
import jobHunterInfoCss from './index.module.css';
import ajax from '../../api/ajax';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BossInfo() {
	let [ userHead, setUserHead ] = useState('');
	let [ pos, setPos ] = useState('');
	let [ info, setInfo ] = useState('');
	let navigate = useNavigate();
	let { state: { id } } = useLocation();

	let saveJobHunterInfo = async () => {
		let obj = {};
		obj['id'] = id;
		obj['userHead'] = userHead;
		obj['pos'] = pos;
		obj['info'] = info;
		let result = await ajax('/api/users/saveJobHunterInfo', obj, 'post');
		let { data: { status, msg } } = result;
		if (status != -1) {
			Toast.show({
				icon: 'success',
				content: msg
			});
			navigate('/mainPage/jobHunterMainPage');
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
			<MyHeader title={'求职者信息完善页面'} />
			<div className={jobHunterInfoCss.jobHunterInfoWrap}>
				<HeaderSelector selectHeader={selectHeader} />
				<Form layout="horizontal">
					<Form.Item label="求职岗位" name="pos">
						<Input
							placeholder="请输入求职岗位"
							clearable
							value={pos}
							onChange={(val) => {
								setPos(val);
							}}
						/>
					</Form.Item>
					<Form.Item label="个人介绍" name="selfIntroduction">
						<Input
							placeholder="请输入个人介绍"
							clearable
							value={info}
							onChange={(val) => {
								setInfo(val);
							}}
						/>
					</Form.Item>
				</Form>
				<Button color="success" onClick={saveJobHunterInfo}>
					保存
				</Button>
			</div>
		</div>
	);
}
