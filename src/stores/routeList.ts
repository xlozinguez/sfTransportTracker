import { createTransformer, observable, action } from "mobx";
import { RootStore } from "./rootStore";
import Route from "../models/route";

import nextBusService from '../service/nextBus-service';

export default class RouteList {
  public rootStore: RootStore;
  @observable public routes: Route[] = [];
  @observable public routeListLoaded: boolean = false;

  @observable public getStopsForRoute = createTransformer((routeTag: String) => {
    return this.routes.filter(r => r.tag === routeTag);
  });

  @action.bound public toggleRouteListLoaded() {
    this.routeListLoaded = !this.routeListLoaded;
    console.log('RouteList is loaded')
  }
  
  constructor(rootStore: RootStore) {
    
    this.rootStore = rootStore;

    nextBusService.getRoutes()
      .then((routes: Route[]) => {
        console.log('got routes');
        routes.forEach((route: Route) => {
          console.log('adding route');
          this.routes.push(route);
        });
        console.log('routes loaded');
        this.toggleRouteListLoaded();
      })
      .catch((err) => {
        console.error(err);
        return;
      });
  }
}