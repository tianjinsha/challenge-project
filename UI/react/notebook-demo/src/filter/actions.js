import {CHANGE_MENU,SEARCH_FILE} from './actionType'

export const toggleMenu=(depth,currentId,current)=>({
    type:CHANGE_MENU,
    depth,
    currentId,
    current
})

export const SearchFile=(keyword)=>({
    type:SEARCH_FILE,
    keyword
})