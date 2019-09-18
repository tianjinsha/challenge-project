import { ADD_MENU, REMOVE_MENU, RENAME_MENU ,TOGGLE_FAVORITE} from './actionType';
import { setStorage, getStorage } from '../common/Storage';
import {MENUS} from '../common/StateConstant';
//获取初始化数据
const localMenus = JSON.parse(getStorage(MENUS));
const initState = localMenus || [];

export default (state = initState, action) => {
    switch (action.type) {
        case ADD_MENU: {

            state = [...state, {
                id: action.id,
                title: action.title,
                type: action.menuType,
                createTime: action.createTime,
                parentId:action.parentId
            }]

            setStorage(MENUS,state);
            return state;
        }
        case REMOVE_MENU: {
            return state.filter(todoItem => {
                return todoItem.id !== action.id;
            })
        }
        case RENAME_MENU: {
            return state.map(todoItem => {
                if (todoItem.id === action.id) {
                    return { ...todoItem, title: action.title }
                } else {
                    return todoItem;
                }
            })
        }
        case TOGGLE_FAVORITE:{
            state= state.map(todoItem=>{
                if (todoItem.id === action.id) {
                    return { ...todoItem, favorite: !todoItem.favorite }
                } else {
                    return todoItem;
                }
            })

            setStorage(MENUS,state);
            return state;
        }
        default: {
            return state;
        }
    }
}