import React ,{Component}from 'react';
import { view as EditView } from '../../components/edit'
import  Todo   from './views/Todo.js';

class Star extends Component{
    render(){
        return(
            <section className="content-folder">
                <div className="left-wrapper">
                    <Todo />
                </div>
                <div className="right-wrapper">
                        <EditView />
                </div>
            </section>
        )
    }
}

export default Star;