import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import { useParams } from "react-router-dom";
import { Divider, Row, Col, Card, Button } from 'antd';
import { getOrderStatus$ } from '../../services/Orders.services';
import { LoadingOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

function OrderResponse() {
    let history = useHistory();

    //get product of localstorage
    let { reference } = useParams();
    //variables
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(false);

    //redirect for to order response
    const sendForm = () => {
        history.push(`/listProducts`);
    }

    const getStatusOrder = () => {
        setIsLoading(true);
        getOrderStatus$(reference).subscribe({
            next: result => {
                if(typeof result === 'string'){
                    setResponse(result);
                }else{
                    if (!result.error) {
                        setResponse(result);
                    }
                }
            },
            complete: () => {
                setIsLoading(false);
            }
        })
    }

    useEffect(() => {
        getStatusOrder();
    }, [])


    if(isLoading){
        return(
            <div className='loading'>
                <LoadingOutlined style={{fontSize:50}} />
                <h2>Cargando....</h2>
            </div>
        )
    }

    if(typeof response === 'string'){
        return(
            <div className='loading'>
                <h2>{response}</h2>
                <h2 onClick={() => window.location.replace("/listProducts")}><a>Volver</a></h2>
            </div>
        )
    }
    
    return (
        <>
            <Divider orientation="left">
                <Button onClick={() => sendForm()} type="dashed" icon={<AppstoreAddOutlined />}>
                    Volver a productos
                </Button>
                Estado de la orden
            </Divider>
            <Row>
                <Col span={6}>
                    <Card
                        loading={isLoading}
                        hoverable
                        cover={<img alt={response.name} src={response.image} />}
                    >
                        <Card.Meta title={response.name} description={response.description} />
                    </Card>
                </Col>
                <Col offset={2} span={10} >
                    <h1>{response.customer_name}</h1>
                    <h2>{response.customer_email}</h2>
                    <h3>{response.customer_mobile}</h3>
                    <h2>${response.price}</h2>
                    <div style={{textAlign:'center'}}>
                        <Divider orientation="center">Estado</Divider>
                        <h1 className={response.customer_status}>{response.customer_status == 'CREATED' ? 'PENDING' : response.customer_status}</h1>
                        {
                            response.customer_status == 'CREATED' &&
                            <h2><a href={response.process_url}>Finalizar el pago</a></h2>
                        }
                    </div>
                </Col>
            </Row>
        </>
    )

}

export default observer(OrderResponse);