import React, { useState, useEffect, useRef } from "react";
import logo from './logo.svg';
import TableComponentsClients from './Components/tableClients';
import TableComponentsLeads from './Components/tableLeads';
import TableComponentsPaque from './Components/tablePaque';
import ImportFile from './Components/importFile';
import './App.css';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import Switch from '@mui/material/Switch';
import { orange } from '@mui/material/colors';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

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
  const styleButton = {
    color: 'black'
  }
  const styleParentDiv = {
    paddingRight: '3%',
    paddingLeft: '3%',
    paddingTop: '20px'
  }

  ///////DARK THEME///////

  const styleParentDiv2 = {
    paddingRight: '3%',
    paddingLeft: '3%',
    paddingTop: '20px',
    background: '#202124'
  }

  const [open, setOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [rows, setRows] = useState([{ pk: "test1", sk: "test1" }]);
  const [rowsPaque, setRowsPaque] = useState([{ pk: "test1", sk: "test1" }]);
  const [rowsClients, setRowsClients] = useState([{ pk: "test1", sk: "test1" }]);

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
      setRowsClients(clients.data.Items)
    }
    fetchDataClients();
  }, [setRowsClients]);

  useEffect(() => {
    async function fetchDataPaque() {
      const paque = await axios.post(`https://ccfzqdt1k6.execute-api.eu-west-1.amazonaws.com/Prod/dynamodbmanager`,
        {
          "operation": "list",
          "tableName": "paque",
          "payload": {
            "Item": {
              "pk": "1234ABCD",
              "sk": "1234ABCD"
            }
          }
        })
      setRowsPaque(paque.data.Items)
    }
    fetchDataPaque();
  }, [setRowsPaque]);


  const refetchLeads = async () => {
    const leads = await axios.post(`https://ccfzqdt1k6.execute-api.eu-west-1.amazonaws.com/Prod/dynamodbmanager`,
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
    setRows(leads.data.Items)
  }

  const refetchClients = async () => {
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
    setRowsClients(clients.data.Items)
  }

  const refetchPaque = async () => {
    const paque = await axios.post(`https://ccfzqdt1k6.execute-api.eu-west-1.amazonaws.com/Prod/dynamodbmanager`,
      {
        "operation": "list",
        "tableName": "paque",
        "payload": {
          "Item": {
            "pk": "1234ABCD",
            "sk": "1234ABCD"
          }
        }
      })
    setRowsPaque(paque.data.Items)
  }

  const setTheme = async () => {
    if (darkTheme == false) {
      setDarkTheme(true)
    } else {
      setDarkTheme(false)
    }
  }

  if (darkTheme == false) {
    return (
      <div className="App" style={styleParentDiv}>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <NightsStayIcon style={{ color: 'grey', top: '7px', position: 'relative' }} />
            <Switch onClick={setTheme}/>
          </Grid>
          <Grid item xs={2}>

          </Grid>
          <Grid item xs={8}>
            <></>
          </Grid>
        </Grid>
        <TableComponentsLeads rows={rows} refetch={refetchLeads}  darkTheme={darkTheme}/>
        <TableComponentsClients rows={rowsClients} refetch={refetchClients}  darkTheme={darkTheme}/>
        <TableComponentsPaque rows={rowsPaque} refetch={refetchPaque}  darkTheme={darkTheme}/>
      </div>
    );
  } else {
    return (
        <div className="App" style={styleParentDiv2}>
          <Grid container spacing={2}>
            <Grid item xs={1}>
              <NightsStayIcon style={{ color: 'grey', top: '7px', position: 'relative' }} />
              <Switch onClick={setTheme} style={{color: orange[500]}}/>
            </Grid>
            <Grid item xs={2}>

            </Grid>
            <Grid item xs={8}>
              <></>
            </Grid>
          </Grid>
          <TableComponentsLeads rows={rows} refetch={refetchLeads} darkTheme={darkTheme} />
          <TableComponentsClients rows={rowsClients} refetch={refetchClients}  darkTheme={darkTheme}/>
          <TableComponentsPaque rows={rowsPaque} refetch={refetchPaque}  darkTheme={darkTheme}/>
        </div>

    );
  }

}

//export default App;
