// import {createStore} from 'redux';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import * as State from './common/StateConstant'
import {reducer as menuReducer} from './menu';
import {reducer as filterReducer} from './filter';

// import Perf from 'react-addons-perf';
// const win = window;
// win.Perf = Perf;

const reducer =combineReducers({
  [State.MENUS]:menuReducer,
  [State.CURRENT_MENU]:filterReducer
});

// const middlewares = [];
// if (process.env.NODE_ENV !== 'production') {
//   middlewares.push(require('redux-immutable-state-invariant')());
// }

// const storeEnhancers = compose(
//   applyMiddleware(...middlewares),
//   (win && win.devToolsExtension) ? win.devToolsExtension() : (f) => f,
// );

export default createStore(reducer);