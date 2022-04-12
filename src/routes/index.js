import Login from '../pages/login';
import Register from '../pages/register';
import MainPage from '../pages/mainPage';
import BossInfo from '../pages/bossInfo';
import JobHunterInfo from '../pages/jobHunterInfo';
import BossMainPage from '../pages/bossMainPage';
import JobHunterMainPage from '../pages/jobHunterMainPage';
import ChatMessageList from '../pages/chatMessageList';
import ChatMessage from '../pages/chatMessage';
import Mine from '../pages/mine';
import { Navigate } from 'react-router-dom';

let routesArr = [
	{
		path: '/login',
		element: <Login />
	},
	{
		path: '/register',
		element: <Register />
	},
	{
		path: '/mainPage',
		element: <MainPage />,
		children: [
			{
				path: 'bossInfo',
				element: <BossInfo />
			},
			{
				path: 'jobHunterInfo',
				element: <JobHunterInfo />
			},
			{
				path: 'bossMainPage',
				element: <BossMainPage />
			},
			{
				path: 'jobHunterMainPage',
				element: <JobHunterMainPage />
			},
			{
				path: 'chatMessageList',
				element: <ChatMessageList />
			},
			{
				path: 'chatMessage/:userId/:oppositeName',
				element: <ChatMessage />
			},
			{
				path: 'mine',
				element: <Mine />
			}
		]
	},
	// 重定向路由
	{
		path: '/',
		element: <Navigate to="/login" />
	}
];

export default routesArr;
