import { AxiosResponse } from "axios";
import { setMeetups } from './MeetupHomeControlSlice'
import api from "../../../api";
const host = "api/public/meetups"

export const getMeetups = () => (dispatch: any) => {
    api.get(host)
        .then((response: AxiosResponse) => dispatch(setMeetups(response.data)))
}
