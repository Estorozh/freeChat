import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import {
  Search as FindIcon,
  Timelapse as TimelapseIcon,
  Share as ShareIcon,
  Lock as LockIcon,
  Create as CreateIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: 10,
      left: 270,
      transform: 'translateZ(0px)',
      flexGrow: 1,
    },
    speedDial: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

const actions = [
  { icon: <LockIcon />, name: 'Создать защищенную комнату' },
  { icon: <TimelapseIcon />, name: 'Временный чат' },
  { icon: <ShareIcon />, name: 'Поделиться' },
  { icon: <FindIcon />, name: 'Поиск текста' },
  { icon: <CreateIcon />, name: 'Создать комнату' },
];

export function AddDropDownMenu() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </div>
  );
}
