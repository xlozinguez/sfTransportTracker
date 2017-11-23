import { Component, State } from '@stencil/core';

import Route from '../../models/route';
import RouteList from '../../stores/routeList';

import {autorun} from 'mobx';

@Component({
  styleUrl: 'sf-routeList.scss',
  tag: 'sf-routeList'
})
export class SfRouteList {
  
  @State() public routes: Route[];
  
  constructor() {
    autorun(() => {
      this.routes = RouteList.routes.slice()
    })
  }

  public renderRoutes = () => {
    return this.routes ? this.routes.map((r) => {
      return (
        <li> { r.tag } - { r.title } </li>
      );
    }) : null
  }

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