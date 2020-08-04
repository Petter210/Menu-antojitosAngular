export class CategoriaModel {
    _id?: string;
    strNombre: string;
    strDesc: string;
    blnActivo: boolean;
    aJsnRutas: [{
        _id: string;
        strNombre: string;
        strRuta: string;
        
    }];
}