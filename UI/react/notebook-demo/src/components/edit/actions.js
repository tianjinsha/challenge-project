import { ADD_NOTE,REMOVE_NOTE,UPDATE_NOTE } from "./actionType";

export const addNote=(id,title,content)=>({
    type:ADD_NOTE,
    id,
    title,
    content
})

export const updateNote=(id,content)=>({
    type:UPDATE_NOTE,
    id,
    content
})

export const removeNote=(id)=>({
    type:REMOVE_NOTE,
    id
})