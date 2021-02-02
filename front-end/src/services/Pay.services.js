import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from "rxjs";
import { formData } from '../helpers/Utils'
import { url } from './Url.js';
//import { response, responseError } from './Message'

export const payOrder$ = (order, product) => fromFetch(`${url.url_pay}`, {
	method: 'POST',
	body: formData({
		order: JSON.stringify(order),
		product: JSON.stringify(product),
	}) //data if you want send parameters
}).pipe(
	switchMap(response => {
		debugger;
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
		debugger;
		// Network or other error, handle appropriately
		alert(`${err.message}`);
		return of({ error: true, message: err.message })
	})
);