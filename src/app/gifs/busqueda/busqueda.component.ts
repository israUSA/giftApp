import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent {

  @ViewChild('inputBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){}

  buscar():void{
    const buscar = this.txtBuscar.nativeElement.value;
    this.gifsService.buscarGifs(buscar);
    this.txtBuscar.nativeElement.value = '';
  }
}
