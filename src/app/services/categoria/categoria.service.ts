import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CategoriaModel } from '../../models/categoria.model';

@Injectable({
    providedIn: 'root'
  })

  export class CategoriaService {

    // selectRutasApi: RutasApiModel;
    searchText: string;
    url = 'http://localhost:3000';
    
   // /actualizar/:idCategoria/:idApi
    constructor(private http: HttpClient) {}

    // GESTIÓN DE CATEGORIAS
    
        // obtiene todas las categorias
      obtenerCategoria() {
        return this.http.get(`${this.url}/obtener`).pipe( map( (data: any) => data)).toPromise();
      }
        // obtiene todas las categorias
        obtenerCategoriaById(idCategoria: string) {
          return this.http.get(`${this.url}/obtener/${idCategoria}`).pipe( map( (data: any) => data)).toPromise();
        }
      // Registra todas las categorias
      registrarCategoria(categoria: any) {
        return this.http.post(`${ this.url }/registrar`, categoria).toPromise();
      }

      actualizarCategoria(idCat: string, categoria: any) {
        return this.http.put(`${this.url}/actualizar/${idCat}`, categoria).toPromise();
      }

      // tslint:disable-next-line: variable-name
      eliminarCategoria(_id: string) {
        return this.http.delete(`${ this.url }/eliminar/${_id}`).toPromise();
      }

// GESTIÓN DE PLATILLOS

      // obtiene todas las api de una categoria en especifica
    //   obtenerApi(idCat: string) {
    //     return this.http.get(`${this.url}/obtener/${idCat}`).pipe( map( (data: any) => data)).toPromise();
    //   }

    //   registrarApi(idCat: string, api: any) {
    //     return this.http.post(`${ this.url }/registrar/${idCat}`, api).toPromise();
    //   }

    //   actualizarApi( idCat: string, idOf: string, api: any ) {
    //     return this.http.put(`${this.url}/actualizar/${idCat}/${idOf}`, api).toPromise();
    //   }

    //   eliminarApi(idCat: string, _id: string) {
    //     return this.http.delete(`${ this.url }/eliminar/${idCat}/${_id}`).toPromise();
    //   }

  }
