import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import { Divider, List, Space, Button } from 'antd';
import { getOrdersList$ } from '../../services/Orders.services';
import { AppstoreAddOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

function OrderList() {
    let history = useHistory();

    //variables
    const [isLoading, setIsLoading] = useState(false);
    const [orderList, setOrderList] = useState([]);

    //redirect for to products
    const sendForm = () => {
        history.push(`/listProducts`);
    }

    const getListOrders = () => {
        setIsLoading(true);
        getOrdersList$().subscribe({
            next: result => {
                if (!result.error) {
                    setOrderList(result);
                    console.log(result);
                }
            },
            complete: () => {
                setIsLoading(false);
            }
        })
    }

    useEffect(() => {
        getListOrders();
    }, [])

    return (
        <>
            <Divider orientation="left">
                <Button onClick={() => sendForm()} type="dashed" icon={<AppstoreAddOutlined />}>
                    Volver a productos
                </Button>
                Lista de ordenes
            </Divider>
            <List
                itemLayout="vertical"
                size="large"
                grid={{ column: 3, xs: 1, sm: 1 }}
                loading={isLoading}
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 6,
                }}
                dataSource={orderList}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        extra={
                            <div className='det'>
                                <img
                                    width={120}
                                    alt={item.name}
                                    src={item.image}
                                />
                                <div className='detText'>
                                    <h3>{item.customer_name}</h3>
                                    <label>{item.customer_email}</label>
                                    <label>{item.customer_mobile}</label>
                                    <div style={{ textAlign: 'center' }}>
                                        <Divider orientation="center">Estado</Divider>
                                        <h2 className={item.customer_status}>{item.customer_status}</h2>
                                        {
                                            item.customer_status == 'CREATED' &&
                                            <h3><a href={item.process_url}>Finalizar el pago</a></h3>
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    >
                        <List.Item.Meta
                            title={<a>{item.name}</a>}
                            description={item.description}
                        />
                        <h3>${item.price}</h3>
                        <Divider orientation='center'>{`REFRENCIA: ${item.reference}`}</Divider>

                    </List.Item>
                )}
            />
        </>
    )

}

export default observer(OrderList);