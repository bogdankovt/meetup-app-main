import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    status: 'Draft',
    title: '',
    slug: '',
    shortDescription: '',
    beginning_at: '0001-01-01T00:00:01',
    registration_deadline: '0001-01-01T00:00:01',
    longDescription: '',
    location: '',
    imageId: '',
    duration: "01:00:00"
}

const MeetupDraft = createSlice({
    name: 'MeetupDraft',
    initialState,
    reducers: {
        createMeetupDraft: (state, action) => {
            return action.payload
        },
        updateMeetupDraft: (state, action) => {
            return action.payload
        },
        setMeetupDraft: (state, action) => {
            return action.payload
        },
        createFieldMeetupDraft: (state, action) => {
            state[action.payload.key] = action.payload.value
        }
    }
})

export const { createFieldMeetupDraft } = MeetupDraft.actions
export const { createMeetupDraft } = MeetupDraft.actions
export const { updateMeetupDraft } = MeetupDraft.actions
export const { setMeetupDraft } = MeetupDraft.actions

export default MeetupDraft.reducer

