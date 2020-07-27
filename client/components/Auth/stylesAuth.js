import { makeStyles, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    auth: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      margin: '0 auto',
      padding: 20,
    },
    title: {
      width: '100%',
      textAlign: 'center',
      marginTop: 0,
      marginBottom: 5,
    },
    btn: {
      width: '50%',
      float: 'right',
      marginTop: 10,
    },
  })
);
