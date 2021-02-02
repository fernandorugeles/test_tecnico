import _ from 'underscore'

//function for create a object type FormData from a received object
//example 
//{item1, item2} or {item1:'1', item2:'2'}
export function formData(formData){
	let data = new FormData();
	if(!_.isEmpty(formData)){
		for(let items in formData){
			data.append(items, formData[items]);
		}
	}
	return data;
}

//upload data to localstorage
export function upLocalStorage(name, data){
	debugger;
	localStorage.setItem(name, JSON.stringify(data));
}

//get data to localstorage
export function getLocalStorage(name){
	return JSON.parse(localStorage.getItem(name));
}

//remove data to localstorage
export function removeLocalStorage(name){
	return localStorage.removeItem(name);
}

//remove all data to localstorage
export function removeAllLocalStorage(name){
	return localStorage.clear();
}