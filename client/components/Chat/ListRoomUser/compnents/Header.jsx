import React, { useState, useEffect } from 'react';
import { useStyles } from './../stylesListRoomUser';
import { Button, Tabs, Tab } from '@material-ui/core';

export const Header = ({ toggleList, setToggleList }) => {
  const classes = useStyles();
  const handleToggleList = (_, val) => {
    setToggleList(val);
  };

  const createRoom = () => {
    const room = prompt(
      'Введите кирилицей или латиницей название новой комнаты'
    );
    if (room != null && /[a-zA-Zа-яА-ЯёЁ]/g.test(room)) {
      return io.emit('create room', room);
    }
    return createRoom();
  };

  return (
    <>
      <Tabs
        className={classes.selectList}
        value={toggleList}
        onChange={handleToggleList}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="All rooms" className={classes.toggleRooms} />
        <Tab label="Users online" className={classes.toggleRooms} />
      </Tabs>
      <Button
        variant="contained"
        color="primary"
        className={classes.addRoom}
        onClick={createRoom}
      >
        ADD ROOM
      </Button>
    </>
  );
};
