import { action, createTransformer, observable } from "mobx";

import Route from "../models/route";

import nextBusService from '../service/nextBus-service';

class RouteList {
  @observable public routes: Route[] = [];

  @observable public getStopsForRoute = createTransformer(routeTag => {
    return this.routes.filter(r => r.tag === routeTag);
  });

  @action public getRoutes() {
    nextBusService.getRoutes()
      .then(
        action("nextBusService-getRoutes-callback", (routes) => {
          (routes as Route[]).forEach(route => {
            this.routes.push(route);
          });
        })
      );
  }
}

export default new RouteList();