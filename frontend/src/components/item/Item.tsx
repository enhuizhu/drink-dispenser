import React from 'react';
import { Card, Icon } from '@material-ui/core';

export const Item = (props: any) => {
  const { classes, iconName, name, quantity, onClick, itemKey} = props; 
  
  return <Card className={classes.listItem} onClick={onClick.bind(null, name, itemKey)}>
    <div><Icon className={classes.icon}>{iconName}</Icon></div>
    <div>{`${name}(${quantity})`}</div>
  </Card>
}

