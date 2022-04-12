import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'; // 实现redux数据的持久化
import storageSession from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers/index';

const storageConfig = {
	key: 'root', // 必须有的
	storage: storageSession, // 缓存机制
	blacklist: [] // reducer 里不持久化的数据,除此外均为持久化数据
};

const myPersistReducer = persistReducer(storageConfig, reducer);

let store = createStore(myPersistReducer, composeWithDevTools(applyMiddleware(thunk)));

export const persistor = persistStore(store);
export default store;
