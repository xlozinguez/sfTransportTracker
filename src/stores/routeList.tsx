import { action, createTransformer, observable } from "mobx";

import Route from "../models/route";

class RouteList {
  @observable public routes: Route[];

  @observable public getStopsForRoute = createTransformer(routeTag => {
    return this.routes.filter(r => r.tag === routeTag);
  });

  constructor() {
    this.routes = [];
  }

  @action public loadRoutes() {
    const newRouteInfo = {
      color: "555555",
      id: "1",
      latMax: "37.8085899",
      latMin: "37.7625799",
      lonMax: "",
      lonMin: "",
      oppositeColor: "ffffff",
      shortTitle: "",
      tag: "F",
      title: "F-Market &amp; Wharves"
    };

    const newroute: Route = new Route(newRouteInfo);

    this.routes.push(
      newroute
    );
  }
}

export default new RouteList();