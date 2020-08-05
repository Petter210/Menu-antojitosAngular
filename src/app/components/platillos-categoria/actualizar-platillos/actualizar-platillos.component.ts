import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PlatillosModel } from 'src/app/models/platillos.model';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-actualizar-platillos',
  templateUrl: './actualizar-platillos.component.html',
  styleUrls: ['./actualizar-platillos.component.css']
})
export class ActualizarPlatillosComponent implements OnInit {

  idPlatillo: string;
  idCat: string;
  actualizarCategorias = true;
  registrarCategorias = false;

  @Input() set idCategoria( value ) {

    this.idCat = value;
    console.log(this.idCat);
    this.ngOnInit();
  }
  @Output() actualiza = new EventEmitter();

  platilloModel: PlatillosModel = new PlatillosModel();

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
   this.obtenerPlatillo();
  }

  obtenerPlatillo() {

    this.categoriaService.obtenerPlatillos(this.idCat).then((data: any) => {
      this.platilloModel = data.cont;
      console.log(this.platilloModel);
    }).catch((err) => {
      console.log(err);
      // Toast.fire({
      //   icon: 'error',
      //   title: err.error.msg
      // });
    });

  }

  actualizarPlatillo(){
    // this.categoriaService.actualizarPlatillo(this.idCat, this.catModel).then((data: any) => {

    //   console.log(data);
    //   this.actualiza.emit(true);
    //   // Toast.fire({
    //   //   icon: 'success',
    //   //   title: `¡El espacio de trabajo "${this.trabajo.strNombre}" fue actualizado correctamente!`
    //   // });
    //   this.actualiza.emit();
    // }).catch((err) => {
    //   console.log(err);
    //   // Toast.fire({
    //   //   icon: 'error',
    //   //   title: err.error.msg
    //   // });
    //   this.actualiza.emit();
    // });
  }

}
