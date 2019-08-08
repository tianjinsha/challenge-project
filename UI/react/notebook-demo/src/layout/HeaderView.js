import React ,{ Component } from "react";
import {Layout} from 'antd';
const { Header} = Layout;

class HeaderView extends Component{

    render() {
        return (
            <Header style={{ background: '#fff', padding: 0 }} />
        )
    }
}

export default HeaderView;