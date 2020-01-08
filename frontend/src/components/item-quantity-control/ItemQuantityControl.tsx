import React, { useState } from 'react';
import { Fab, Icon } from '@material-ui/core';

export const ItemQuantityControl = (props: any) => {
  const { item, onChange} = props;
  let [itemNeeded, setItemNeeded] = useState(item.needed)

  return (<div>
    <div> {item.name} </div>
    <div>
      <Fab color="primary" aria-label="remove" onClick={() => {
        if (itemNeeded > 0) {
          setItemNeeded(--itemNeeded);
          onChange(itemNeeded);
        }
      }}>
        <Icon>remove</Icon>
      </Fab>
      {itemNeeded}
      <Fab color="primary" aria-label="add" onClick={() => {
        if (itemNeeded < item.total) {
          setItemNeeded(++itemNeeded);
          onChange(itemNeeded);
        }
      }}>
        <Icon>add</Icon>
      </Fab>
    </div>
  </div>);
}