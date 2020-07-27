import React, { useState, useEffect } from 'react';
// import { AddDropDownMenu } from '@c/_elements/AddDropDownMenu';
import { makeStyles, createStyles, useTheme } from '@material-ui/core/styles';
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
import { rooms } from '@/mock-file.json';

const useStyles = makeStyles((theme) =>
  createStyles({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toggleRooms: {
      minWidth: '50%',
    },
    addRoom: {
      width: 260,
      margin: '12px 0',
      left: 'calc(50% - 130px)',
    },
    rooms: {
      height: 'calc(100vh - 120px)',
      overflowY: 'auto',
    },
    selectList: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 10,
      padding: '0 10px',
    },
  })
);

const ListRoom = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [toggleList, setToggleList] = useState(0);

  const handleToggleList = (_, val) => {
    setToggleList(val);
  };
  const createRoom = () => {
    const room = prompt('Введите название новой комнаты');
    io.emit('create room', room);
  }
  // if (toggleList === 1) {
  //   useEffect(()=> {
      
  //   }, [toggleList])
  // }


  const listRoom = (
    <>
      <Tabs
        className={classes.selectList}
        value={toggleList}
        onChange={handleToggleList}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="My rooms" className={classes.toggleRooms} />
        <Tab label="All rooms" className={classes.toggleRooms} />
      </Tabs>
      {/* <TextField
        id="searchRoom"
        className={classes.searchRoom}
        label="Search chat room"
        margin="normal"
        InputProps={{ type: 'search' }}
      /> */}
      <Button variant="contained" color="primary" className={classes.addRoom} onClick={createRoom}>
        ADD ROOM
      </Button>
      <List className={classes.rooms}>
        {rooms &&
          toggleList === 0 &&
          rooms.map((room, index) => (
            <ListItem key={index} button>
              <Avatar>{room.title && room.title[0]}</Avatar>
              <ListItemText primary={room.title} style={{ paddingLeft: 10 }} />
            </ListItem>
          ))}
        {toggleList === 1 && (
          <ListItem button>
            <Avatar>T</Avatar>
            <ListItemText primary="title" style={{ paddingLeft: 10 }} />
          </ListItem>
        )}
      </List>
      {/* <AddDropDownMenu /> */}
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

export default ListRoom;
