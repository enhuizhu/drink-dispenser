import React, { useState } from 'react';
import { Fab, Icon } from '@material-ui/core';
import { makeStyles, createStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 20,
    },

    itemText: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
));

export const ItemQuantityControl = (props: any) => {
  const { item, onChange} = props;
  const classes = useStyles();
  let [itemNeeded, setItemNeeded] = useState(item.needed)

  return (
    <div className={classes.container}>
      <Fab color="primary" aria-label="remove" onClick={() => {
        if (itemNeeded > 0) {
          setItemNeeded(--itemNeeded);
          onChange(itemNeeded);
        }
      }}>
        <Icon>remove</Icon>
      </Fab>
      <span className={classes.itemText}>{item.name}({itemNeeded})</span>
      <Fab color="primary" aria-label="add" onClick={() => {
        if (itemNeeded < item.total) {
          setItemNeeded(++itemNeeded);
          onChange(itemNeeded);
        }
      }}>
        <Icon>add</Icon>
      </Fab>
    </div>
  );
}