import React, { useState, useEffect } from 'react';
import { useStyles } from './stylesListRoom';
import { useTheme } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Drawer,
  Hidden,
  TextField,
  List,
  ListItem,
  ListItemText,
  Tabs,
  Tab,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
// import { AddDropDownMenu } from '@c/_elements/AddDropDownMenu';

const ListRoom = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [toggleList, setToggleList] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);

  const handleToggleList = (_, val) => {
    setToggleList(val);
  };
  const createRoom = () => {
    const room = prompt('Введите название новой комнаты');
    io.emit('create room', room);
  };

  useEffect(() => {
    io.emit('reqRoomsUsers', toggleList);
    io.on('resRoomsUsers', (data) => {
      if (toggleList == 0) {
        setRooms(data);
      } else {
        setUsers(data);
      }
    });
  }, [toggleList]);

  let relocated = (room) => {
    io.emit('join', room);
  };

  const listRoom = (
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
      <List className={classes.rooms}>
        {/* TODO разобраться почему не могу пользоваться здесь room.name */}
        {rooms &&
          toggleList === 0 &&
          rooms.map((room, index) => (
            <ListItem
              key={index}
              button
              onClick={() => {
                relocated(room);
              }}
            >
              <Avatar>{rooms[index] && rooms[index][0]}</Avatar>
              <ListItemText
                primary={rooms[index]}
                style={{ paddingLeft: 10 }}
              />
            </ListItem>
          ))}
        {toggleList === 1 &&
          users.map((_, index) => (
            <ListItem key={index} button>
              <Avatar>{users[index] && users[index][0]}</Avatar>
              <ListItemText
                primary={users[index]}
                style={{ paddingLeft: 10 }}
              />
            </ListItem>
          ))}
      </List>
    </>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={props.mobileOpen}
          onClose={props.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {listRoom}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {listRoom}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default withRouter(ListRoom);
