import {CHANGE_MENU,CHANGE_NOTE,SEARCH_FILE} from './actionType'

export const toggleMenu=(depth,currentId,currentMenu)=>({
    type:CHANGE_MENU,
    depth,
    currentId,
    currentMenu
})

export const toggleNote=(currentNote)=>({
    type:CHANGE_NOTE,
    currentNote
})

export const SearchFile=(keyword)=>({
    type:SEARCH_FILE,
    keyword
})