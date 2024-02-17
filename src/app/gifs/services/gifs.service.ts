import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/responseGifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }

  private apiKey: string = 'Obb2yPr3oujjs8WJSuWNcq1vJHJDvMy6';
  private urlBase: string = 'https://api.giphy.com/v1/gifs';
  private endPoint: string = '/search';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(): string[] {
    return [...this._historial];
  }

  validarBusqueda(query: string) {
    if (query && !this.esQueryRepetido(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.slice(0, 10);
      this.buscarGifs(query);
      localStorage.setItem('historial', JSON.stringify(this._historial));
      console.log(this._historial);
    }
  }

  buscarGifs(query: string) {
    
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', '10')
      .set('lang', 'es');

    console.log(`${this.urlBase}/search`,{params});

    this.http
      .get<SearchGifsResponse>(`${this.urlBase}/search`, { params })
      .subscribe((response) => {
        console.log(response.data);
        this.resultados = response.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }

  esQueryRepetido(query: string): boolean {
    return this._historial.includes(query);
  }
}
