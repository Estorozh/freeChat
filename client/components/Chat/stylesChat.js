import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - 320px)`,
        marginLeft: 320,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    exit: {
      position: 'relative',
      top: 5,
      cursor: 'pointer',
      marginLeft: 10,
    },
  })
);

export default useStyles;
