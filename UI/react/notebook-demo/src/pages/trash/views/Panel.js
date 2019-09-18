import React, { Component } from "react";
import { connect } from 'react-redux';
import * as State from '../../../common/StateConstant'
import { isNull, isStringNull } from '../../../common/Util';
import { Button, Empty } from "antd";
import './folder.css'

class Panel extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

     componentDidMount() {
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!isNull(this.props.note) && !isNull(nextProps) && !isNull(nextProps.note)) {
            if (this.props.note.id === nextProps.note.id) {
                return false;
            }
        }
        return true;
    }



    render() {
        const { note, todo } = this.props;
        return (
            <div className="editor-panel">
                {
                    !isNull(note) ? (
                        <div className="editor-exist" >
                            <div className="panel-header">
                                <h4 className="panel-titlie">{todo.title}</h4>
                                <div className="editor-action">
                                    <Button icon="undo" type="link"  size="small" className="action-item" ></Button>
                                    <Button icon="delete" type="link" size="small" className="action-item" ></Button>
                                </div>
                            </div>
                            <div className="editor-wrapper">
                                <hr style={{border:"none",borderTop:"1px solid #999",margin:"5px 0"}}/>
                                <div className="editor-content" dangerouslySetInnerHTML={{__html: note.content}}></div>
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);