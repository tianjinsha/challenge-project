/**
 * 选择目录的第一个笔记
 * @param {*} todos 目录列表 
 * @param {*} parentId 目录id
 */
export const choseFirstNote = (todos = [], parentId = "") => {
    let firstId = "";
    if (todos.length > 0) {
        let noteFilter = todos
            .filter(item => item.parentId === parentId);
        if (noteFilter.length > 0) {
            firstId = noteFilter[0].id;
        }

    }
    return firstId;
}