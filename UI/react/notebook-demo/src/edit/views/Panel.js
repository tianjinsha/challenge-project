import React, { Component } from "react";
// 引入编辑器组件
import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
class Panel extends Component {

    state = {
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>')
    }

    componentDidMount() {
        this.isLivinig = true;
        // 3秒后更改编辑器内容
        setTimeout(this.setEditorContentAsync, 3000);
    }

    componentWillUnmount() {
        this.isLivinig = false
    }

    handleChange = (editorState) => {
        this.setState({
            editorState: editorState,
            outputHTML: editorState.toHTML()
        })
    }

    setEditorContentAsync = () => {
        this.isLivinig && this.setState({
            editorState: BraftEditor.createEditorState('<p>你好，<b>世界!</b><p>')
        })
    }

    render() {

        const { editorState } = this.state

        return (
            <div style={{ padding: '24px 0', background: '#fff', minHeight: 480, flex: '0 1 auto' }}>
                <div className="editor-wrapper">
                    <BraftEditor
                        value={editorState}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        )
    }
}

export default Panel;