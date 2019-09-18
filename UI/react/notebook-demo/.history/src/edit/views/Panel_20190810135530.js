import React, { Component } from "react";
import { connect } from 'react-redux';
import * as State from '../../common/StateConstant'

// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
class Panel extends Component {

    constructor() {
        super();
        this.state = {
            // 创建一个空的editorState作为初始值
            editorState: BraftEditor.createEditorState('<p>欢迎使用笔记！</b></p>'),
            outputHTML: '<p></p>'
        }
    }
    componentDidMount() {
        this.isChanged = false;
        console.log(this.props)
        // 3秒后更改编辑器内容
        // this.setEditorContent();
    }

    componentWillUnmount() {
        this.isChanged = false
    }

    handleChange = (editorState) => {
        console.log(editorState.toHTML())
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

    saveEditorContent=()=>{
        console.log("save");
    }

    render() {
        const { editorState } = this.state
        const extendControls = [
            {
                key: 'custom-button',
                type: 'button',
                text: '按钮',
                onClick: this.saveEditorContent
              }
        ]

        return (
            <div style={{ padding: '24px 0', background: '#fff', minHeight: 480, flex: '0 1 auto' }}>
                <div className="editor-wrapper">
                    <BraftEditor
                        value={editorState}
                        extendControls={extendControls}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        notes: state[State.NOTES],
        current: state[State.CURRENT]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);