import { Injectable } from '@angular/core';
import {Client, fetchExchange} from '@urql/core';
import GET_WORLD from './Grapqhrequests';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {
  server = 'http://localhost:4000/';
  user = 'Toto';

  createClient() {
    return new Client({ url: this.server,
      exchanges: [fetchExchange] });
  }

  getWorld(user: string) {
    return this.createClient().query(GET_WORLD, {"user": user}).toPromise();
  }

  constructor() { }
}
