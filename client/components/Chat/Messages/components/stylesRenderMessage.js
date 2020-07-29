import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
  createStyles({
    wrapMessage: {
      display: 'flex',
      justifyContent: 'flex-start',
      width: '100%',
      marginTop: 10,
    },
    wrapMyMessage: {
      justifyContent: 'flex-end',
    },
    message: {
      maxWidth: '70%',
      minWidth: '10%',
      margin: '0 10px',
      padding: 5,
    },
    clientMessage: {
      backgroundColor: '#dfecfb',
    },
    time: {
      fz: 11,
      color: '#666',
    },
  })
);
