import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { NgForm } from '@angular/forms';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
 });

@Component({
  selector: 'app-registrar-antojitos',
  templateUrl: './registrar-antojitos.component.html',
  styleUrls: ['./registrar-antojitos.component.css']
})
export class RegistrarAntojitosComponent implements OnInit {

  @Input() idCategoria;
  @Output() actualiza = new EventEmitter();
  categoria: CategoriaModel = new CategoriaModel();


  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
  }

  registrarCategoria() {

    this.categoriaService.registrarCategoria(this.categoria).then((data: any) => {
      this.actualiza.emit(true);
      
      this.categoriaService.obtenerCategoria().then( (data) => {
        console.log(data.categorias);
      });
      console.log(data);
      this.actualiza.emit(true);
      Toast.fire({
        icon: 'success',
        title: `¡La categoria "${this.categoria.strNombre}" fue agregada exitosamente!`
      });
      // forma.controls['strNombre'].reset();
    }).catch((err) => {
      Toast.fire({
        icon: 'error',
        title: err.error.msg
      });
      console.log(err);
    });

  }

}
