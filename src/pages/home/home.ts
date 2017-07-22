import { Component } from '@angular/core';
import { Refresher, reorderArray } from 'ionic-angular'
import { NavController } from 'ionic-angular';

import { ANIMALES, Animal } from '../../assets/data.animales'

@Component({ 
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  animales: Animal[] = [];
  audio = new Audio();
  audioTiempo: any;
  ordenando: boolean = false;

  constructor( public navCtrl: NavController ) {
    this.animales = ANIMALES.slice(0);
  }

  reproducir( animal: Animal ){
    this.pausarAuido(animal);
    if(animal.reproduciendo){
      animal.reproduciendo = false;
      return;
    }
    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();
    animal.reproduciendo = true;
    this.audioTiempo = setTimeout(() => animal.reproduciendo = false, animal.duracion * 1000); 
  }

  private pausarAuido( animal: Animal ){
    clearTimeout(this.audioTiempo);
    this.audio.pause();
    this.audio.currentTime = 0;

    this.animales.map(( ele ) => { 
        if(ele.nombre != animal.nombre) ele.reproduciendo = false;
    });
  }

  borrar(idx: number){
    this.animales.splice( idx, 1 );
  }

  recargar(refresher: Refresher){
    setTimeout(() => {
      this.animales = ANIMALES.slice(0);
      refresher.complete();
    }, 2000)
  }

  reordenarAnimales(idxs: any){
    this.animales = reorderArray(this.animales, idxs);
  }
}
