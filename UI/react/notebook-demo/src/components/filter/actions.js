import {CHANGE_MENU,CHANGE_NOTE,SEARCH_FILE} from './actionType'

export const toggleMenu=(depth,currentMenuId,currentMenu)=>({
    type:CHANGE_MENU,
    depth,
    currentMenuId,
    currentMenu
})

export const toggleNote=(currentNoteId)=>({
    type:CHANGE_NOTE,
    currentNoteId
})

export const searchNote=(keyword)=>({
    type:SEARCH_FILE,
    keyword
})