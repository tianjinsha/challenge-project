import React, { Component } from "react";
import { connect } from 'react-redux';
import * as State from '../../../common/StateConstant';
import { updateNote } from '../actions';
import { isNull, isStringNull } from '../../../common/Util';
import { Button, Empty } from "antd";
import html2pdf from 'html2pdf.js';
import './style.css'

// 引入编辑器组件
import BraftEditor from 'braft-editor';
// 引入编辑器样式
import 'braft-editor/dist/index.css';


class Panel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // 创建一个空的editorState作为初始值
            isChanged: false,
            editorState: BraftEditor.createEditorState(null),
            outputHTML: null
        }
    }

    async componentDidMount() {
        const { note } = this.props;
        // 3秒后更改编辑器内容
        if (!isNull) {
            this.setEditorContent(note.content);
        }
    }

    componentWillUnmount() {
        this.isChanged = false
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!isNull(this.props.note) && !isNull(nextProps) && !isNull(nextProps.note)) {
            if (this.props.note.id === nextProps.note.id) {
                return false;
            }
        }
        return true;
    }

    // 笔记内容改变
    handleChange = (editorState) => {
        this.setState({
            editorState: editorState,
            outputHTML: editorState.toHTML()
        })
    }

    //设置笔记内容
    setEditorContent = (content) => {
        this.setState({
            editorState: BraftEditor.createEditorState(content)
        })
    }

    //保存笔记内容
    saveEditorContent = () => {
        const { outputHTML } = this.state;
        const {
            onSaveNote,
            note: { id }
        } = this.props;
        onSaveNote(id, outputHTML)
    }

    //导出pdf
    exportPdf = () => {
        const { todo} = this.props;
        const { outputHTML } = this.state;
        const opt = {
            margin: 1,
            filename: todo.title + '.pdf',
            image: { type: 'jpeg', quality: 0.98 }, // 导出的图片质量和格式
            html2canvas: { scale: 2, useCORS: true }, // useCORS很重要，解决文档中图片跨域问题
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };

        if (outputHTML !== null) {
            html2pdf().set(opt).from(outputHTML).save(); // 导出
        }

    }

    render() {
        const { note ,todo} = this.props;
        let editorValue = BraftEditor.createEditorState(null);
        if (!isNull(note)) {
            editorValue = BraftEditor.createEditorState(note.content);
        }

        const extendControls = [
            {
                key: 'custom-button',
                type: 'button',
                text: '保存',
                onClick: this.saveEditorContent
            }
        ]

        return (
            <div className="editor-panel">
                 {
                    !isNull(note) ? (
                        <div className="editor-exist" >
                            <div className="panel-header">
                                <h4 className="panel-titlie">{todo.title}</h4>
                                <div className="editor-action">
                                    <Button icon="save" type="primary" shape="round" size="small" className="action-item editor-save" onClick={this.saveEditorContent}>保存</Button>
                                    <Button icon="file-pdf" type="primary" shape="round" size="small" className="action-item" onClick={this.exportPdf}>导出</Button>
                                </div>
                            </div>
                            <div className="editor-wrapper">
                                <BraftEditor
                                    value={editorValue}
                                    extendControls={extendControls}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                    ) : (<Empty description={"暂无预览"} className="editor-empty" />)
                }
            </div>
        )
    }
}


const setVisiableNote = (notes, filter) => {
    if (isStringNull(filter.currentNoteId)) {
        return null;
    }
    let filterNotes = notes.filter(item => item.id === filter.currentNoteId);
    if (filterNotes.length === 1) {
        return filterNotes[0];
    }
    return null;
}
const setVisiableTods = (todos, filter) => {
    if (isStringNull(filter.currentNoteId)) {
        return null;
    }
    let filterTodos = todos.filter(item => item.id === filter.currentNoteId);
    if (filterTodos.length === 1) {
        return filterTodos[0];
    }
    return null;
}

const mapStateToProps = (state, ownProps) => {
    return {
        note: setVisiableNote(state[State.NOTES], state[State.CURRENT]),
        todo: setVisiableTods(state[State.MENUS], state[State.CURRENT])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSaveNote: (id, content) => {
            dispatch(updateNote(id, content))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);