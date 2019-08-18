import React, { Component } from 'react';
import { Statistic, Card, Row, Col, Icon } from 'antd';
import './User.css'

class User extends Component {
    render() {
        return (
            <section className="content-user">
                <div className="user">
                    <div className="statistic">
                        <Row gutter={16} >
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="笔记总数"
                                        value={56}
                                        valueStyle={{ color: '#468b00' }}
                                        prefix={<Icon type="clock-circle" />}

                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="今日笔记"
                                        value={3}
                                        valueStyle={{ color: '#1890ff' }}
                                        prefix={<Icon type="edit" />}
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="收藏"
                                        value={3}
                                        valueStyle={{ color: '#f60' }}
                                        prefix={<Icon  theme="filled" type="star" />}
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="回收站"
                                        value={3}
                                        valueStyle={{ color: '#777' }}
                                        prefix={<Icon type="delete" />}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </div>

                </div>
            </section>
        )
    }
}

export default User;