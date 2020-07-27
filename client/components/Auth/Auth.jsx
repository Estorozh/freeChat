import React, { useState } from 'react';
import { Button, Paper, TextField } from '@material-ui/core';
import { useStyles } from './stylesAuth';

const Auth = ({ history }) => {
  const classes = useStyles();
  const [name, setName] = useState('');

  function login(name) {
    history.push(`/chat_${name}`, `Room ${name}`);
    io.emit('create_room', name);
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
            onChange={(e) => setName(e.target.value)}
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
            onClick={() => login(name)}
          >
            Send
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Auth;
