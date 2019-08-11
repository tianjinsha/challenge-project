import { CHANGE_MENU, CHANGE_NOTE, SEARCH_FILE } from './actionType';
import { setStorage, getStorage } from '../common/Storage';
import { CURRENT } from '../common/StateConstant';
//获取初始化数据
const localMenu = JSON.parse(getStorage(CURRENT));
const initState = localMenu || { currentMenu: null, currentNoteId: 0, currentMenuId: '', depth: 0, keyword: '' };

export default (state = initState, action) => {

    switch (action.type) {
        case CHANGE_MENU: {
            state = {
                ...state,
                depth: action.depth,
                currentMenuId: action.currentMenuId,
                currentMenu: action.currentMenu

            };
            setStorage(CURRENT, state)
            return state;
        }
        case CHANGE_NOTE: {
            state = {
                ...state,
                currentNoteId: action.currentNoteId

            };
            setStorage(CURRENT, state)
            return state;
        }
        case SEARCH_FILE: {
            state = {
                ...state,
                keyword: action.keyword
            }
            setStorage(CURRENT, state)
            return state;
        }
        default: {
            return state;
        }
    }
}