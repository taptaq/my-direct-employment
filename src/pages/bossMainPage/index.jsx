import React from 'react';
import UserList from '../../components/userList';
import { connect } from 'react-redux';

function BossMainPage(props) {
	return <UserList userList={props.userList} />;
}

export default connect((state) => {
	return { userList: state.userListReducer };
})(BossMainPage);
