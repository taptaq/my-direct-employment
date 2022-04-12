import React from 'react';
import UserList from '../../components/userList';
// import { connect } from 'react-redux';

export default function JobHunterMainPage(props) {
	return <UserList />;
	// console.log(props.userList, 'jobhunter');
	// return <div>111</div>;
}

// export default connect((state) => {
// 	return { userList: state.userMsg.userList };
// })(JobHunterMainPage);
