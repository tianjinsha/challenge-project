import React, { Component } from "react";
import { connect } from 'react-redux';
import * as State from '../../common/StateConstant';
import { updateNote } from '../actions';
import { isNull, isStringNull } from '../../common/Util';

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
            editorState: BraftEditor.createEditorState('<p>hello word</p>'),
            outputHTML: '<p>hello</p>'
        }
    }

    async componentDidMount() {
        this.isChanged = false;
        const {note}=this.props;
        // 3秒后更改编辑器内容
        this.setEditorContent(note.content);
    }

    componentWillUnmount() {
        this.isChanged = false
    }

    shouldComponentUpdate(nextProps, nextState) {

        if(!isNull(this.props.note)){
            if (this.props.note.id === nextProps.note.id) {
                return false;
            }
        }
        
        return true;
    }

    handleChange = (editorState) => {
        this.setState({
            editorState: editorState,
            outputHTML: editorState.toHTML()
        })
    }

    setEditorContent = (content) => {
        this.setState({
            editorState: BraftEditor.createEditorState(content)
        })
    }

    saveEditorContent = () => {
        const { outputHTML } = this.state;
        const {
            onSaveNote,
            note: { id }
        } = this.props;
        onSaveNote(id, outputHTML)
    }

    render() {
        const { note } = this.props;
        console.log(this.props)
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
            <div style={{ padding: '24px 0', background: '#fff', minHeight: 480, flex: '0 1 auto' }}>
                <div className="editor-wrapper">
                    <BraftEditor
                        value={editorValue}
                        extendControls={extendControls}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        )
    }
}


const setVisiableNote = (todos, filter) => {
    if (isStringNull(filter.currentNoteId)) {
        return null;
    }
    let notes = todos.filter(item => item.id === filter.currentNoteId);
    if (notes.length === 1) {
        return notes[0];
    }
    return null;
}

const mapStateToProps = (state, ownProps) => {
    return {
        note: setVisiableNote(state[State.NOTES], state[State.CURRENT]),
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