import XmlReader from 'xml-reader';

import Route from "../models/route";
import Stop from "../models/stop";

const NEXT_BUS_URL = "http://webservices.nextbus.com/service/publicXMLFeed";
const DEFAULT_AGENCY = "sf-muni";

const NEXT_BUS_COMMAND = {
  routeConfig: "routeConfig",
  vehicleLocations: "vehicleLocations"
}

class NextBusService {
  private xmlReader = null;

  constructor() {
    this.xmlReader = XmlReader.create();
  }

  public getRoutes(): Promise<Route[]> {
    return fetch(`${NEXT_BUS_URL}?command=${NEXT_BUS_COMMAND.routeConfig}&a=${DEFAULT_AGENCY}`)
    .then(results => results.text())
    .then(xmlRoutesData => {
      const routeList: Route[] = [];

      this.xmlReader.on('tag:route', routeInfo => {
        const newRoute = new Route(routeInfo.attributes);
        routeList.push(newRoute)
      });

      this.xmlReader.parse(xmlRoutesData);
      return routeList;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
  }
}

export default new NextBusService();