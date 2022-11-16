import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Nom',
    },
    {
        id: 'calories',
        numeric: false,
        disablePadding: false,
        label: 'Prenom',
    },
    {
        id: 'fat',
        numeric: false,
        disablePadding: false,
        label: 'Mail',
    },
    {
        id: 'carbs',
        numeric: false,
        disablePadding: false,
        label: 'Phone',
    },
    {
        id: 'carbs',
        numeric: false,
        disablePadding: false,
        label: 'Prix',
    },
    {
        id: 'carbs',
        numeric: false,
        disablePadding: false,
        label: 'Lieu',
    },
    {
        id: 'carbs',
        numeric: false,
        disablePadding: false,
        label: 'Envie',
    },
    {
        id: 'carbs',
        numeric: false,
        disablePadding: false,
        label: 'Precision',
    },
    {
        id: 'carbs',
        numeric: false,
        disablePadding: false,
        label: 'Couleur',
    }
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;
    const { selected } = props;
    const [nom, setNom] = React.useState();
    const [prenom, setPrenom] = React.useState('');
    const [mail, setMail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [prix, setPrix] = React.useState('');
    const [lieu, setLieu] = React.useState('');
    const [envie, setEnvie] = React.useState('');
    const [precision, setPrecision] = React.useState('');
    const [couleur, setCouleur] = React.useState('');
    const [clientSelected, setClientSelected] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [rowsClients, setRowsClients] = React.useState([{ pk: "test1", sk: "test1" }]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpen2 = () => {
        setOpen2(true);
        fetchClients()
    };
    const handleClose2 = () => setOpen2(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
    };

    const deleteLeads = async () => {
        for (let i = 0; i < selected.length; i++) {
            const element = selected[i];
            await axios.post(`https://ccfzqdt1k6.execute-api.eu-west-1.amazonaws.com/Prod/dynamodbmanager`,
                {
                    "operation": "delete",
                    "tableName": "leads",
                    "payload": {
                        "Key": {
                            "pk": element.pk,
                            "sk": element.sk
                        }
                    }
                })
        }
        props.refetch()
    }
    const updateLeads = async () => {
        for (let i = 0; i < selected.length; i++) {
            const element = selected[i];
            await axios.post(`https://ccfzqdt1k6.execute-api.eu-west-1.amazonaws.com/Prod/dynamodbmanager`,
                {
                    "operation": "update",
                    "tableName": "leads",
                    "payload": {
                        "Key": {
                            "pk": element.pk,
                            "sk": element.sk
                        },
                        "AttributeUpdates": {
                            "mail": {
                                "Value": mail !== '' ? mail : element.mail
                            },
                            "phone": {
                                "Value": phone
                            },
                            "lieu": {
                                "Value": lieu
                            },
                            "prenom": {
                                "Value": prenom
                            },
                            "precision": {
                                "Value": precision
                            },
                            "prix": {
                                "Value": prix
                            },
                            "couleur": {
                                "Value": couleur
                            },
                            "nom": {
                                "Value": nom
                            },
                            "envie": {
                                "Value": envie
                            }
                        }
                    }
                })
            props.refetch()
            setOpen(false)
            setNom('')
            setPrenom('')
            setCouleur('')
            setEnvie('')
            setPrecision('')
            setMail('')
            setPhone('')
            setLieu('')
            setPrix('')
        }

    }
    const onInputchange = (event) => {
        if (event.target.name === 'nom') {
            setNom(event.target.value);
        }
        if (event.target.name === 'prenom') {
            setPrenom(event.target.value);
        }
        if (event.target.name === 'mail') {
            setMail(event.target.value);
        }
        if (event.target.name === 'phone') {
            setPhone(event.target.value);
        }
        if (event.target.name === 'lieu') {
            setLieu(event.target.value);
        }
        if (event.target.name === 'prix') {
            setPrix(event.target.value);
        }
        if (event.target.name === 'envie') {
            setEnvie(event.target.value);
        }
        if (event.target.name === 'precision') {
            setPrecision(event.target.value);
        }
        if (event.target.name === 'couleur') {
            setCouleur(event.target.value);
        }
    }

    const fetchClients = async () => {
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

    const makeAPack = async () => {
        await axios.post(`https://ccfzqdt1k6.execute-api.eu-west-1.amazonaws.com/Prod/dynamodbmanager`,
            {
                "operation": "create",
                "tableName": "paque",
                "payload": {
                    "Item": {
                        'pk': 'paque#' + Math.floor(Math.random() * 1000) + '-' + Math.floor(Math.random() * 1000),
                        'sk': 'sellman#1',
                        'nom': nom,
                        'prix': prix,
                        'client': clientSelected,
                        'leadsListe': selected,
                        'clientNom': clientSelected.nom,
                    }
                }
            })

        //refetchLeads()
        setOpen2(false)
    }
    const handleChangeSelect = (event) => {
        setClientSelected(event.target.value);
    };


    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon onClick={deleteLeads} />
                    </IconButton>
                </Tooltip>

            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}

            <Tooltip title="Make a paque">
                <IconButton>
                    <CardGiftcardIcon onClick={handleOpen2} />
                </IconButton>
            </Tooltip>
            <div>
                <Modal
                    open={open2}
                    onClose={handleClose2}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Cree un paque
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField id="standard-basic" size='small' label="Nom" variant="outlined" name="nom" onChange={onInputchange} /><br />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="standard-basic" size='small' label="Prix" variant="outlined" name="prix" onChange={onInputchange} /><br /><br />
                            </Grid>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Client</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={clientSelected}
                                    label="Client"
                                    onChange={handleChangeSelect}
                                >
                                    {rowsClients.map(function (object, i) {
                                        return <MenuItem value={object}>{object.nom}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Button variant="contained" onClick={makeAPack}>Save</Button>
                    </Box>
                </Modal>
            </div>


            {numSelected === 1 ? (
                <>
                    <Tooltip title="Delete">
                        <IconButton>
                            <AutoFixHighIcon onClick={handleOpen} />
                        </IconButton>
                    </Tooltip>
                    <div>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Update the leads
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField id="standard-basic" size='small' label="Nom" variant="outlined" name="nom" placeholder={selected[0].nom} onChange={onInputchange} /><br />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField id="standard-basic" size='small' label="Prenom" variant="outlined" name="prenom" onChange={onInputchange} placeholder={selected[0].prenom} /><br />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField id="standard-basic" size='small' label="Mail" variant="outlined" name="mail" onChange={onInputchange} placeholder={selected[0].mail} /><br />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField id="standard-basic" size='small' label="Telephone" variant="outlined" name="phone" onChange={onInputchange} placeholder={selected[0].phone} /><br />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField id="standard-basic" size='small' label="Lieu" variant="outlined" name="lieu" onChange={onInputchange} placeholder={selected[0].lieu} /><br />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField id="standard-basic" size='small' label="Prix" variant="outlined" name="prix" onChange={onInputchange} placeholder={selected[0].prix} /><br />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField id="standard-basic" size='small' label="Envie" variant="outlined" name="envie" onChange={onInputchange} placeholder={selected[0].envie} /><br />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField id="standard-basic" size='small' label="Couleur" variant="outlined" name="couleur" onChange={onInputchange} placeholder={selected[0].couleur} /><br />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField id="standard-basic" size='small' label="Precision" variant="outlined" name="precision" onChange={onInputchange} placeholder={selected[0].precision} /><br /><br />
                                    </Grid>
                                </Grid>
                                <Button variant="contained" onClick={updateLeads}>Save</Button>
                            </Box>
                        </Modal>
                    </div></>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = props.rows.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} selected={selected} refetch={props.refetch} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={props.rows.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 props.rows.slice().sort(getComparator(order, orderBy)) */}
                            {stableSort(props.rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.pk}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
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
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {/*             <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            /> */}
        </Box>
    );
}
