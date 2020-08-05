import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PlatillosModel } from 'src/app/models/platillos.model';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-platillos-categoria',
  templateUrl: './platillos-categoria.component.html',
  styleUrls: ['./platillos-categoria.component.css']
})
export class PlatillosCategoriaComponent implements OnInit {

  cargando: boolean;
  searchText: string;
  idCategoria: string;
  platillos: PlatillosModel[] = [];
  arrPlatillos: any[];
  idPlatillo: string;

  actualizarPlatillo = false;
  registrarPlatillo = true;

  constructor(private rutaActiva: ActivatedRoute, private categoriaService: CategoriaService) { }

  ngOnInit() {
    // tslint:disable-next-line: no-unused-expression
    // console.log(this.rutaActiva.snapshot.params);
    this.idCategoria = this.rutaActiva.snapshot.params.id;
    this.obtenerPlatillos();
  }


  obtenerPlatillos() {
    this.categoriaService.obtenerPlatillos(this.idCategoria).then( (datos: any) => {

      this.platillos = datos.cont.platillo;
      console.log(this.platillos);

      this.cargando = false;
    }).catch( err => {
      this.cargando = false;
      console.log(err);
      // Toast.fire({
      //   type: 'error',
      //   title: `Error al consultar los platillos.`
      // });
    });
  }
  
  actualiza(event) {
    this.ngOnInit();
    console.log(event);
    // this.actualizarTrabajo = false;
    // this.registrarTrabajo = true;
  }

  mostrarEditar(idPla: string){
    console.log('desde componente platillos-categoria.component');
    console.log(idPla);
    this.idPlatillo = idPla;

    this.actualizarPlatillo = true;
    this.registrarPlatillo = false;
  }

}
