import React, { Component } from "react";
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './common.css';
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
            height: "100%",
        }

        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} breakpoint="lg" style={style} >
                <div className="logo" />
                <Menu theme="dark" mode="inline" >
                    <Menu.Item key="1">
                        <Icon type="user" />
                        <span><Link to="/user" className="nav-item">个人中心</Link></span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="folder" />
                        <span> <Link to="/folder" className="nav-item">文件夹</Link></span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="star" />
                        <span> <Link to="/star" className="nav-item">收藏</Link></span>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="delete" />
                        <span> <Link to="/trash" className="nav-item">回收站</Link></span>
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