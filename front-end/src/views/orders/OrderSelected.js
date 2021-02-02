import React, { useState } from 'react';
import { observer } from "mobx-react";
import { Divider, Row, Col, Card, Button } from 'antd';
import { getLocalStorage } from '../../helpers/Utils'
import { ApiOutlined } from '@ant-design/icons';
import { payOrder$ } from '../../services/Pay.services';
import { CheckOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

function OrderSelected() {
    let history = useHistory();

    //get product of localstorage
    const product = getLocalStorage('product');
    const order = getLocalStorage('order');

    //variables
    const [isLoading, setIsLoading] = useState(false);
    const [urlPago, setUrlPago] = useState(null);
    const [idSesion, setIdSesion] = useState(null);
    const [reference, setReference] = useState(null);

    //redirect for to order response
    const sendForm = () => {
        history.push(`/listProducts`);
    }

    //pay
    const payOrder = () => {
        setIsLoading(true);
        payOrder$(order, product).subscribe({
            next: result => {
                if (!result.error) {
                    setUrlPago(result.processUrl);
                    setIdSesion(result.requestId);
                    setReference(result.reference);
                }
            },
            complete: () => {
                setIsLoading(false);
            }
        })
    }

    //without data we show a icon only
    if (!product || !order) {
        return (
            <div style={{ flex: 1, display: 'flex', alignContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <ApiOutlined style={{ fontSize: 120 }} />
                <h1>Debes seleccionar un producto para hacer la orden</h1>
                <a onClick={() => window.location.replace("/listProducts")}>Volver</a>
            </div>
        )
    }
    return (
        <>
            <Divider orientation="left">
                <Button onClick={() => sendForm()} type="dashed" icon={<AppstoreAddOutlined />}>
                    Volver a productos
                </Button>
                Resumen de la orden
            </Divider>
            <Row>
                <Col span={6}>
                    <Card
                        hoverable
                        cover={<img alt={product.name} src={product.image} />}
                    >
                        <Card.Meta title={product.name} description={product.description} />
                    </Card>
                </Col>
                <Col offset={2} span={10} >
                    <h1>{order.customer_name}</h1>
                    <h2>{order.customer_email}</h2>
                    <h3>{order.customer_mobile}</h3>
                    <h2>${product.price}</h2>
                    {
                        !urlPago
                        ?
                        <Button loading={isLoading} onClick={() => payOrder()} type="primary" icon={<CheckOutlined/>}>
                            Continuar con el pago
                        </Button>
                        :
                        <div style={{textAlign:'center'}}>
                            <br/>
                            <Divider orientation="center">Referencia de pago {reference}</Divider>
                            <h2><a href={urlPago}>Ingresar datos para el pago</a></h2>
                        </div>
                    }
                </Col>
            </Row>
        </>
    )
}

export default observer(OrderSelected);