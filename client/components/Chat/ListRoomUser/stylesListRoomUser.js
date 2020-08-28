import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: 320,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: 320,
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
    checkbox: {
      position: 'absolute',
      right: 10,
    },
  })
);
