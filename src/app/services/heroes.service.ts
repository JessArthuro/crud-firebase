import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroModel } from '../models/hero.model';
import { delay, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private url = 'https://crud-a15-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  crearHeroe(heroe: HeroModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id = resp.name; // transformacion de la respuesta y asignacion del id al heroe
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroModel) {
    const heroeTemp = {
      ...heroe,
    };

    delete heroeTemp.id; //se elimina el id para no mandarlo en la actualizacion a firebase

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  }

  borrarHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  getHeroes() {
    return this.http
      .get(`${this.url}/heroes.json`)
      .pipe(map((resp) => this.crearArreglo(resp)), delay(1500));
  }

  private crearArreglo(heroesObj: object) {
    const heroes: HeroModel[] = [];

    // validacion si no existe ningun registro en la bd que devuelva un arreglo vacio
    if (heroesObj === null) {
      return [];
    }

    Object.keys(heroesObj).forEach((key) => {
      const heroe: HeroModel = heroesObj[key];
      heroe.id = key;

      heroes.push(heroe);
    });

    return heroes;
  }
}
