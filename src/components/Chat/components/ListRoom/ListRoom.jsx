import React from 'react';
import { AddDropDownMenu } from '@c/_elements/AddDropDownMenu';
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
    searchRoom: {
      width: 260,
      marginTop: 5,
      left: 'calc(50% - 130px)',
    },
    rooms: {
      height: 'calc(100% - 52px)',
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
  // const container =
  //   window !== undefined ? () => window().document.body : undefined;

  const listRoom = (
    <div>
      <div className={classes.selectList}>
        {[
          { href: '#personal', text: 'personal' },
          { href: '#allRoom', text: 'all rooms' },
        ].map((props) => (
          <Button
            variant="contained"
            color="primary"
            href={props.href}
            key={props.text}
          >
            {props.text}
          </Button>
        ))}
      </div>
      <TextField
        id="searchRoom"
        className={classes.searchRoom}
        label="Search chat room"
        margin="normal"
        InputProps={{ type: 'search' }}
      />
      <div className={classes.toolbar}>
        <List className={classes.rooms}>
          {rooms &&
            rooms.map((room, index) => (
              <ListItem key={index} button>
                <Avatar>{room.title && room.title[0]}</Avatar>
                <ListItemText
                  primary={room.title}
                  style={{ paddingLeft: 10 }}
                />
              </ListItem>
            ))}
        </List>
      </div>
      <AddDropDownMenu />
    </div>
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
            keepMounted: true, // Better open performance on mobile.
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
