import { useRoutes } from 'react-router-dom';
import routes from './routes';

function App() {
	let element = useRoutes(routes);
	return <div>{element}</div>;
}

export default App;
