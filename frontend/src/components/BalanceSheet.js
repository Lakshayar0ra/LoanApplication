import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getBalanceSheet } from '../services/api';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function BalanceSheet(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [balanceSheet, setBalanceSheet] = useState([]);

  // Fetch Balance Sheet from the Accounting Provider
  useEffect(() => {
    getBalanceSheet(props.feilds).then(res => {
      setBalanceSheet(res.data);
      props.updateFeilds({ balanceSheet: res.data });
      setTimeout(() => setIsLoading(false), 500);
    });
  }, []);

  // Move to Next Step to get final outcome
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    props.nextStep();
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
        {isLoading ? (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
            <Typography component="h1" variant="h5">
              Review Balance Sheet
            </Typography>
            <BalanceSheetTable rows={balanceSheet} />
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={isLoading}
              sx={{ mt: 3, mb: 2, padding: "0.75em 1em", background: "#0d80d8" }}
            >
              Submit Application
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}

// Static Component to display Balance Sheet in tabular form
function BalanceSheetTable(props) {
  const { rows } = props;
  return (
    <TableContainer sx={{ mt: 5 }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Balance Sheet Table">
        <TableHead>
          <TableRow sx={
            {
              background: "#0d80d8"
            }
          }>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Year</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>month</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Profit/Loss</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Assets Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.year}</TableCell>
              <TableCell>{row.month}</TableCell>
              <TableCell>{row.profitOrLoss}</TableCell>
              <TableCell>{row.assetsValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}