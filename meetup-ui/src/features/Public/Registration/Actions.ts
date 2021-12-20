import { AxiosResponse } from 'axios'
import { setRegistration } from './RegistrationSlice';
import api from '../../../api';

export const signUp = (data: object) => (dispatch: any) => {
    return api.post('api/registration', data)
        .then((res: AxiosResponse) => dispatch(setRegistration({ status: res.status, data: res.data })))
        .catch(err => {return {payload: err}})
}