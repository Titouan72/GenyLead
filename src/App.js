import React, { useState, useEffect, useRef } from "react";
import logo from './logo.svg';
import './App.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

export default function App() {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
  };
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([{ pk: "test1", sk: "test1" }]);
  const [value, setValue] = React.useState('Controlled');
  const [rowsClients, setRowsClients] = useState([{ pk: "test1", sk: "test1" }]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  useEffect(() => {
    async function fetchData() {
      const persons = await axios.get(`https://ccfzqdt1k6.execute-api.eu-west-1.amazonaws.com/Prod/leads`)
      setRows(persons.data)

    }
    fetchData();
  }, [setRows]);
  useEffect(() => {
    async function fetchDataClients() {
      const clients = await axios.get(`https://cn24rmnz00.execute-api.eu-west-1.amazonaws.com/Prod/clients`)
      setRowsClients(clients.data)
      console.log(clients.data)
    }
    fetchDataClients();
  }, [setRowsClients]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <Button onClick={handleOpen} style={{ color: 'black' }}>Insert a lead</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Insert a lead:
          </Typography><br />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField id="standard-basic"  size='small' label="Nom" variant="outlined" /><br />
            </Grid>
            <Grid item xs={6}>
              <TextField id="standard-basic"  size='small' label="Prenom" variant="outlined" /><br />
            </Grid>
            <Grid item xs={4}>
              <TextField id="standard-basic"  size='small' label="Mail" variant="outlined" /><br />
            </Grid>
            <Grid item xs={4}>
              <TextField id="standard-basic"  size='small' label="Telephone" variant="outlined" /><br />
            </Grid>
            <Grid item xs={4}>
              <TextField id="standard-basic"  size='small' label="Lieu" variant="outlined" /><br />
            </Grid>
            <Grid item xs={12}>
              <TextField id="standard-basic"  size='small' label="Prix" variant="outlined" /><br />
            </Grid>
            <Grid item xs={12}>
              <TextField id="standard-basic"  size='small' label="Envie" variant="outlined" /><br />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-flexible"
                label="Multiline"
                multiline
                maxRows={4}
                value=''
                onChange={handleChange}
              /><br /><br />
            </Grid>
          </Grid>
          <Button variant="contained">Save</Button>
        </Box>
      </Modal>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Prenom</TableCell>
              <TableCell>Mail</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Prix</TableCell>
              <TableCell>Lieu</TableCell>
              <TableCell>Envie</TableCell>
              <TableCell>Precision</TableCell>
              <TableCell>Couleur</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ textAlign: 'center' }}>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.pk}
                </TableCell>
                <TableCell align="left">{row.nom}</TableCell>
                <TableCell align="left">{row.prenom}</TableCell>
                <TableCell align="left">{row.mail}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">{row.prix}</TableCell>
                <TableCell align="left">{row.lieu}</TableCell>
                <TableCell align="left">{row.envie}</TableCell>
                <TableCell align="left">{row.precision}</TableCell>
                <TableCell align="left">{row.couleur}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleOpen2} style={{ marginTop: '20px', color: 'black' }}>Insert a client</Button>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Insert a client
          </Typography><br />
          <TextField id="standard-basic"  size='small' label="Nom" variant="outlined" /><br /><br />
          <TextField id="standard-basic"  size='small' label="Mail" variant="outlined" /><br /><br />
          <TextField id="standard-basic"  size='small' label="Phone" variant="outlined" /><br /><br />
          <TextField id="standard-basic"  size='small' label="Lieu" variant="outlined" /><br /><br />

          <Button variant="contained">Save</Button>
        </Box>
      </Modal>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Mail</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Lieu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ textAlign: 'center' }}>
            {rowsClients.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.pk}
                </TableCell>
                <TableCell align="left">{row.nom}</TableCell>
                <TableCell align="left">{row.mail}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">{row.lieu}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

//export default App;
