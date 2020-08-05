export class PlatillosModel {
    _id: string;
    strNombre: string;
    strDesc: string;
    strIngredientes: boolean;
    nmbPiezas: number;
    nmbPrecio: number;
    blnActivo: boolean;
        aJsnPlatillos: [
            {
                strNombre: string;
                strDesc: string;
                strIngredientes: string;
                nmbPiezas: number;
                nmbPrecio: number;
                blnActivo: boolean;
            }
    ];
}