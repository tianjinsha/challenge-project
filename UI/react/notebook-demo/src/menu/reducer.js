import { ADD_MENU, REMOVE_MENU, RENAME_MENU ,TOGGLE_FAVORITE} from './actionType';

export default (state = [], action) => {
    switch (action.type) {
        case ADD_MENU: {
            return [
                {
                    id: action.id,
                    title: action.title,
                    type: action.menuType,
                    createTime: action.createTime
                }, ...state
            ]
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
            return state.map(todoItem=>{
                if (todoItem.id === action.id) {
                    return { ...todoItem, favorite: !action.favorite }
                } else {
                    return todoItem;
                }
            })
        }
        default: {
            return state;
        }
    }
}