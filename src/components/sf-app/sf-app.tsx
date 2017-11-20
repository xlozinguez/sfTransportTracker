import { Component, State } from '@stencil/core';

import routeListStore from '../../stores/routeList';
import vehicleListStore from '../../stores/vehicleList';

import Route from "../../models/route";
import Vehicle from "../../models/vehicle";

import {autorun, useStrict} from 'mobx';

useStrict(true);

@Component({
  styleUrl: 'sf-app.scss',
  tag: 'sf-app'
})
export class SfApp {

  @State() public routeList: Route[];
  @State() public vehicleList: Vehicle[];

  constructor() {
      autorun(() => {
        this.routeList = routeListStore.routes.slice();
        this.vehicleList = vehicleListStore.vehicles.slice();
      })
  }
  
  public componentWillLoad() {
    routeListStore.loadRoutes();
  };

  public render() {
    return (
      <div id="sf-transit-tracker">
        <sf-map longitude="37.7749" latitude="-122.4194" radius="2"/>
        <sf-routeList />
      </div>
    );
  }
}




