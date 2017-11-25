import { Component, Prop, State } from '@stencil/core';

import RouteList from '../../stores/routeList';
// import { RootStore } from '../../stores/rootStore';
import Route from '../../models/route';

import { useStrict, autorun, computed } from 'mobx';
import { observer } from 'mobx-observer'

useStrict(true);

@observer
@Component({
  styleUrl: 'sf-routeList.scss',
  tag: 'sf-routeList'
})
export class SfRouteList {
  @Prop() public routes: Route[];
  
  // @State() public routes: Route[] = [];
  // // @State() public routeListLoaded: IObservable<Boolean>;

  // constructor() {
  // //   // this.routeListLoaded = observable(this.rootStore.routeList.routeListLoaded);
  //   autorun(() => {
  // //     if (this.routeList) {
  // //       this.routes = [...this.routeList.routes];
  // //     }
  //     debugger;
  //   })
  // }

  // @computed public get routes() {
  //   // debugger;
  //   return this.routeList.routes;
  // }
  
  private renderRoutes = () => {
    return this.routes ? this.routes.map((r: Route) => {
      return (<li> { r.tag } - { r.title } - {r.stops.length} </li>)
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