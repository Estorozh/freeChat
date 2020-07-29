import React, { useState } from 'react';
import { Button, Paper, TextField } from '@material-ui/core';
import { useStyles } from './stylesAuth';

const Auth = ({ history }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [isIncorrect, toggleIsIncorrect] = useState(false);
  io.once('relocate', (room) => history.push(room));

  function login(name) {
    if (isIncorrect) {
      return;
    }
    localStorage.setItem('user', name);
    io.emit('join');
  }

  function handleChangeInput(e) {
    setName(e.target.value);
    toggleIsIncorrect(!/[a-zA-Zа-яА-ЯёЁ]/g.test(name));
  }

  return (
    <>
      <Paper elevation={3} className={classes.auth}>
        <h4 className={classes.title}>Input your name</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(name);
          }}
        >
          <TextField
            name="name"
            onChange={handleChangeInput}
            required={true}
            placeholder="your name..."
            type="text"
            value={name}
            error={isIncorrect}
            title="allowed only latin and cyrilic character"
            style={{ width: '100%' }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={() => login(name)}
          >
            Log in
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Auth;
