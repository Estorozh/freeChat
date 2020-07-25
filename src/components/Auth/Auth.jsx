import React, { useState } from 'react';
import { Button, Paper, TextField } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) =>
  createStyles({
    auth: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      margin: '0 auto',
      padding: 20,
    },
    title: {
      width: '100%',
      textAlign: 'center',
      marginTop: 0,
      marginBottom: 5,
    },
    btn: {
      width: '50%',
      float: 'right',
      marginTop: 10,
    },
  })
);

const Auth = (props) => {
  const classes = useStyles();
  const isAuth = localStorage.getItem('isAuth');
  const [name, setName] = useState('');
  const handleUsernameInput = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      {/* //TODO сделать редирект на отдельно выделенную комнату */}
      {isAuth && <Redirect to="/chat" />}
      <Paper elevation={3} className={classes.auth}>
        <h4 className={classes.title}>Input your name</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.login(name);
          }}
        >
          <TextField
            name="name"
            onChange={handleUsernameInput}
            required={true}
            placeholder="your name..."
            type="text"
            value={name}
            error={!/[a-zA-Zа-яА-ЯёЁ]/g.test(name) && name != ''}
            title="allowed only latin and cyrilic character"
            style={{ width: '100%' }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={() => props.login(name)}
          >
            Send
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Auth;
