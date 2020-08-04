import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';

@Component({
  selector: 'app-actualizar-antojitos',
  templateUrl: './actualizar-antojitos.component.html',
  styleUrls: ['./actualizar-antojitos.component.css']
})
export class ActualizarAntojitosComponent implements OnInit {

  categoria: CategoriaModel = new CategoriaModel();
  idCat: string;
  actualizarCategorias = true;
  registrarCategorias = false;

  @Input() set idCategoria( value ) {

    this.idCat = value;
    this.ngOnInit();
  }
  @Output() terminarActualizacion = new EventEmitter();

  catModel: CategoriaModel = new CategoriaModel();

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.obtenerCategoria();
  }

  obtenerCategoria() {

    this.categoriaService.obtenerCategoriaById(this.idCat).then((data: any) => {
      this.catModel = data.cont;
      console.log(this.catModel);
    }).catch((err) => {
      console.log(err);
      // Toast.fire({
      //   icon: 'error',
      //   title: err.error.msg
      // });
    });

  }

  actualizarCategoria(){
    this.categoriaService.actualizarCategoria(this.idCat, this.catModel).then((data: any) => {

      console.log(data);
      this.terminarActualizacion.emit(true);
      // Toast.fire({
      //   icon: 'success',
      //   title: `¡El espacio de trabajo "${this.trabajo.strNombre}" fue actualizado correctamente!`
      // });
      this.terminarActualizacion.emit();
    }).catch((err) => {
      console.log(err);
      // Toast.fire({
      //   icon: 'error',
      //   title: err.error.msg
      // });
      this.terminarActualizacion.emit();
    });
  }

  cancelPUT() {
    this.terminarActualizacion.emit(false);
    // this.actualizarCategorias = false;
    // this.registrarCategorias = true;
  }
}
