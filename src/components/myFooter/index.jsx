import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import myFooterCss from './index.module.css';

export default function MyFooter(props) {
	let navigate = useNavigate();
	let location = useLocation();
	let { pathname } = location;
	let navList = props.navList;
	let setRouteActive = (val) => {
		navigate(val);
	};

	return (
		<div className={myFooterCss.myFooterWrap}>
			<TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
				{navList.map((item) => (
					<TabBar.Item
						key={item.path}
						icon={item.icon}
						title={item.text}
						badge={item.badge ? props.unReadCount ? props.unReadCount : null : null}
					/>
				))}
			</TabBar>
		</div>
	);
}
