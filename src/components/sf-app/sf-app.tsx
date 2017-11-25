import { Component, State } from '@stencil/core';
import { RootStore } from '../../stores/rootStore';

import RouteList from '../../stores/routeList';
import VehicleList from '../../stores/vehicleList';

import { computed } from 'mobx';

@Component({
  styleUrl: 'sf-app.scss',
  tag: 'sf-app'
})
export class SfApp {
  @State() rootStore: RootStore;

  @computed public get vehicleList(): VehicleList {
    return this.rootStore.vehicleList;
  }

  @computed public get routeList(): RouteList {
    return this.rootStore.routeList;
  }

  componentWillLoad () {
    this.rootStore = new RootStore();
  }

  public render() {
    return (
      <div id="sf-transit-tracker">
        <sf-map 
          longitude="37.7749" 
          latitude="-122.4194" 
          vehicleList={this.vehicleList}/>
        <sf-routeList
          routes={this.routeList.routes} />
      </div>
    );
  }
}