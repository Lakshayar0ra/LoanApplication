import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getOutcome } from '../services/api';

export default function Outcome(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [outcome, setOutcome] = useState({});

  // Fetch the final outcome from Decision Engine
  useEffect(() => {
    getOutcome(props.feilds).then(res => {
      setOutcome(res.data);
      setTimeout(() => setIsLoading(false), 500);
    });
  }, []);

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
        {isLoading ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : outcome.success ? (
          <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
            <Typography sx={{ my: 5 }} component="h1" variant="h3">
              Final Outcome
            </Typography>

            <Typography component="h5" variant="h6">
              Status : {outcome.status}
            </Typography>
            <Typography component="h5" variant="h6">
              Requested Loan Amount : {outcome.requestedLoanAmount}
            </Typography>
            <Typography component="h5" variant="h6">
              Approved Amount : {outcome.approvedAmount}
            </Typography>
            <Typography component="h5" variant="h6">
              Loan Tenure : {outcome.loanTenure}
            </Typography>
            <Typography component="h5" variant="h6">
              Rate of Interest : {outcome.rateOfInterest}
            </Typography>
          </Box>
        ) : (
          <Typography component="h5" variant="h6">
            Something Went Wrong
          </Typography>
        )}
      </Box>
    </Container>
  );
}