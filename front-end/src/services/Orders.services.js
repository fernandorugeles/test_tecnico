import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from "rxjs";
import { formData } from '../helpers/Utils'
import { url } from './Url.js';
//import { response, responseError } from './Message'

export const getOrderStatus$ = (reference) => fromFetch(`${url.url_get_status}`, {
	method: 'POST',
	body: formData({
		reference: reference
	}) //data if you want send parameters
}).pipe(
	switchMap(response => {
		if (response.ok) {
			// OK return data
			return response.json();
		} else {
			// Server is returning a status requiring the client to try something else.
			alert(`${response.statusText}`);
			return of({ error: true, message: `Error ${response.status}` });
		}
	}),
	catchError(err => {
		// Network or other error, handle appropriately
		alert(`${err.message}`);
		return of({ error: true, message: err.message })
	})
);

export const getOrdersList$ = () => fromFetch(`${url.url_get_orders_list}`, {
	method: 'POST',
	body: formData({}) //data if you want send parameters
}).pipe(
	switchMap(response => {
		if (response.ok) {
			// OK return data
			return response.json();
		} else {
			// Server is returning a status requiring the client to try something else.
			alert(`${response.statusText}`);
			return of({ error: true, message: `Error ${response.status}` });
		}
	}),
	catchError(err => {
		// Network or other error, handle appropriately
		alert(`${err.message}`);
		return of({ error: true, message: err.message })
	})
);