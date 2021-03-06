import React from 'react';
import { Theme, withStyles } from '@material-ui/core/styles'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { Stock } from '../../store/enums/stock.enums';
import { Item } from  '../../components/item/Item';
import { ItemQuantityControl } from '../../components/item-quantity-control/ItemQuantityControl';
import { reduceStock } from '../../store/actions/stock.action';

const ws = withStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    background: theme.palette.background.paper
  },
  listItem: {
    width: 100,
    textAlign: 'center',
    padding: 10,
    cursor: 'pointer',
    position: 'relative',
    '&:hover': {
      top: -10,
    },
    '&:not(:last-child)': {
      marginRight: 40,
    }
  },
  icon: {
    fontSize: 77,
    color: theme.palette.primary.light,
  },
  dialog: {
    width: 300,
  }
}));

export class Home extends React.Component<any, any> {
  public state: any = {
    selectedItem: {
      sugarNeededForDrink: 0,
      milkNeededForDrink: 0,
    },
    open: false,
  }
  
  handleItemOpen = (name: string, key: string) => {
    this.setState({
      selectedItem: {
        name,
        key,
        sugarNeededForDrink: 0,
        milkNeededForDrink: 0,
      },
      open: true,
    });
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  }
  
  handleSubmit = () => {
    const { key, sugarNeededForDrink, milkNeededForDrink } = this.state.selectedItem;
    this.props.reduceStock({
      itemName: key,
      quantity: 1,
    });

    if (sugarNeededForDrink) {
      this.props.reduceStock({
        itemName: Stock.sugar,
        quantity: sugarNeededForDrink,
      });
    }

    if (milkNeededForDrink) {
      this.props.reduceStock({
        itemName: Stock.milk,
        quantity: milkNeededForDrink,
      });
    }

    this.handleClose();
  }

  render() {
    const { 
      classes, 
      quantityOfCoffee, 
      quantityOfTea,
      quantityOfSugar,
      quantityOfMilk, 
    } = this.props;

    const items = [
      {
        name: 'Tea',
        iconName: 'emoji_food_beverage',
        itemKey: Stock.tea,
        quantity: quantityOfTea,
      },
      {
        name: 'Coffee',
        iconName: 'free_breakfast',
        itemKey: Stock.coffee,
        quantity: quantityOfCoffee,
      }
    ];

    const itemsNeedForDrink = [
      {
        name: 'Sugar',
        total: quantityOfSugar,
        neededItemKey: 'sugarNeededForDrink'
      },
      {
        name: 'Milk',
        total: quantityOfMilk,
        neededItemKey: 'milkNeededForDrink'
      }
    ]

    return (<div className={classes.root}>
      {
        items.map((item, index) => (
          <Item
            classes={classes}
            key={index}
            onClick={this.handleItemOpen}
            {...item}
          ></Item>
        ))
      }
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="text-center">{this.state.selectedItem.name}</DialogTitle>
        <DialogContent className={classes.dialog}>
          {
            itemsNeedForDrink.map((itemNeedForDrink, index) => (
              <ItemQuantityControl
                key={index}
                item={{
                  ...itemNeedForDrink,
                  needed: this.state.selectedItem[itemNeedForDrink.neededItemKey],
                }}
                onChange={(needed: number) => {
                  this.state.selectedItem[itemNeedForDrink.neededItemKey] = needed;
                }}
              ></ItemQuantityControl>
            ))
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSubmit} color="primary">
            Submit
          </Button>
          <Button onClick={this.handleClose} color="primary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>)
  }
}

const mapStateToProps = (state: any) => {
  const stock = state.stock;
  
  return {
    quantityOfCoffee: stock.get(Stock.coffee),
    quantityOfTea: stock.get(Stock.tea),
    quantityOfSugar: stock.get(Stock.sugar),
    quantityOfMilk: stock.get(Stock.milk),
  }
};

const mapDispatchToProps = ((dispatch: Function) => {
  return {
    reduceStock: (payload: any) => {
      dispatch(reduceStock(payload));
    }
  }
})

export default ws(connect(mapStateToProps, mapDispatchToProps)(Home));