import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-platillos-categoria',
  templateUrl: './platillos-categoria.component.html',
  styleUrls: ['./platillos-categoria.component.css']
})
export class PlatillosCategoriaComponent implements OnInit {

  cargando: boolean;
  searchText: string;
  
  constructor() { }

  ngOnInit() {
  }

}
