import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from '../layout/Navbar';
import MeetupsPage from '../features/Admin/Meetups/MeetupsPage';
import MeetupCreatePage from '../features/Admin/Meetups-control/MeetupCreatePage';
import { Container, ThemeProvider, createTheme } from '@mui/material';
import MeetupsControlPage from '../features/Admin/Meetups/MeetupsPage';
import LoginPage from '../features/Public/Login/LoginPage';
import "moment/locale/uk";
import MeetupHomePage from '../features/Public/MeetupFeed/MeetupHomePage'
import MeetupDetailsPage from '../features/Public/MeetupDetails/MeetupDetailsPage';

import RegistrationPage from '../features/Public/Registration/RegistrationPage';
import MeetupGuestsPage from '../features/Admin/MeetupGuests/MeetupGuestsPage';
import MeetupsEditPage from '../features/Admin/Meetups-control/MeetupEditPage';
import ContactsPage from '../features/Admin/Contacts/ContactsPage';
import { StatisticPage } from '../features/Admin/Statistics/StatisticPage';
import { toSelector, resetTo } from '../redirectSlice';
import { useAppDispatch, useAppSelector } from './hooks';


const theme = createTheme();

theme.typography.h3 = {
  fontFamily: 'Roboto',
  fontSize: '2em',
  fontWeight: 'normal'
};


function App() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const to = useAppSelector(toSelector)
  useEffect(() => {
    if (to) {
      navigate(to);
      dispatch(resetTo())
    }
  }, [to])
  return (
    <ThemeProvider theme={theme}>
      <Navbar></Navbar>
      <Container maxWidth='lg' sx={{ pt: '60px', pb: '60px' }}>
        <Routes>
          <Route path='/a/meetups' element={<MeetupsPage />}></Route>
          <Route path='/registration' element={<RegistrationPage redirectTo='/' />}></Route>
          <Route path='/a/meetup/:id/guests' element={<MeetupGuestsPage />} />
          <Route path='/a/contacts' element={<ContactsPage />} />
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/' element={<MeetupHomePage />}></Route>
          <Route path="/meetup/:slug" element={<MeetupDetailsPage />}></Route>
          <Route path='/a/meetups-control' element={<MeetupsControlPage/>}></Route>
          <Route path='/a/meetups/create' element={<MeetupCreatePage/>}></Route>
          <Route path='/a/meetups/:id' element={<MeetupsEditPage/>}></Route>
          <Route path='/a/statistic' element ={<StatisticPage/>}></Route>
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App;
