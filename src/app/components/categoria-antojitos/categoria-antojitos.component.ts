import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-antojitos',
  templateUrl: './categoria-antojitos.component.html',
  styleUrls: ['./categoria-antojitos.component.css']
})
export class CategoriaAntojitosComponent implements OnInit {
  
  searchText: string;
  cargando: boolean;
  categorias: CategoriaModel[] = [];
  arrCategoria = [];
  cat: any;
  idCat: string;
  actualizarCategoria = false;
  registrarCategoria = true;
  // antojitos =   [
  //   {strNombre: "Postres", strDesc: "Pasteles"},
  //   {strNombre: "Ensaladas", strDesc: "Espaguqti a la bolonesa"},
  //   {strNombre: "Pizzas", strDesc: "Italiana"},
  // ]

  constructor(private categoriaService: CategoriaService, private router: Router) { }

  ngOnInit() {
    this.obtenerCategorias();
  }

  obtenerCategorias(){

    this.cargando = true;
    this.categoriaService.obtenerCategoria().then( (data) => {
      this.cargando = false;
      this.cat = data.categorias;
      console.log(this.cat);
    }).catch(( err: any ) => {
      this.cargando = false;
      // Toast.fire({
      //   icon: 'error',
      //   title: err.msg
      // });
    });
  }


  terminarActualizacion(event) {
    this.ngOnInit();
    console.log(event);
    // this.actualizarTrabajo = false;
    // this.registrarTrabajo = true;
  }

  
   mostrarEditar(idCategoria: string) {
    // console.log(idCategoria);
    this.idCat = idCategoria;
    this.actualizarCategoria = true;
    this.registrarCategoria = false;
  }


  exportPDF(){

  }

  exportarExcel(){

  }
}
