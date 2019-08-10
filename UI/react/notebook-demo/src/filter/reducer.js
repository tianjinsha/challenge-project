import { CHANGE_MENU, SEARCH_FILE } from './actionType';
import { setStorage, getStorage } from '../common/Storage';
import {CURRENT_MENU} from '../common/StateConstant';
//获取初始化数据
const localMenu = JSON.parse(getStorage(CURRENT_MENU));
const initState = localMenu || {current:null,currentId:'',depth:0,keyword:''};

export default (state = initState, action) => {

    switch (action.type) {
        case CHANGE_MENU: {
            state = {
                ...state,
                depth: action.depth,
                currentId:action.currentId,
                current:action.current
              
            };
            setStorage(CURRENT_MENU,state)
            return state;
        }
        case SEARCH_FILE:{
            state={
                ...state,
                keyword:action.keyword
            }
            return state;
        }
        default: {
            return state;
        }
    }
}