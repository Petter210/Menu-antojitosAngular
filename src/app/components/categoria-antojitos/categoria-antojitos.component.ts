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
  title: string;
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
    let jsnInfo = {};
    const jsnObject = [];
  
    if (this.cat.length !== 0 ) {
  
     for (let datos of this.cat) {
         jsnInfo = {};
         jsnInfo = {
           'Categorias': datos.strNombre,
           'Activo': datos.blnActivo ? 'Activo' : 'Inactivo'
         };
         if (jsnInfo !== '') {
             jsnObject.push(jsnInfo);
         }
     }
     this.excelService.exportAsExcelFile(jsnObject, `${this.title}`);
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
