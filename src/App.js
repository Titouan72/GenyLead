import React, { useState, useEffect, useRef } from "react";
import logo from './logo.svg';
import TableComponentsClients from './Components/tableClients';
import TableComponentsLeads from './Components/tableLeads';
import './App.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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
      const persons = await axios.post(`https://ccfzqdt1k6.execute-api.eu-west-1.amazonaws.com/Prod/dynamodbmanager`, 
      {
        "operation": "list",
        "tableName": "leads",
        "payload": {
          "Item": {
            "pk": "1234ABCD",
            "sk": "1234ABCD"
          }
        }
      })
      console.log(persons.data)
      setRows(persons.data.Items)
    }
    fetchData();
  }, [setRows]);
  useEffect(() => {
    async function fetchDataClients() {
      const clients = await axios.post(`https://ccfzqdt1k6.execute-api.eu-west-1.amazonaws.com/Prod/dynamodbmanager`, 
      {
        "operation": "list",
        "tableName": "clients",
        "payload": {
          "Item": {
            "pk": "1234ABCD",
            "sk": "1234ABCD"
          }
        }
      })
      console.log(clients.data)
      setRowsClients(clients.data.Items)
    }
    fetchDataClients();
  }, [setRowsClients]);

  const [nom, setNom] = React.useState('');
  const [prenom, setPrenom] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [prix, setPrix] = React.useState('');
  const [lieu, setLieu] = React.useState('');
  const [envie, setEnvie] = React.useState('');
  const [precision, setPrecision] = React.useState('');
  const [couleur, setCouleur] = React.useState('');
  const [nomC, setNomC] = React.useState('');
  const [mailC, setMailC] = React.useState('');
  const [phoneC, setPhoneC] = React.useState('');
  const [lieuC, setLieuC] = React.useState('');

  const onInputchange = (event) => {
    console.log(event.target.name)
    if (event.target.name == 'nom') {
      setNom(event.target.value);
    }
    if (event.target.name == 'prenom') {
      setPrenom(event.target.value);
    }
    if (event.target.name == 'mail') {
      setMail(event.target.value);
    }
    if (event.target.name == 'phone') {
      setPhone(event.target.value);
    }
    if (event.target.name == 'lieu') {
      setLieu(event.target.value);
    }
    if (event.target.name == 'prix') {
      setPrix(event.target.value);
    }
    if (event.target.name == 'envie') {
      setEnvie(event.target.value);
    }
    if (event.target.name == 'precision') {
      setPrecision(event.target.value);
    }
    if (event.target.name == 'couleur') {
      setCouleur(event.target.value);
    }
    if (event.target.name == 'nomC') {
      setNomC(event.target.value);
    }
    if (event.target.name == 'mailC') {
      setMailC(event.target.value);
    }
    if (event.target.name == 'phoneC') {
      setPhoneC(event.target.value);
    }
    if (event.target.name == 'lieuC') {
      setLieuC(event.target.value);
    }
  }

  const saveLeads = async () => {
    await axios.post(`https://ccfzqdt1k6.execute-api.eu-west-1.amazonaws.com/Prod/dynamodbmanager`, 
    {
      "operation": "create",
      "tableName": "leads",
      "payload": {
        "Item": {
          'pk': 'leads#' + Math.floor(Math.random() * 1000) + '-' + Math.floor(Math.random() * 1000),
          'sk': 'sellman#1',
          'nom': nom,
          'prenom': prenom,
          'mail': mail,
          'phone': phone,
          'lieu': lieu,
          'prix': prix,
          'envie': envie,
          'precision': precision,
          'couleur': couleur
        }
      }
    })
  }
  const saveClients = async () => {
    await axios.post(`https://ccfzqdt1k6.execute-api.eu-west-1.amazonaws.com/Prod/dynamodbmanager`, 
    {
      "operation": "create",
      "tableName": "clients",
      "payload": {
        "Item": {
          'pk': 'clients#' + Math.floor(Math.random() * 101) + '-' + Math.floor(Math.random() * 101),
          'sk': 'sellman#1',
          'nom': nomC,
          'mail': mailC,
          'phone': phoneC,
          'lieu': lieuC
        }
      }
    })
  }
  console.log('erwerwerwerr', rows)
  console.log('erwerwerwerr', rowsClients)
  return (
    <div className="App" style={{ paddingRight: '15%', paddingLeft: '15%', paddingTop: '20px'}}>
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
              <TextField id="standard-basic" size='small' label="Nom" variant="outlined" name="nom" onChange={onInputchange} /><br />
            </Grid>
            <Grid item xs={6}>
              <TextField id="standard-basic" size='small' label="Prenom" variant="outlined" name="prenom" onChange={onInputchange} /><br />
            </Grid>
            <Grid item xs={4}>
              <TextField id="standard-basic" size='small' label="Mail" variant="outlined" name="mail" onChange={onInputchange} /><br />
            </Grid>
            <Grid item xs={4}>
              <TextField id="standard-basic" size='small' label="Telephone" variant="outlined" name="phone" onChange={onInputchange} /><br />
            </Grid>
            <Grid item xs={4}>
              <TextField id="standard-basic" size='small' label="Lieu" variant="outlined" name="lieu" onChange={onInputchange} /><br />
            </Grid>
            <Grid item xs={12}>
              <TextField id="standard-basic" size='small' label="Prix" variant="outlined" name="prix" onChange={onInputchange} /><br />
            </Grid>
            <Grid item xs={12}>
              <TextField id="standard-basic" size='small' label="Envie" variant="outlined" name="envie" onChange={onInputchange} /><br />
            </Grid>
            <Grid item xs={12}>
              <TextField id="standard-basic" size='small' label="Couleur" variant="outlined" name="couleur" onChange={onInputchange} /><br />
            </Grid>
            <Grid item xs={12}>
              <TextField id="standard-basic" size='small' label="Precision" variant="outlined" name="precision" onChange={onInputchange} /><br /><br />
            </Grid>
          </Grid>
          <Button variant="contained" onClick={saveLeads}>Save</Button>
        </Box>
      </Modal>
      <TableComponentsLeads rows={rows} />
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
          <TextField id="standard-basic" size='small' label="Nom" name="nomC" variant="outlined" onChange={onInputchange}/><br /><br />
          <TextField id="standard-basic" size='small' label="Mail" name="mailC" variant="outlined" onChange={onInputchange}/><br /><br />
          <TextField id="standard-basic" size='small' label="Phone" name="phoneC" variant="outlined" onChange={onInputchange}/><br /><br />
          <TextField id="standard-basic" size='small' label="Lieu" name="lieuC" variant="outlined" onChange={onInputchange}/><br /><br />

          <Button variant="contained" onClick={saveClients}>Save</Button>
        </Box>
      </Modal>
      <TableComponentsClients rows={rowsClients} />
    </div>
  );
}

//export default App;
