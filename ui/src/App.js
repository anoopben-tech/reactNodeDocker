import React, {useState, useEffect} from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';

import {Avatar,
Button,
CssBaseline,
TextField,
Typography,
Container, 
makeStyles,
Accordion,
AccordionSummary,
AccordionDetails,
Divider,
List,
ListItem,
ListItemText
} from "@material-ui/core"
import {PersonAddOutlined, ExpandMore} from '@material-ui/icons';


const baseUrl = "http://localhost:8080"
console.log('process.env.BASE_API ===>>> ', process.env.BASE_API);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function App() {
  const [users, setUser] = useState([])
  const [userName, setUserName] = useState("")
  const classes = useStyles();
  const createUser = async(username) => {
    try {
      await axios.post(baseUrl+"/user-create", {
        username
      }) 
      fetchUser()
    } catch(e) {
      console.log('Error Creating user ===>>> ', e);
    }
  }
  const fetchUser = async(username) => {
    try {
      const res = await axios.get(baseUrl+"/users")
      setUser([...res.data])
    } catch(e) {
      console.log('Error Fetching User ===>>> ', e);
    }
  }
  useEffect(()=> {
    fetchUser()
  }, [])
  const handleSubmit = (e) => { 
    e.preventDefault()
    createUser(userName);
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create User
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(e) => {
              setUserName(e.target.value)
            }}
            value={userName}
            id="users"
            label="User Name"
            name="users"
            autoComplete="users"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create User
          </Button>
        </form>
      </div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Users Listing</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List className={classes.list} dense component="div" role="list">
            {users.length ? users.map((value, index) => {
              const {_id, username} = value
              return (
                <React.Fragment>
                  <ListItem key={_id} role="listitem">
                    <ListItemText id={_id} primary={`User -> ${username}`} />
                  </ListItem>
                  {index < (users.length - 1) ? <Divider /> : ""}
                </React.Fragment>
              )
            })
            :
            "No Users to list"
            }
          </List>
        </AccordionDetails>
      </Accordion>
    </Container> 
  );
}

export default App;
