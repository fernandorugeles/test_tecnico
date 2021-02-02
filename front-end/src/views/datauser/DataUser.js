import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { upLocalStorage } from '../../helpers/Utils';

function DataUser({order}) {
    let history = useHistory();
    const sendForm = () => {
        upLocalStorage('order', order);
        history.push('/orderSelected');
    }

    return (
        <Row justify="center" align="middle">
            <Col className="gutter-row">
                <Form
                    onFinish={() => sendForm()}>
                    <Form.Item
                        label="Nombre"
                        labelCol={{span:24}}
                        name="name"
                        rules={[{ required: true, message: 'El nombre es necesario' }]}>
                        <Input onChange={(e) => order.set('customer_name', e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="Correo electrónico"
                        labelCol={{span:24}}
                        name="email"
                        rules={[{ required: true, message: 'El correo electronico es obligatorio' }]}>
                        <Input onChange={(e) => order.set('customer_email', e.target.value)}/>
                    </Form.Item>
                    <Form.Item
                        label="Número de celular"
                        labelCol={{span:24}}
                        name="telephone"
                        rules={[{ required: true, message: 'El número de celular es obligatorio' }]}>
                        <Input onChange={(e) => order.set('customer_mobile', e.target.value)}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Continuar
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}

export default observer(DataUser);