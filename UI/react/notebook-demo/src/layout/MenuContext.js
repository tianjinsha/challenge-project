import React, { Component } from "react";
import { Layout, Menu, Icon } from 'antd'
const { Sider } = Layout;

class MenuContext extends Component {

    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    render() {
        const style = {
            // overflow: 'auto',
            // height: "100%",
            // position: 'fixed',
            // left: 0,
        }

        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} breakpoint="md" style={style} >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Icon type="user" />
                        <span>个人中心</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="folder" />
                        <span>文件夹</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="tag" />
                        <span>标签</span>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="delete" />
                        <span>回收站</span>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <Icon type="setting" />
                        <span>设置</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

export default MenuContext;