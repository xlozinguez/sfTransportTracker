export default class Stop {
  public id: string;
  public tag: string;
  public title: string;
  public shortTitle: string;
  public lat: string;
  public long: string;

  constructor({ id, tag, title, shortTitle, lat, long }) {
    this.id = id;
    this.tag = tag;
    this.title = title;
    this.shortTitle = shortTitle;
    this.lat = lat;
    this.long = long;
  }
}
