import { Component, OnInit } from '@angular/core';
import { CategoriaModel } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { Router } from '@angular/router';
import { ExportDataService } from '../../services/export-data.service';
import { PdfServiceService } from 'src/app/services/pdf-service.service';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });

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
  arrCategorianew = [];
  cat: any;
  idCat: string;
  actualizarCategoria = false;
  registrarCategoria = true;
  title: string;
  cate: any;
  // antojitos =   [
  //   {strNombre: "Postres", strDesc: "Pasteles"},
  //   {strNombre: "Ensaladas", strDesc: "Espaguqti a la bolonesa"},
  //   {strNombre: "Pizzas", strDesc: "Italiana"},
  // ]

  constructor(private categoriaService: CategoriaService, private router: Router, private excelService: ExportDataService,  private _PdfService: PdfServiceService) { }

  ngOnInit() {
    this.obtenerCategorias();
  }

  obtenerCategorias(){

    this.cargando = true;
    this.categoriaService.obtenerCategoria().then( (data) => {
      this.cargando = false;
      this.cat = data.categorias;
      this.cate = data.categorias;
      console.log(this.cat);

      for (const trabajo of this.cate) {

        const element = [
          trabajo.strNombre,
          trabajo.blnActivo ? 'Activo' : 'Inactivo'
        ];
        this.arrCategoria.push(element);
        this. arrCategorianew = this. arrCategoria ;
      }

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


  exportarPDF(){
    const header = [
      {
        text: 'Nombre',
        alignment: 'center',
        style: 'tableHeader',
        bold: true,
        fillColor: '#2a3e52',
        color: '#ffffff',
        size: 13,

      },
      {
       text: '  Activo  ',
       alignment: 'center',
       style: 'tableHeader',
       bold: true,
       fillColor: '#2a3e52',
       color: '#ffffff',
       size: 13,
      }

     ];
    this._PdfService.generatePdf(
       'Reporte de Categorías',
       header,
       this.arrCategorianew,
       "center"


     );

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
      Toast.fire({
        icon: 'success',
        title: `¡${nombre} fue se desactivado exitosamente!`
      });
      this.ngOnInit();
    }).catch( (err) => {
      console.log(err);
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
    });
  }
}
