import axios from 'axios';
import config from '@/config';
import useToast from './toasts.service'

const instance = axios.create({
	baseURL: config.apiBaseURI,
	headers: {
		'Content-Type': 'application/json',
	}
});

instance.interceptors.response.use(
	(response) => {
		return response;
	}, (error) => {

		if (error.response.status > 500) {
			return Promise.reject(error);
		}
        
		if (error.response && error?.response?.data?.code) {
            useToast.error(error?.response?.data?.code?.value);
			return Promise.reject(error?.response?.data?.code?.value);
		}
        useToast.error("SOME ERROR");
		return Promise.reject("SOME ERROR");
	}
);

const get = (uri, requestConfig = {}) => {
	return instance.get(
		`${config.apiBaseURI}${uri}`,
		{...requestConfig}
	);
};

const post = (uri, data, requestConfig = {}) => {
	return instance.post(
		`${config.apiBaseURI}${uri}`,
		data,
		{...requestConfig}
	);
};

const put = (uri, data, requestConfig = {}) => {
	return instance.put(
		`${config.apiBaseURI}${uri}`,
		data,
		{...requestConfig}
	);
};

export default {
	instance,
	get,
	post,
	put
};