import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/responseGifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {

  constructor(private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!)||[];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!)||[];
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }

  }


  private apiKey:string = "Obb2yPr3oujjs8WJSuWNcq1vJHJDvMy6"
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  buscarGifs(query: string) {
    if (query && !this.esQueryRepetido(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.slice(0, 10);
      localStorage.setItem('historial',JSON.stringify(this._historial));
      console.log(this._historial);
    }

    //Solicitud http
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=Obb2yPr3oujjs8WJSuWNcq1vJHJDvMy6&q=${query}&limit=15&lang=es`)
    .subscribe((response) => {
      console.log(response.data);
      this.resultados = response.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    })

  }

  esQueryRepetido(query: string): boolean {
    return this._historial.includes(query);
  }
}
