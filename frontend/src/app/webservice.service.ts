import { Injectable } from '@angular/core';
import {Client, fetchExchange} from '@urql/core';
import GET_WORLD from './Grapqhrequests';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {
  server = 'http://localhost:3000/';
  user = 'Toto';

  createClient() {
    return new Client({ url:this.server +'graphql',
      exchanges: [fetchExchange] });
  }

  getWorld(user: string) {
    return this.createClient().query(GET_WORLD, {"user":user}).toPromise().then(response => {
      console.log('Response:', response);
      return response;
  })
  }

  constructor() { }
}
