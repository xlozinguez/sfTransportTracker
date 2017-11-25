import XmlReader from 'xml-reader';

import Route from "../models/route";
import Stop from "../models/stop";
import Vehicle from "../models/vehicle";

const NEXT_BUS_URL = "http://webservices.nextbus.com/service/publicXMLFeed";
const DEFAULT_AGENCY = "sf-muni";

const NEXT_BUS_COMMAND = {
  routeConfig: "routeConfig",
  vehicleLocations: "vehicleLocations"
}

class NextBusService {
  private lastVehicleLocationsRequestTime: number = 0;
  
  public getRoutes(): Promise<Route[]> {
    return fetch(`${NEXT_BUS_URL}?command=${NEXT_BUS_COMMAND.routeConfig}&a=${DEFAULT_AGENCY}`)
    .then(results => results.text())
    .then(xmlRoutesData => {
      const routeList: Route[] = [];
      const xmlReader = XmlReader.create();
      xmlReader.on('tag:route', routeInfo => {
        const newRoute = new Route(routeInfo.attributes);
        routeInfo
          .children
          .filter(c => c.name === "stop")
          .forEach(s => newRoute.stops.push(new Stop({
            id: s.stopId,
            tag: s.tag,
            title: s.title,
            lat: s.lat,
            lon: s.lon
          })));
        routeList.push(newRoute)
      });

      xmlReader.parse(xmlRoutesData);
      return routeList;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
  }

  public getVehicleLocations(routeTag?: string): Promise<Vehicle[]> {
    let vehicleLocationsRequest = `${NEXT_BUS_URL}?command=${NEXT_BUS_COMMAND.vehicleLocations}&a=${DEFAULT_AGENCY}`;
    if(routeTag) {
      vehicleLocationsRequest += `&r=${routeTag}`
    }
    vehicleLocationsRequest += `&t=${this.lastVehicleLocationsRequestTime}`;

    return fetch(vehicleLocationsRequest)
    .then(results => {
      this.lastVehicleLocationsRequestTime = Date.now();
      return results.text();
    })
    .then(xmlVehicleLocationsData => {
      const vehicleList: Vehicle[] = [];
      const xmlReader = XmlReader.create();
      xmlReader.on('tag:vehicle', vehicleInfo => {
        vehicleList.push(new Vehicle(vehicleInfo.attributes));
      });
      xmlReader.parse(xmlVehicleLocationsData);
      return vehicleList;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
  }
}

export default new NextBusService();