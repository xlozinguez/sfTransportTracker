import { observable } from "mobx";

export default class Vehicle {
  public id: string;
  public routeTag: string;
  public dirTag: string;
  @observable public lat: string;
  @observable public long: string;
  @observable public heading: string;

  constructor({ id, routeTag, dirTag, lat, long, heading }) {
    this.id = id;
    this.routeTag = routeTag;
    this.dirTag = dirTag;
    this.lat = lat;
    this.long = long;
    this.heading = heading;
  }
}
