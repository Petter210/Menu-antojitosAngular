import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PlatillosModel } from 'src/app/models/platillos.model';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { PdfServiceService } from 'src/app/services/pdf-service.service';
import { ExportDataService } from '../../services/export-data.service';

import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });

@Component({
  selector: 'app-platillos-categoria',
  templateUrl: './platillos-categoria.component.html',
  styleUrls: ['./platillos-categoria.component.css']
})
export class PlatillosCategoriaComponent implements OnInit {

  title: string;
  cargando: boolean;
  searchText: string;
  idCategoria: string;
  platillos: PlatillosModel[] = [];
  arrPlatillos: any[];
  arrPlat = [];
  arrPlatnew = [];
  idPlatillo: string;
  pla: any;
  pageActual = 1;
  platillo: any;
  actualizarPlatillo = false;
  registrarPlatillo = true;

  constructor(private rutaActiva: ActivatedRoute, private categoriaService: CategoriaService, private _PdfService: PdfServiceService, private excelService: ExportDataService) { }

  ngOnInit() {
    // tslint:disable-next-line: no-unused-expression
    // console.log(this.rutaActiva.snapshot.params);
    this.idCategoria = this.rutaActiva.snapshot.params.id;
    this.obtenerPlatillos();
  }


  obtenerPlatillos() {
    this.categoriaService.obtenerPlatillos(this.idCategoria).then( (datos: any) => {

      this.platillos = datos.cont.platillo;
      this.platillo = datos.cont.platillo;
      this.pla = datos.cont.platillo;

      console.log(this.platillos);

      for (const pla of this.platillo) {

        const element = [
          pla.strNombre,
          pla.blnActivo ? 'Activo' : 'Inactivo'
        ];
        this.arrPlat.push(element);
        this.arrPlatnew = this. arrPlat ;
      }

      this.cargando = false;
    }).catch( err => {
      this.cargando = false;
      console.log(err);
      Toast.fire({
        icon: 'error',
        title: `Error al consultar los platillos.`
      });
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
        text: 'Descripción',
        alignment: 'center',
        style: 'tableHeader',
        bold: true,
        fillColor: '#2a3e52',
        color: '#ffffff',
        size: 13,
      },
      {
        text: 'Ingredientes',
        alignment: 'center',
        style: 'tableHeader',
        bold: true,
        fillColor: '#2a3e52',
        color: '#ffffff',
        size: 13,
      },
      {
        text: 'Piezas',
        alignment: 'center',
        style: 'tableHeader',
        bold: true,
        fillColor: '#2a3e52',
        color: '#ffffff',
        size: 13,
      },
      {
        text: 'Precio',
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
       'Reporte de Platillos',
       header,
       this.arrPlatnew,
       "center"


     );

  }

  exportarExcel(){
    let jsnInfo = {};
    const jsnObject = [];
  
    if (this.pla.length !== 0 ) {
  
     for (let datos of this.pla) {
         jsnInfo = {};
         jsnInfo = {
           'Nombre': datos.strNombre,
           'Descripción': datos.strDesc,
           'Ingredientes': datos.strIngredientes,
           'Piezas': datos.nmbPiezas,
           'Precio': datos.nmbPrecio,
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
