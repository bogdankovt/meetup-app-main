import {AxiosResponse} from 'axios'
import { createFieldMeetupDraft, createMeetupDraft, setMeetupDraft, updateMeetupDraft } from './CreatePageSlice'
import axios from '../../../api'

export const AddMeetupDraft = (values: any) => (dispatch : any) => {
    return axios.post(`api/admin/meetups`,values)
        .then((res : AxiosResponse) => dispatch(createMeetupDraft(res.data)))
        .catch(err => {return {payload: err}})
}
export const GetMeetupDraft = (id:any) => (dispatch :any ) => {
    axios.get(`api/admin/meetups/${id}`)
    .then((res : AxiosResponse) => dispatch(setMeetupDraft(res.data)))
}

export const AddField = (key: any,value:any) => (dispatch : any) => {
    dispatch(createFieldMeetupDraft({key:key,value:value}))
}

export const UpdateMeetupDraft = (values:any) => (dispatch : any) => {
    return axios.patch(`api/admin/meetups`,values)
        .then((res : AxiosResponse) => dispatch(updateMeetupDraft(res.data)))
        .catch(err => {return {payload: err}})
}
