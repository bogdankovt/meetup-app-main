import axios, { AxiosResponse } from "axios";
import api from "../../../api";
import { setCurrentMeetupDetails } from './MeetupDetailsSlice'

export const getMeetupDetails = (slug: any) => (dispatch: any) => {
    api.get(`api/public/meetups/${slug}`)
        .then((response: AxiosResponse) => dispatch(setCurrentMeetupDetails(response.data)))
}