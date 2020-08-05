import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlatillosModel } from 'src/app/models/platillos.model';
import { CategoriaService } from 'src/app/services/categoria/categoria.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-registrar-platillos',
  templateUrl: './registrar-platillos.component.html',
  styleUrls: ['./registrar-platillos.component.css']
})
export class RegistrarPlatillosComponent implements OnInit {

  @Input() idCategoria;
  @Output() actualiza = new EventEmitter();
  idCatPlatillo: string;
  platillo: PlatillosModel = new PlatillosModel();

  constructor(private categoriaService: CategoriaService, private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
    this.idCategoria = this.rutaActiva.snapshot.params.id;
    console.log('ID categoria desde componente registrar');
    console.log(this.idCategoria);
  }

  registrarPlatillo(){
    this.categoriaService.registrarPlatillos(this.idCategoria, this.platillo).then( (data: any) =>{
      this.actualiza.emit(true);

      this.categoriaService.obtenerPlatillos(this.idCategoria).then( (data) => {
        console.log(data.categorias);
      });
      console.log(data);
      this.actualiza.emit(true);

    }).catch((err) => {
      // Toast.fire({
      //   icon: 'error',
      //   title: err.error.msg
      // });
      console.log(err);
    });
  }

}
