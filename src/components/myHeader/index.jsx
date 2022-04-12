import React from 'react';
import myHeaderCss from './index.module.css';
import { NavBar, Toast } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';

export default function MyHeader(props) {
	// console.log(props.headerTitle);
	let headerTitle = props.title;
	let hasBack = props.hasBack || false;
	let navigate = useNavigate();
	const back = () => {
		navigate(-1);
	};

	return (
		<div className={myHeaderCss.header}>
			<NavBar backArrow={hasBack} onBack={back}>
				{headerTitle}
			</NavBar>
		</div>
	);
}
