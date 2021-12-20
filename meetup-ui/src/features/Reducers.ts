import { combineReducers } from "redux"
import meetupsReducer from './Admin/Meetups/MeetupsSlice'
import meetupGuestsReducer from './Admin/MeetupGuests/MeetupGuestsSlice'
import meetupFeedReducer from './Public/MeetupFeed/MeetupHomeControlSlice'
import meetupDetailsReducer from "./Public/MeetupDetails/MeetupDetailsSlice"
import MeetupDraftReducer from './Admin/Meetups-control/CreatePageSlice'
import registrationReducer from './Public/Registration/RegistrationSlice'
import contactsReducer from './Admin/Contacts/ContactsSlice'
import statisticReducer from './Admin/Statistics/StatisticControlSlice'

export const PublicReducer = combineReducers({
    meetupFeed: meetupFeedReducer,
    registration: registrationReducer,
    currentMeetupDetails: meetupDetailsReducer,
});

export const AdminReducer = combineReducers({

    contacts: contactsReducer,
    meetups: meetupsReducer,
    meetupGuests: meetupGuestsReducer,
    draftMeetup: MeetupDraftReducer,
    statistics: statisticReducer,
});

export const AdminSelector = (state: any) => state.admin
export const PublicSelector = (state: any) => state.public