import { createTransformer, observable } from "mobx";
import { RootStore } from "./rootStore";
import Vehicle from "../models/vehicle";

import nextBusService from '../service/nextBus-service';

export default class VehicleList {
  public rootStore: RootStore;
  @observable public vehicles: Vehicle[] = [];

  @observable public getVehiclesForRoute = createTransformer(routeTag => {
    return this.vehicles.filter(v => v.routeTag === routeTag);
  });

  constructor(rootStore: RootStore) {

    this.rootStore = rootStore;

    nextBusService.getVehicleLocations('38')
        .then((vehicles: Vehicle[]) => {
          console.log('VehicleList: getVehicleLocations: ', vehicles);
          vehicles.forEach((vehicle: Vehicle) => {
            this.vehicles.push(vehicle);
          });
        })
        .catch((err) => {
          console.error(err);
          return;
        });
  }

  // @action public getVehicleLocations(): Promise<Vehicle[]> {
  //   console.log('VehicleList: getVehicleLocations: ');
  //   return nextBusService.getVehicleLocations();
  //     // .then((vehicles: Vehicle[]) => {
  //     //   return vehicles;
  //     // });
  // }
}