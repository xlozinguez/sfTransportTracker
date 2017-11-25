import { Component, Element, Prop, State } from '@stencil/core';

const GMAPS_API_KEY = 'FOO';

import Vehicle from '../../models/vehicle';
import VehicleList from '../../stores/vehicleList';
// import { RootStore } from '../../stores/rootStore';

import {autorun, action, observable} from 'mobx';

@Component({
  styleUrl: 'sf-map.scss',
  tag: 'sf-map'
})
export class SfMap {
  @Prop() public latitude: string;
  @Prop() public longitude: string;
  @Prop() public vehicleList: VehicleList;

  @State() public vehicles: Vehicle[] = [];

  @Element() public mapEl: HTMLElement;

  @observable public mapLoaded: boolean = false;

  @action.bound public toggleMapState() {
    this.mapLoaded = !this.mapLoaded;
  }

  constructor() {
    autorun(() => {
      if (this.mapLoaded && this.vehicleList) {
        this.vehicles = [...this.vehicleList.vehicles];
        this.displayVehicles();
      }
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
      this.toggleMapState();
    }
  }

  // display vehicles on the map
  private displayVehicles = () => {
    console.log('SfMap: displayVehicles', );
    this.vehicles.forEach(v => {
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