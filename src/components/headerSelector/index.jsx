import React, { useState } from 'react';
import headerSelectorCss from './index.module.css';

export default function HeaderSelector(props) {
	let selectHeader = props.selectHeader;
	let [ curHeader, setCurHeader ] = useState('');
	let handleSelect = (val) => {
		setCurHeader(`${val}`);
		// console.log(curHeader, 'curHeader');
		selectHeader(`头像${val}`);
	};
	return (
		<div className={headerSelectorCss.headerSelectorWrap}>
			<span>{curHeader ? '已选择头像' : '请选择头像'}</span>
			<div className={headerSelectorCss.avatorWrap}>
				{Array.from({ length: 20 }).map((item, index) => {
					return (
						<img
							src={require(`../../assets/头像${index + 1}.png`)}
							className={headerSelectorCss.gridDemoItemBlock}
							className={curHeader == index + 1 ? headerSelectorCss.active : ''}
							onClick={() => handleSelect(index + 1)}
							key={index}
						/>
					);
				})}
			</div>
		</div>
	);
}
