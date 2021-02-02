import React, { useState, useEffect } from 'react';
import { listProduct$ } from '../../services/Products.services';
import { Form, Input, List, Button, Divider, Card, Modal, Space } from 'antd';
import { DataUser } from '../'
import { AppstoreAddOutlined, BorderlessTableOutlined, BuildOutlined, DollarCircleOutlined, SendOutlined } from '@ant-design/icons';
import { observer } from "mobx-react";
import { upLocalStorage, removeLocalStorage, removeAllLocalStorage } from '../../helpers/Utils'
import { useHistory } from "react-router-dom";

function ListProduct({ order }) {
    let history = useHistory();
    
    //variables
    const [listProducts, setListProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleOrderResponse, setIsModalVisibleOrderResponse] = useState(false);

    //clear localstorage
    useEffect(() => {
        removeAllLocalStorage();
    }, [])

    //redirect for to order response
    const sendForm = () => {
        history.push(`/orderResponse/${order.reference}`);
    }

    //fecth to server
    const fecthList = () => {
        setIsLoading(true);
        listProduct$().subscribe({
            next: result => {
                if (!result.error) {
                    setListProducts(result);
                }
            },
            complete: () => {
                setIsLoading(false);
            }
        })
    }

    //create icon of actions
    const IconText = ({ icon, text, onClick }) => (
        <Space onClick={onClick}>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    //open close modal and upload producto to localstorage
    const openCloseModal = (item) => {
        setIsModalVisible(!isModalVisible);
        if (item) {
            upLocalStorage('product', item);
        }
    }

    //open close modal order response
    const openCloseModalOrderResponse = (item) => {
        setIsModalVisibleOrderResponse(!isModalVisibleOrderResponse);
    }

    //redirect to page order lista
    const redirecToOrdersList = () => {
        history.push('/listOrders');
    }

    //modal of form user for the data personal 
    const FormOrder = () => (
        <>
            <Modal
                onCancel={() => openCloseModal()}
                okButtonProps={{ style: { display: 'none' } }}
                title="Para continuar completa los siguientes datos"
                visible={isModalVisible}
                afterClose={() => removeLocalStorage('product')}
                cancelText={'Cancelar'}>
                <DataUser order={order} />
            </Modal>
        </>
    )

    //modal for orderResponde view 
    const FormOrderResponse = () => (
        <>
            <Modal
                onCancel={() => openCloseModalOrderResponse()}
                okButtonProps={{ style: { display: 'none' } }}
                title="Para continuar completa los siguientes datos"
                visible={isModalVisibleOrderResponse}
                afterClose={() => removeLocalStorage('product')}
                cancelText={'Cancelar'}>

                <div>
                    <Form
                        onFinish={() => sendForm()}>
                        <Form.Item
                            label="Referencia"
                            name="reference"
                            labelCol={{ span: 24 }}
                            rules={[{ required: true, message: 'la referencia es necesaria' }]}>
                            <Input onChange={(e) => order.set('reference', e.target.value)} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Continuar
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </>
    )

    //each item of the list
    const Item = (item) => (
        <List.Item>
            <Card
                style={{ width: 300 }}
                cover={
                    <img
                        src={item.image}
                    />
                }
                actions={[
                    <IconText onClick={() => openCloseModal(item)} icon={SendOutlined} text="Ordenar" key="list-vertical-star-o" />,
                    <IconText icon={DollarCircleOutlined} text={item.price} key="list-vertical-like-o" />,
                ]}
            >
                <Card.Meta
                    title={item.name}
                    description={item.description}
                />
            </Card>
        </List.Item>
    )

    //main
    return (
        <>
            <FormOrder />
            <FormOrderResponse />
            <Divider orientation="left">
                <Button loading={isLoading} onClick={() => fecthList()} type="dashed" icon={<AppstoreAddOutlined />}>
                    Ver productos
                </Button>
                <Button onClick={() => redirecToOrdersList()} type="dashed" icon={<BorderlessTableOutlined />}>
                    Ver ordenes
                </Button>
                <Button onClick={() => openCloseModalOrderResponse()} type="dashed" icon={<BuildOutlined />}>
                    Buscar mi orden
                </Button>
            </Divider>
            <List
                loading={isLoading}
                grid={{ column: 4 }}
                bordered
                dataSource={listProducts}
                renderItem={item => (
                    <Item {...item} />
                )}
            />
        </>
    )
}

export default observer(ListProduct);