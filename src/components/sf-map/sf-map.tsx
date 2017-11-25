import { Component, Element, Prop, State } from '@stencil/core';

const GMAPS_API_KEY = 'FOO';

import Vehicle from "../../models/vehicle";

import {autorun} from 'mobx';

@Component({
  styleUrl: 'sf-map.scss',
  tag: 'sf-map'
})
export class SfMap {
  // @State() public vehicles: Vehicle[];

  @Prop() public latitude: string;
  @Prop() public longitude: string;
  @Prop() public vehicleList: Vehicle[];

  @Element() public mapEl: HTMLElement;



  constructor() {
    autorun(() => {
      // this.vehicles = VehicleList.vehicles.slice();
      this.displayVehicles();
    })
  }
  
  public map: null;

  public componentWillLoad() {
    this.initMap();
  }

  public componentDidLoad() {
    this.loadMap();
  }

  public render() {
    return (
      <div id="map">
        The map could not be loaded.
      </div>
    );
  }
  
  // Initialize google map script
  private initMap = () => {
    console.log('SfMap: initMap');
    const gMapsScript = document.createElement('script');
    gMapsScript.setAttribute('async', '');
    gMapsScript.setAttribute('defer', '');
    gMapsScript.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${GMAPS_API_KEY}`);
    this.mapEl.appendChild(gMapsScript);
  }

  // Load map and set to the current position
  private loadMap = () => {
    console.log('SfMap: loadMap');
    let timeout = null;
    // Check for map being loaded
    if (!window.hasOwnProperty('google')) {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      timeout = window.setTimeout(()=>{
        this.loadMap();
      }, 1000);
    } else {
      clearTimeout(timeout);
      // Create the map and set the current position
      const latlng = new (window as any).google.maps.LatLng(+this.longitude,+this.latitude);
      this.map = new (window as any).google.maps.Map(this.mapEl, {
        center: latlng,
        zoom: 13
      });
      this.displayVehicles();
    }
  }

  // display vehicles on the map
  private displayVehicles = () => {
    console.log('SfMap: displayVehicles');
    if(this.map) {
      console.log(`displaying ${this.vehicleList.length} vehicles on ${this.map}`);
      this.vehicleList.forEach(v => {
        console.log('setting marker for ', v);
        new (window as any).google.maps.Marker({
          position: {
            lat: +v.lat,
            lng: +v.lon
          },
          label: `${v.id}`,
          map: this.map
        })
      });
    }
  }
}