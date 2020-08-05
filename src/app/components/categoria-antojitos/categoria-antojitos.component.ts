import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { Router } from '@angular/router';
import { ExportDataService } from '../../services/export-data.service';
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

  constructor(private categoriaService: CategoriaService, private router: Router, private excelService: ExportDataService) { }

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


  actualiza(event) {
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
    if (this.categorias.length !== 0) {
      let jsonobject = JSON.stringify(this.categorias);
      jsonobject = jsonobject.replace(/strNombre/gi, 'Nombre de la Categoría');
      jsonobject = jsonobject.replace(/strDesc/gi, 'Descripción');
  
      const jsonobject2 = JSON.parse(jsonobject);
      const count = Object.keys(jsonobject2).length;
      for (let i = 0; i < count; i++) {
        delete jsonobject2[i].created_at;
        delete jsonobject2[i].updated_at;
        delete jsonobject2[i]._id;
        delete jsonobject2[i].blnActivo;
        delete jsonobject2[i].__v;
        delete jsonobject2[i].aJsnPlatillos;
      }
  
      this.excelService.exportAsExcelFile(jsonobject2, 'Categorias');
    } else {
      // Swal.fire({
      //   type: 'error',
      //   title: 'Error de exportación',
      //   text: 'No hay ningún registro para exportar',
      // });
    }
  }
  elimiarCategoria(id: string){
    this.categoriaService.eliminarCategoria(id).then((data: any) => {

      const nombre = data.cont.strNombre;
      console.log(nombre);
      // Toast.fire({
      //   icon: 'success',
      //   title: `¡${nombre} fue se desactivado exitosamente!`
      // });
      this.ngOnInit();
    }).catch( (err) => {
      console.log(err);
      // Toast.fire({
      //   icon: 'error',
      //   title: err.error.msg
      // });
    });
  }
}
