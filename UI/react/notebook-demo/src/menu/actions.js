import {ADD_MENU,REMOVE_MENU,RENAME_MENU,TOGGLE_FAVORITE,TOGGLE_REMOVE_MENU} from './actionType';

export const addMenu=(id,title,type,parentId)=>({
    type:ADD_MENU,
    id:id,
    parentId:parentId,
    title:title,
    menuType:type,
    favorite:false,
    createTime:new Date().getTime()
})

export const removeMenu=(id)=>({
    type:REMOVE_MENU,
    id
})

export const toggleRemoveMenu=(id,deleted)=>({
    type:TOGGLE_REMOVE_MENU,
    id,
    deleted:!deleted
})

export const renameMenu=(id,newTitle)=>({
    type:RENAME_MENU,
    id,
    title:newTitle
})

export const toggleFavorite=(id)=>({
    type:TOGGLE_FAVORITE,
    id:id
})





