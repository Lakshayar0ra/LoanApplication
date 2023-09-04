import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useState } from 'react';

export default function LoanForm(props) {

  const { feilds, updateFeilds, nextStep } = props;
  const [isLoading, setIsLoading] = useState(false);

  // Move to Next Step After filling the details
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    nextStep();
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h5">
          Loan Application Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Typography sx={{ my: 5 }} component="h3" variant="h6">
            Basic Deatils
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={feilds.firstName}
                onChange={e => updateFeilds({ firstName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={feilds.lastName}
                onChange={e => updateFeilds({ lastName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                value={feilds.email}
                onChange={e => updateFeilds({ email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="contact"
                label="Contact Number"
                name="contact"
                type="number"
                value={feilds.contact}
                onChange={e => updateFeilds({ contact: e.target.value })}
              />
            </Grid>
          </Grid>
          <Typography
            sx={{ my: 5 }}
            component="h3" variant="h6">
            Business Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
              <TextField
                required
                fullWidth
                id="business-name"
                label="Business Name"
                name="businessName"
                type="text"
                value={feilds.businessName}
                onChange={e => updateFeilds({ businessName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={5}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Year Established"
                  views={["year"]}
                  value={feilds.yearEstablished}
                  onChange={e => updateFeilds({ yearEstablished: e.target.value })}
                  defaultValue={dayjs()}
                  name="yearEstablished"
                  id="year-established"
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                minRows={4}
                value={feilds.businessAddress}
                onChange={e => updateFeilds({ businessAddress: e.target.value })}
                name="businessAddress"
                label="Business Address"
                id="business-address"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="loanAmount"
                label="Loan Amount"
                type="number"
                id="loan-amount"
                value={feilds.loanAmount}
                onChange={e => updateFeilds({ loanAmount: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="accounting-provider">Accounting Provider</InputLabel>
                <Select
                  required
                  labelId="accounting-provider"
                  id="accounting-provider-dropdown"
                  value={feilds.accountingProvider}
                  onChange={e => updateFeilds({ accountingProvider: e.target.value })}
                  label="Accounting Provider"
                  name="accountingProvider"
                >
                  <MenuItem value="Xero">Xero</MenuItem>
                  <MenuItem value="MYOB">MYOB</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2, padding: "0.75em 1em", background: "#0d80d8" }}
          >
            Get Balance Sheet
          </Button>
        </Box>
      </Box>
    </Container>
  );
}