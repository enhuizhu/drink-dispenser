import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { AgGridReact } from 'ag-grid-react';
import { ApiService } from '../../services/ApiService';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class Maintain extends React.Component<any, any> {
  private temperatureColDefs = [
    { headerName: "Time", field: "timestamp", width: 250,},
    { headerName: "Temperature", field: "temp" },
  ];

  private itemColDefs = [
    { headerName: "Name", field: "name"},
    { headerName: "Quantity", field: "quantity" },
  ];

  public state = {
    temperatureData: [],
  }  

  componentDidMount() {
    ApiService.getTemperature().then(results => {
      this.setState({
        temperatureData: results.temps.map((temp:any) => {
          return {
            timestamp: moment(+temp.timestamp).format('MMMM Do YYYY, h:mm:ss a'),
            temp: temp.temp,
          }
        })
      });
    });
  }

  render() {
    const stock = this.props.stock;
    const keys = stock.keySeq().toArray();
    const gridStyle = {height: '300px', width: '90vh', margin: '20px auto'};
    const itemData = keys.map((key: any) => ({
      quantity: stock.get(key),
      name: key,
    }));


    return (<div>
      <h3 className='text-center'>Stock Information</h3>
      <div className="ag-theme-balham" style={{...gridStyle, height: 150}}>
        <AgGridReact
          columnDefs={this.itemColDefs}
          rowData={itemData}>
        </AgGridReact>
      </div>
      <h3 className='text-center'>Most Recent 30 Temperature Readings</h3>
      <div className="ag-theme-balham" style={gridStyle}>
        <AgGridReact
          columnDefs={this.temperatureColDefs}
          rowData={this.state.temperatureData}>
        </AgGridReact>
      </div>
    </div>)
  }
}

const mapStateToProps = ((state: any) => {
  return {
    stock: state.stock,
  }
});

export default connect(mapStateToProps)(Maintain);


