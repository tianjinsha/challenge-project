import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import * as State from './common/StateConstant'
import { reducer as menuReducer } from './components/menu';
import { reducer as filterReducer } from './components/filter';
import { reducer as notesReducer } from './components/edit';
// 利用redux-logger打印日志
import { createLogger } from 'redux-logger'


const reducer = combineReducers({
  [State.MENUS]: menuReducer,
  [State.CURRENT]: filterReducer,
  [State.NOTES]: notesReducer
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

middleware.push(loggerMiddleware);


const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any

);

export default createStore(reducer, enhancer);