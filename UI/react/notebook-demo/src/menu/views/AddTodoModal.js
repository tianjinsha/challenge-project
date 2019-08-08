import React, { Component } from 'react';
import { Modal, Input, Button } from 'antd';
import './style.css'

class AddTodoModal extends Component {

    constructor() {
        super();
        this.state = {
            value: ''
        }
    }

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { handleSubmit } = this.props;
        handleSubmit(this.state.value)
        this.setState({
            value: ''
        });
    }

    render() {
        const {
            modalVisible,
            modalTitle,
            handleModalVisible,
        } = this.props;

        return (
            <Modal
                mask={false}
                title={modalTitle}
                visible={modalVisible}
                footer={null}
                onCancel={handleModalVisible}>
                <form className='todo-create-modal' onSubmit={this.onSubmit}>
                    <Input size="large" placeholder="请输入名称……" className='modal-input' onChange={this.handleChange} value={this.state.value} />

                    <Button size="large" type="primary" htmlType="submit" className='modal-btn'>确定</Button>
                </form>
            </Modal>
        )
    }
}

export default AddTodoModal;