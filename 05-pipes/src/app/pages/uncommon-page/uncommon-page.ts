import { Component, signal } from '@angular/core';
import { Card } from "../../components/card/card";
import { I18nPluralPipe, I18nSelectPipe } from '@angular/common';

const client = {
  name: 'Fernando',
  gender: 'male',
  age: 28,
  adress: ' Ottawa, Canada'
}

const client2 = {
  name: 'Alejandra',
  gender: 'female',
  age: 29,
  adress: ' Ottawa, Canada'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [
    Card, 
    I18nSelectPipe,
    I18nPluralPipe
  ],
  templateUrl: './uncommon-page.html',
})
export default class UncommonPage {
  client = signal(client);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
  }

  changeClient(){
    if( this.client() === client){
      this.client.set(client2)
      return;
    }

    this.client.set(client);
  }

  //i18n Plural
  clientsMaps = signal({
    '=0': 'no tenemos ningun cliente esperando',
    '=1': 'un cliente esperando',
    '=2': 'una pareja de clientes esperando',
    other: ' # clientes esperando',
  })


  clients = signal([
    "maria", 
    "pedro",
    "fernando", 
    "melisa",
    "natalia",
  ])

  deleteClient(){
    this.clients.update( prev => prev.slice(1));
  }
}
