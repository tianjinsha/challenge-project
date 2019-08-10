import { ADD_NOTE, REMOVE_NOTE, UPDATE_NOTE } from "./actionType";
import { setStorage, getStorage } from '../common/Storage';
import { NOTES } from '../common/StateConstant';

//获取初始化数据
const localNotes = JSON.parse(getStorage(NOTES));
const helloNote={
    id:0,
    title:'欢迎使用笔记',
    content:'hello word !'
}
const initState = localNotes || [helloNote];

export default (state = initState, action) => {
    switch (action.type) {
        case ADD_NOTE: {
            state = [...state, {
                id: action.id,
                title: action.title,
                content: action.content
            }];
            setStorage(NOTES, state);
            return state;
        }
        case UPDATE_NOTE: {
            state = state.map(todoItem => {
                if (todoItem.id === action.id) {
                    return { ...todoItem, content: action.content }
                } else {
                    return todoItem;
                }
            })
            setStorage(NOTES, state);
            return state;
        }
        case REMOVE_NOTE: {
            state = state.filter(item => (item.id !== action.id))
            setStorage(NOTES, state);
            return state;
        }
        default: {
            return state;
        }
    }

}