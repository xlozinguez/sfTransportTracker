import { Component, State } from '@stencil/core';

import Route from '../../models/route';
import routeListStore from '../../stores/routeList';

import {autorun, useStrict} from 'mobx';

useStrict(true);

@Component({
  styleUrl: 'sf-routeList.scss',
  tag: 'sf-routeList'
})
export class SfRouteList {

  @State() public routeList: Route[];
  
  constructor() {
    autorun(() => {
      this.routeList = routeListStore.routes.slice();
    })
  }

  public renderRoutes = () => {
    return this.routeList ? this.routeList.map((r) => {
      return (
        <li> { r.tag } - { r.title } - {r.stops.length} </li>
      );
    }) : null
  }
  
  public componentWillLoad() {
    routeListStore.getRoutes();
  };

  public render() {
    return (
      <div class='routeList'>
        <h1>Routes</h1>
        <ul>
          { this.renderRoutes() }
        </ul>
      </div>
    );
  }
}