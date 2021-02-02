const urlApi = process.env.REACT_APP_URL_API
export const url = {
    url_products_list: `${urlApi}/product/listProducts`,
    url_pay: `${urlApi}/order/pay`,
    url_get_status: `${urlApi}/order/getStatusOrder/`,
    url_get_orders_list: `${urlApi}/order/getOrderList/`
}