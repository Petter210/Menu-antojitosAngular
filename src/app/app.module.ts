import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriaAntojitosComponent } from './components/categoria-antojitos/categoria-antojitos.component';
import { RegistrarAntojitosComponent } from './components/categoria-antojitos/registrar-antojitos/registrar-antojitos.component';
import { PlatillosCategoriaComponent } from './components/platillos-categoria/platillos-categoria.component';
import { ActualizarAntojitosComponent } from './components/categoria-antojitos/actualizar-antojitos/actualizar-antojitos.component';
import { FormsModule } from '@angular/forms';

import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; // Filtro de la tabla
import { RegistrarPlatillosComponent } from './components/platillos-categoria/registrar-platillos/registrar-platillos.component';
import { ActualizarPlatillosComponent } from './components/platillos-categoria/actualizar-platillos/actualizar-platillos.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriaAntojitosComponent,
    RegistrarAntojitosComponent,
    PlatillosCategoriaComponent,
    ActualizarAntojitosComponent,
    RegistrarPlatillosComponent,
    ActualizarPlatillosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
