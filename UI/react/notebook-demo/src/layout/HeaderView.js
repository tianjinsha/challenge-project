import React ,{ Component } from "react";
import {Layout} from 'antd';
const { Header} = Layout;

class HeaderView extends Component{

    render() {
        const style={
            background:"#ccc",
            padding:0,
            height:60,
        }

        return (
            <Header style={style} >
                <div></div>
                </Header>
        )
    }
}

export default HeaderView;