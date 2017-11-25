import { Component } from '@stencil/core';

import VehicleList from '../../stores/vehicleList';
// import VehicleList from '../../stores/vehicleList';

const vehicleList = new VehicleList();

@Component({
  styleUrl: 'sf-app.scss',
  tag: 'sf-app'
})
export class SfApp {
  public render() {
    return (
      <div id="sf-transit-tracker">
        <sf-map 
          longitude="37.7749" 
          latitude="-122.4194" 
          vehicleList={vehicleList.vehicles}/>
        <sf-routeList />
      </div>
    );
  }
}




