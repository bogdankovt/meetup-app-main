import { Grid, Typography } from '@mui/material';
import PageHeader from '../../../components/PageHeader';
import RegistrationForm from './RegistrationForm';

export default function RegistrationPage(props: any) {
    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={6} md={6} lg={4}>
                <PageHeader>Реєстрація</PageHeader>
                <RegistrationForm redirectTo={props.redirectTo} />
            </Grid>
        </Grid >
    );
}