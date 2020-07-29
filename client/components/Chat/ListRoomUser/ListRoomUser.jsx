import React, { useState, useEffect, useCallback } from 'react';
import { useStyles } from './stylesListRoomUser';
import { useTheme } from '@material-ui/core/styles';
import { Drawer, Hidden } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { Header } from './compnents/Header';
import { RoomUser } from './compnents/RoomUser';

const ListRoomUser = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [toggleList, setToggleList] = useState(0);

  const requestRoomUser = useCallback(() => {
    io.emit('reqRoomsUsers', toggleList);
    io.once('resRoomsUsers', (data) => {
      if (toggleList == 0) {
        setRooms(data);
      } else {
        setUsers(data);
      }
    });
  }, [toggleList]);

  useEffect(() => {
    requestRoomUser();
  }, [rooms, users]);

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
          <Header toggleList={toggleList} setToggleList={setToggleList} />
          <RoomUser users={users} rooms={rooms} toggleList={toggleList} />
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
          <Header toggleList={toggleList} setToggleList={setToggleList} />
          <RoomUser users={users} rooms={rooms} toggleList={toggleList} />
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default withRouter(ListRoomUser);
