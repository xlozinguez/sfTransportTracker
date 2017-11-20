import { action, createTransformer, observable } from "mobx";

import Vehicle from "../models/vehicle";

class VehicleList {
  @observable public vehicles: Vehicle[];

  @observable public getVehiclesForRoute = createTransformer(routeTag => {
    return this.vehicles.filter(v => v.routeTag === routeTag);
  });

  constructor() {
    this.vehicles = [];
  }

  @action public loadVehicles() {
    console.log('Loading vehicles');
  }
}

export default new VehicleList();