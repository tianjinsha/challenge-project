import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter,routerMiddleware } from 'connected-react-router'
//同步history
import { createBrowserHistory } from 'history'
// 利用redux-logger打印日志
import { createLogger } from 'redux-logger';

const history = createBrowserHistory();
const reducer = combineReducers({
    router: connectRouter(history)
  });

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const middleware = [];


// 使用日志打印方法
const loggerMiddleware = createLogger({collapsed: true});
//记录路由记录 
const _routerMiddleware=routerMiddleware(history);

middleware.push(loggerMiddleware);
middleware.push(_routerMiddleware);


const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any

);
const initialState = {};
export default createStore(reducer,initialState, enhancer);

