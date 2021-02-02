import { error } from '../assets/js/notifications';
import Enums from '../enums'
import { of } from 'rxjs';

export const response = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        if (res.status == Enums.ERROR_TYPE.Error500.code) {
            error({ title: res.status, message: res.statusText, type: 'warning', closable: true });
        } else if (res.status == Enums.ERROR_TYPE.Error400.code) {
            error({ title: res.status, message: res.statusText, type: 'error', closable: true });
        }
        return of({});
    }
}

export const responseError = (err) => {
    error({ title: 'Error', message: err.message, type: 'error', closable: true });
    return of({ error: true, message: err.message })
}