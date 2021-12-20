import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AppStore } from "./app/store";
import { redirect } from './redirectSlice'

export function setupApiInterceptors(api: AxiosInstance, store: AppStore) {
	api.interceptors.request.use(request => requestInterceptor(request))

	api.interceptors.response.use(
		response => response,
		error => {
			if (error.response.status) {
				switch (error.response.status) {
					case 401:
						store.dispatch(redirect({ to: '/login', backURL: window.location.pathname }));
						break;
					case 403:
						store.dispatch(redirect({ to: '/login', backURL: window.location.pathname }));
						break;
				}
				return Promise.reject(error.response);
			}
		}
	);
	const requestInterceptor = (request: AxiosRequestConfig<any>) => {
		request.withCredentials = true;
		return request;
	}
}
