import React, { useCallback } from 'react';
import { useStyles } from './../stylesListRoomUser';
import { Avatar, List, ListItem, ListItemText } from '@material-ui/core';

export const RoomUser = (props) => {
  const { users, rooms, toggleList } = props;
  const classes = useStyles();
  const thisRoom = location.pathname.replace('/chat_', '');
  const relocated = useCallback((room) => io.emit('join', room), []);
  const isChecked = useCallback((room) => thisRoom == room, [thisRoom]);

  return (
    <List className={classes.rooms}>
      {rooms &&
        toggleList === 0 &&
        rooms.map((room, index) => (
          <label key={room}>
            <ListItem
              button
              onClick={() => {
                relocated(room);
              }}
            >
              <input
                type="radio"
                name="rooms"
                style={{ display: 'none' }}
                defaultChecked={isChecked(room)}
              />
              <Avatar className="avaRoom">
                {rooms[index] && rooms[index][0]}
              </Avatar>
              <ListItemText
                primary={rooms[index]}
                style={{ paddingLeft: 10 }}
              />
            </ListItem>
          </label>
        ))}
      {toggleList === 1 &&
        users.map((_, index) => (
          <ListItem key={index} button>
            <Avatar>{users[index] && users[index][0]}</Avatar>
            <ListItemText primary={users[index]} style={{ paddingLeft: 10 }} />
          </ListItem>
        ))}
    </List>
  );
};
