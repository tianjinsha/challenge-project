import React ,{Component}from 'react';
import { view as EditView } from '../../components/edit'
import Panel from './views/Panel'
import  Todo   from './views/Todo.js';
import './trash.css'

class Trash extends Component{
    render(){
        return(
            <section className="content-trash">
               <div className="left-wrapper">
                    <Todo />
                </div>
                <div className="right-wrapper">
                        <Panel />
                </div>
            </section>
        )
    }
}

export default Trash;