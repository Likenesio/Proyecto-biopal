import { Component} from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { FacturaService } from 'src/app/service/factura-service/factura.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent{

  respuesta: any;
  facturasListar: any[] = [];
  listaFacturaAPI: any[] = [];
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe: any;

  visible: boolean = false;

  idSeleccionado: any;

  first = 0;
  rows = 10;

  constructor(private facturaService: FacturaService) { }

  ngOnInit() {
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');

    this.facturaService.listarFacturas().subscribe((data) => {
      this.respuesta = data;
      this.listaFacturaAPI = this.respuesta.factura;
      //console.log(this.listaFacturaAPI);
    });
  }

  //Funcion de tabla de listado de facturas
  showDialog(id: String) {
    this.visible = true;

    this.idSeleccionado = id;
  }
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.listaFacturaAPI
      ? this.first === this.listaFacturaAPI.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.listaFacturaAPI ? this.first === 0 : true;
  }
generarFacturaPDF(id: any) {
this.facturaService.buscarFacturaID(id).subscribe((data) => {
let facturaData = data.factura;
console.log(facturaData);

const doc = new jsPDF({
  orientation: 'portrait',
  unit: 'mm',
  format: 'letter',
  putOnlyUsedFonts: true,});


const pageWidth = doc.internal.pageSize.getWidth();//Variable que considera la anchura total de la página
const pageHeight = doc.internal.pageSize.getHeight();//Variable que considera la altura total de la página

            // Encabezado izquierdo
        doc.setFontSize(20);
        doc.setTextColor('green');
        doc.text('BioPal', 14, 15);
        doc.setFontSize(7);
        doc.text('Brindando siempre los mejores y más selectos productos para el consumo de nuestros clientes', 14, 18);
        doc.text('Venta de frutas y verduras al por mayor', 14, 21);

        // Encabezado derecho (borde de color rojo)
        doc.setDrawColor('red');
        doc.rect(pageWidth - 58, 3, 50, 18, 'S');
        doc.setTextColor('red');
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('FACTURA ELECTRÓNICA', pageWidth - 55, 11);
        doc.text('N° ' + facturaData.numero_factura, pageWidth - 40, 16);

        // Datos de la boleta
        doc.setDrawColor('black');
        doc.setFillColor('white'); // Fondo blanco
        doc.setLineWidth(0.1);
        doc.rect(14, 38, pageWidth - 28, 25, 'FD');
        doc.setTextColor('black'); // Texto en negro
        doc.setFontSize(10); // Tamaño de fuente para datos

        //doc.text('Cliente: ' + facturaData.pedido.cliente[0].nombre_cliente, 16, 45);
        doc.text('Vendedor: ' + facturaData.pedido.usuario[0].nombre_usuario, 16, 45);
        doc.text(
          'Fecha de Venta: ' +
            formatDate(
              new Date(facturaData.fecha_emision),
              'dd/MM/yyyy',
              'en-US'
            ),
          16,
          50
        );
        doc.text('Forma de Pago: ' + facturaData.pedido.modo_pago, 16, 55);
        // Detalles de la boleta
        doc.setFillColor('white'); // Fondo blanco
        //doc.rect(14, 100, pageWidth - 40, 80, 'FD'); // Rectángulo con fondo blanco
        autoTable(doc, {
          startY: 85,
          //Cabecera de la tabla
          head: [
            [
              'Código Barras',
              'Nombre Producto',
              'Precio',
              'Cantidad',
              'Subtotal',
            ],
          ],
          //Detalles de la tabla
          body: facturaData.productos.map((detalle: any) => [
            detalle.codigo_barras,
            detalle.nombre_producto,
            '$' + detalle.precio,
            detalle.cantidad,
            '$' + detalle.cantidad * detalle.precio,
          ]),
        });

        // Totales
        doc.rect(pageWidth - 70, pageHeight - 70, 55, 20, 'S'); // Rectángulo con fondo blanco
        doc.setFontSize(10); // Tamaño de fuente para neto e iva
        doc.text('Neto: $' + facturaData.neto, pageWidth - 68, 214);
        doc.text('IVA (19%): $' + facturaData.iva, pageWidth - 68, 220);
        doc.setFontSize(14);//Agrandar más el tamaño de la letra para el total
        doc.text('TOTAL: $' + facturaData.total, pageWidth - 68, 227);

        //Pie de página
        doc.setFontSize(7);//Texto en tamaño 7
        doc.text('Copia cliente', pageWidth - 120, pageHeight - 5);


        doc.save('Factura ' + 'BioPal ' + 'N°' + facturaData.numero_factura + '.pdf');


      }
);
}
}
