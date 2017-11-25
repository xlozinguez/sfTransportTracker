import VehicleList from './vehicleList';
import RouteList from './routeList';

export class RootStore {
  public vehicleList: VehicleList;
  public routeList: RouteList;
  
  constructor() {
    this.vehicleList = new VehicleList(this);
    this.routeList = new RouteList(this);
  }
}