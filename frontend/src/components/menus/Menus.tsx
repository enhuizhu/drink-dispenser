import React, { useState } from 'react';
import { IconButton, Icon, Drawer, ListItem, List, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    menuButton: {
      position: 'fixed',
      top: 10,
      right: 10,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
  })
);

export const Menus = () => {
  let [open, setOpen] = useState(false);
  const classes = useStyles();
  
  return <div>
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="end"
      onClick={setOpen.bind(null, true)}
      className={classes.menuButton}
      style={{display: open ? 'none' : 'block'}}
    >
      <Icon>menu</Icon>
    </IconButton>
    <IconButton
      color="inherit"
      aria-label="close drawer"
      edge="end"
      onClick={setOpen.bind(null, false)}
      className={classes.menuButton}
      style={{display: open ? 'block' : 'none', right: 220}}
    >
      <Icon>close</Icon>
    </IconButton>
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><Icon>home</Icon></ListItemIcon>
          <ListItemText primary={'Home'} />
        </ListItem>
        <ListItem button component={Link} to="/maintain">
          <ListItemIcon><Icon>settings</Icon></ListItemIcon>
          <ListItemText primary={'Maintain'} />
        </ListItem>
      </List>
    </Drawer>
  </div>

};