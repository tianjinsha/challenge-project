import {CHANGE_MENU,CHANGE_NOTE,SEARCH_FILE} from './actionType'

export const toggleMenu=(depth,currentId,currentMenu)=>({
    type:CHANGE_MENU,
    depth,
    currentId,
    currentMenu
})

export const toggleNote=(currentNoteId)=>({
    type:CHANGE_NOTE,
    currentNoteId
})

export const SearchFile=(keyword)=>({
    type:SEARCH_FILE,
    keyword
})