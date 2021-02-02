import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { ListProduct, OrderSelected, DataUser, OrderResponse, OrderList } from '../views'
import Order from "../models/Order";

function RouterComponent() {
    //user mobx for the administration of state
    let order = Order.create({});
   
    return (
        <BrowserRouter>
            <div id="container-notify"></div>
            <Switch>
                <Route
                    path="/orderSelected"
                    render={(props) => <OrderSelected {...props} />} />
                <Route
                    path="/dataUser"
                    render={(props) => <DataUser {...props} />} />
                <Route
                    path="/listProducts"
                    render={(props) => <ListProduct order={order} {...props} />} />
                <Route
                    path="/orderResponse/:reference"
                    render={(props) => <OrderResponse {...props} />} />
                <Route
                    path="/listOrders"
                    render={(props) => <OrderList {...props} />} />
                <Redirect to="/listProducts" />
            </Switch>
        </BrowserRouter>

    )
}

export default RouterComponent;