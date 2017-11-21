import { observable } from "mobx";

import Stop from "./stop";
import Vehicle from "./vehicle";

export default class Route {
  public id: string;
  public tag: string;
  public title: string;
  public shortTitle: string;
  public color: string;
  public oppositeColor: string;
  public latMin: string;
  public latMax: string;
  public lonMin: string;
  public lonMax: string;
  @observable public stops: Stop[];
  @observable public vehicleList: Vehicle[];

  constructor({ id, tag, title, shortTitle, color, oppositeColor, latMin, latMax, lonMin, lonMax }) {
    this.id = id;
    this.tag = tag;
    this.title = title;
    this.shortTitle = shortTitle;
    this.color = color;
    this.oppositeColor = oppositeColor;
    this.latMin = latMin;
    this.latMax = latMax;
    this.lonMin = lonMin;
    this.lonMax = lonMax;
    this.stops = [];
    this.vehicleList = []; // vehicleList.getVehiclesForRoute(this.tag);
  }
}
