import { ADD_MENU, REMOVE_MENU, RENAME_MENU, TOGGLE_FAVORITE,TOGGLE_REMOVE_MENU } from './actionType';
import { setStorage, getStorage } from '../common/Storage';
import { MENUS } from '../common/StateConstant';
//获取初始化数据
const localMenus = JSON.parse(getStorage(MENUS));
const helloMenu={
    id:0,
    title:'欢迎使用笔记',
    type:'file',
    createTime:new Date().getTime(),
    parentId:''
}
const initState = localMenus || [helloMenu];

export default (state = initState, action) => {
    switch (action.type) {
        case ADD_MENU: {

            state = [...state, {
                id: action.id,
                title: action.title,
                type: action.menuType,
                createTime: action.createTime,
                parentId: action.parentId,
                deleted:false
            }]

            setStorage(MENUS, state);
            return state;
        }
        case REMOVE_MENU: {
            state= state.filter(todoItem => {
                return todoItem.id !== action.id;
            })
            setStorage(MENUS, state);
            return state;
        }
        case TOGGLE_REMOVE_MENU:{
            state=state.map(todoItem => {
                if (todoItem.id === action.id) {
                    return { ...todoItem, deleted: action.deleted }
                } else {
                    return todoItem;
                }
            })
            setStorage(MENUS, state);
            return state;
        }
        case RENAME_MENU: {
            state= state.map(todoItem => {
                if (todoItem.id === action.id) {
                    return { ...todoItem, title: action.title }
                } else {
                    return todoItem;
                }
            })
            setStorage(MENUS, state);
            return state;
        }
        case TOGGLE_FAVORITE: {
            state = state.map(todoItem => {
                if (todoItem.id === action.id) {
                    return { ...todoItem, favorite: !todoItem.favorite }
                } else {
                    return todoItem;
                }
            })

            setStorage(MENUS, state);
            return state;
        }
        default: {
            return state;
        }
    }
}