import {ADD_MENU,REMOVE_MENU,RENAME_MENU,TOGGLE_FAVORITE} from './actionType';
import {uuid} from '../common/Util'

export const addMenu=(title,type)=>({
    type:ADD_MENU,
    id:uuid(),
    title:title,
    menuType:type,
    favorite:false,
    createTime:new Date().getTime()
})

export const removeMenu=(id)=>({
    type:REMOVE_MENU,
    id:id
})

export const renameMenu=(id,newTitle)=>({
    type:RENAME_MENU,
    id:id,
    title:newTitle
})

export const toggleFavorite=(id)=>({
    type:TOGGLE_FAVORITE,
    id:id
})



