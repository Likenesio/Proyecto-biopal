import { Component } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import { FacturaService } from 'src/app/service/factura-service/factura.service';
import { DteService } from 'src/app/service/DTE/dte.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
})
export class FacturaComponent {
  factura: any;
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

  constructor(
    private facturaService: FacturaService,
    private dteService: DteService
  ) {}

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
  generarFacturaPDF(id: string) {
    this.facturaService.buscarFacturaID(id).subscribe((data) => {
      let facturaData = data.factura;
      console.log('Datos factura: ', facturaData);

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'letter',
        putOnlyUsedFonts: true,
      });

      const pageWidth = doc.internal.pageSize.getWidth(); //Variable que considera la anchura total de la página
      const pageHeight = doc.internal.pageSize.getHeight(); //Variable que considera la altura total de la página

      // Encabezado izquierdo
      doc.setFontSize(20);
      doc.setTextColor('green');
      doc.text('BioPal', 14, 15);
      doc.setFontSize(8);
      doc.text(
        'Brindando siempre los mejores y más selectos productos para el consumo de nuestros clientes',
        14,
        18
      );
      doc.text('Venta de frutas y verduras al por mayor', 14, 21);

      // Encabezado derecho (borde de color rojo)
      doc.setDrawColor('red');
      doc.rect(pageWidth - 58, 3, 50, 18, 'S');
      doc.setTextColor('red');
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('FACTURA ELECTRÓNICA', pageWidth - 56.5, 12);
      doc.text('Folio N° ' + facturaData.numero_factura, pageWidth - 35, 16);

      // Datos de la boleta
      doc.setDrawColor('black');
      doc.setFillColor('white'); // Fondo blanco
      doc.setLineWidth(0.1);
      doc.rect(14, 38, pageWidth - 28, 25, 'FD');
      doc.setTextColor('black'); // Texto en negro
      doc.setFontSize(10); // Tamaño de fuente para datos

      //doc.text('Cliente: ' + facturaData.pedido.cliente[0].nombre_cliente, 16, 45);
      doc.text(
        'Vendedor: ' +
          facturaData.pedido.usuario[0].nombre_usuario +
          ' ' +
          facturaData.pedido.usuario[0].apellido,
        16,
        45
      );
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
      // Detalles de la factura
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
      doc.setFontSize(14); //Agrandar más el tamaño de la letra para el total
      doc.text('TOTAL: $' + facturaData.total, pageWidth - 68, 227);

      //Pie de página
      doc.setFontSize(7); //Texto en tamaño 7
      doc.text('Copia cliente', pageWidth - 120, pageHeight - 5);

      //Página 2 COPIA EMPRESA
      doc.addPage();

      // Encabezado izquierdo
      doc.setFontSize(20);
      doc.setTextColor('green');
      doc.text('BioPal', 14, 15);
      doc.setFontSize(8);
      doc.text(
        'Brindando siempre los mejores y más selectos productos para el consumo de nuestros clientes',
        14,
        18
      );
      doc.text('Venta de frutas y verduras al por mayor', 14, 21);

      // Encabezado derecho (borde de color rojo)
      doc.setDrawColor('red');
      doc.rect(pageWidth - 58, 3, 50, 18, 'S');
      doc.setTextColor('red');
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('FACTURA ELECTRÓNICA', pageWidth - 56.5, 12);
      doc.text('Folio N° ' + facturaData.numero_factura, pageWidth - 35, 16);

      // Datos de la boleta
      doc.setDrawColor('black');
      doc.setFillColor('white'); // Fondo blanco
      doc.setLineWidth(0.1);
      doc.rect(14, 38, pageWidth - 28, 25, 'FD'); // Rectángulo con fondo blanco
      doc.setTextColor('black'); // Texto en negro
      doc.setFontSize(10); // Tamaño de fuente para datos

      doc.text(
        'Vendedor: ' +
          facturaData.pedido.usuario[0].nombre_usuario +
          ' ' +
          facturaData.pedido.usuario[0].apellido,
        16,
        45
      );
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
      console.log('Datos de factura: ', facturaData);

      // Detalles de la boleta
      doc.setFillColor('white'); // Fondo blanco
      //doc.rect(14, 100, pageWidth - 40, 80, 'FD'); // Rectángulo con fondo blanco
      autoTable(doc, {
        startY: 85,
        head: [
          [
            'Código Barras',
            'Nombre Producto',
            'Precio',
            'Cantidad',
            'Subtotal',
          ],
        ],
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
      doc.setFontSize(10); // Tamaño de fuente para totales
      doc.text('Neto: $' + facturaData.neto, pageWidth - 68, 214);
      doc.text('IVA (19%): $' + facturaData.iva, pageWidth - 68, 220);
      doc.setFontSize(14);
      doc.text('TOTAL: $' + facturaData.total, pageWidth - 68, 227);

      //Pie de página
      doc.setFontSize(7);
      doc.text('Copia empresa', pageWidth - 120, pageHeight - 5);

      // Copia cedible...
      doc.addPage();

      // Encabezado izquierdo
      doc.setFontSize(20);
      doc.setTextColor('green');
      doc.text('BioPal', 14, 15);
      doc.setFontSize(8);
      doc.text(
        'Brindando siempre los mejores y más selectos productos para el consumo de nuestros clientes',
        14,
        18
      );
      doc.text('Venta de frutas y verduras al por mayor', 14, 21);

      // Encabezado derecho (borde de color rojo)
      doc.setDrawColor('red');
      doc.rect(pageWidth - 58, 3, 50, 18, 'S');
      doc.setTextColor('red');
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('FACTURA ELECTRÓNICA', pageWidth - 56.5, 12);
      doc.text('Folio N° ' + facturaData.numero_factura, pageWidth - 35, 16);

      // Datos de la boleta
      doc.setDrawColor('black');
      doc.setFillColor('white'); // Fondo blanco
      doc.setLineWidth(0.1);
      doc.rect(14, 38, pageWidth - 28, 25, 'FD'); // Rectángulo con fondo blanco
      doc.setTextColor('black'); // Texto en negro
      doc.setFontSize(10); // Tamaño de fuente para datos

      doc.text(
        'Vendedor: ' +
          facturaData.pedido.usuario[0].nombre_usuario +
          ' ' +
          facturaData.pedido.usuario[0].apellido,
        16,
        45
      );
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
      console.log('Datos de factura: ', facturaData);

      // Detalles de la boleta
      doc.setFillColor('white'); // Fondo blanco
      //doc.rect(14, 100, pageWidth - 40, 80, 'FD'); // Rectángulo con fondo blanco
      autoTable(doc, {
        startY: 85,
        head: [
          [
            'Código Barras',
            'Nombre Producto',
            'Precio',
            'Cantidad',
            'Subtotal',
          ],
        ],
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
      doc.setFontSize(10); // Tamaño de fuente para totales
      doc.text('Neto: $' + facturaData.neto, pageWidth - 68, 214);
      doc.text('IVA (19%): $' + facturaData.iva, pageWidth - 68, 220);
      doc.setFontSize(14);
      doc.text('TOTAL: $' + facturaData.total, pageWidth - 68, 227);

      //Pie de página
      doc.setFontSize(7);
      doc.text('CEDIBLE', pageWidth - 120, pageHeight - 5);

      doc.save(
        'Factura ' + 'BioPal ' + 'N°' + facturaData.numero_factura + '.pdf'
      );
    });
  }
  emitirDteFactura(id: string) {
    this.facturaService.buscarFacturaID(id).subscribe((data) => {
      this.factura = data.factura;
      console.log(this.factura);

      var detalles: any = [];
      this.factura.productos.map((detalle: any) => {
        detalles.push({
          NmbItem: detalle.nombre_producto,
          QtyItem: detalle.cantidad,
          PrcItem: detalle.precio,
        });
      });

      let dte = {
        Encabezado: {
          IdDoc: {
            TipoDTE: 33,
            Folio: this.factura.numero_factura,
          },
          Emisor: {
            RUTEmisor: '76.226.932-5',
            RznSoc:
              'Comercializadora De Productos De Rotiseria Abarrotes Frutas Y Verduras Bio Pal',
            GiroEmis: 'MAYORISTA DE FRUTAS Y VERDURAS',
            Acteco: '463011',
            DirOrigen: 'Concepción',
            CmnaOrigen: 'Concepción',
          },
          Receptor: {
            RUTRecep: this.factura.pedido.cliente[0].rut,
            RznSocRecep: this.factura.pedido.cliente[0].nombre_cliente,
            GiroRecep: this.factura.pedido.cliente[0].giroemis,
            DirRecep: this.factura.pedido.cliente[0].direccion,
            CmnaRecep: this.factura.pedido.cliente[0].comuna,
          },
        },

        Detalle: detalles,

        resolucion: {
          fecha: this.factura.fecha_emision,
          numero: this.factura.numero_factura,
        },
        caf: '',
      };


      console.log(dte);
      //Calcular total de items
      /*let totalItems = this.factura.productos.filter((item:any) => item.cantidad > 0).reduce((a:any, b:any) => a + b.cantidad, 0);
      console.log(totalItems);
      */
      this.dteService.emitirFacturaDTE(dte).subscribe((date)=>{
        Swal.fire({ icon: 'success', text: 'JSON enviado exitosamente' });
       },
       (err)=>{ Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al enviar JSON',
        footer: err,
      });
      })

      })
    }

}
