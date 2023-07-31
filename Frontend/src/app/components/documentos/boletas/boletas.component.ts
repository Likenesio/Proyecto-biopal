import { DatePipe, formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { BoletaService } from 'src/app/service/boleta-service/boleta.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-boletas',
  templateUrl: './boletas.component.html',
  styleUrls: ['./boletas.component.css'],
})
export class BoletasComponent {
  respuesta: any;
  boletasListar: any[] = [];
  listaBoletasAPI: any[] = [];
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe: any;

  visible: boolean = false;

  idSeleccionado: any;

  first = 0;
  rows = 10;

  constructor(private boletaService: BoletaService) {}

  ngOnInit() {
    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd/MM/yyyy');

    this.boletaService.listarBoletas().subscribe((data) => {
      this.respuesta = data;
      this.listaBoletasAPI = this.respuesta.boleta;
      console.log(this.listaBoletasAPI);
    });
  }

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
    return this.listaBoletasAPI
      ? this.first === this.listaBoletasAPI.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.listaBoletasAPI ? this.first === 0 : true;
  }

  generarBoletaPDF(id: string) {
    this.boletaService.buscarBoletaID(id).subscribe(
      (data) => {
        let boletaData = data.boleta;

        console.log("Datos Boleta Dataaa:", boletaData);

        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'letter',
          putOnlyUsedFonts: true,
        });
        /* DETALLES A CONSIDERAR:
        doc.text('Texto a insertar', ubicacion X del documento(en mm), ubicacion Y del documento(en mm)) ->Insertar texto en una posicion

        doc.rect(ubicacion X del documento(en mm), ubicacion Y del documento(en mm),
        ancho del rectangulo(en mm), alto del rectangulo(en mm),
        tipo de borde(S = simple, FD = dashed, F = full)) ->Insertar Rectángulo

        doc.setDrawColor('red') ->Color del borde del rectángulo

        El resto de cosas, revisar documentación de jsPDF
        https://raw.githack.com/MrRio/jsPDF/master/docs/jsPDF.html
        */
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
        doc.text('BOLETA ELECTRÓNICA', pageWidth - 55, 11);
        doc.text('N° ' + boletaData.numero_boleta, pageWidth - 40, 16);

        // Datos de la boleta
        doc.setDrawColor('black');
        doc.setFillColor('white'); // Fondo blanco
        doc.setLineWidth(0.1);
        doc.rect(14, 38, pageWidth - 28, 25, 'FD');
        doc.setTextColor('black'); // Texto en negro
        doc.setFontSize(10); // Tamaño de fuente para datos

        doc.text('Cliente: ' + boletaData.pedido.cliente[0].nombre_cliente, 16, 45);
        doc.text(
          'Fecha de Venta: ' +
            formatDate(
              new Date(boletaData.fecha_emision),
              'dd/MM/yyyy',
              'en-US'
            ),
          16,
          50
        );
        doc.text('Medio de Pago: ' + boletaData.pedido.modo_pago, 16, 55);

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
          body: boletaData.productos.map((detalle: any) => [
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
        doc.text('Neto: $' + boletaData.neto, pageWidth - 68, 214);
        doc.text('IVA (19%): $' + boletaData.iva, pageWidth - 68, 220);
        doc.setFontSize(14);//Agrandar más el tamaño de la letra para el total
        doc.text('TOTAL: $' + boletaData.total, pageWidth - 68, 227);

        //Pie de página
        doc.setFontSize(7);//Texto en tamaño 7
        doc.text('Copia cliente', pageWidth - 120, pageHeight - 5);

        //Página 2 COPIA EMPRESA
        doc.addPage();

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
        doc.text('BOLETA ELECTRÓNICA', pageWidth - 55, 11);
        doc.text('N° ' + boletaData.numero_boleta, pageWidth - 40, 16);

        // Datos de la boleta
        doc.setDrawColor('black');
        doc.setFillColor('white'); // Fondo blanco
        doc.setLineWidth(0.1);
        doc.rect(14, 38, pageWidth - 28, 25, 'FD'); // Rectángulo con fondo blanco
        doc.setTextColor('black'); // Texto en negro
        doc.setFontSize(10); // Tamaño de fuente para datos

        doc.text('Cliente: ' + boletaData.pedido.cliente[0].nombre_cliente, 16, 45);
        doc.text(
          'Fecha de Venta: ' +
            formatDate(
              new Date(boletaData.fecha_emision),
              'dd/MM/yyyy',
              'en-US'
            ),
          16,
          50
        );
        doc.text('Medio de Pago: ' + boletaData.pedido.modo_pago, 16, 55);
        console.log("Datos de boleta: ", boletaData);

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
          body: boletaData.productos.map((detalle: any) => [
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
        doc.text('Neto: $' + boletaData.neto, pageWidth - 68, 214);
        doc.text('IVA (19%): $' + boletaData.iva, pageWidth - 68, 220);
        doc.setFontSize(14);
        doc.text('TOTAL: $' + boletaData.total, pageWidth - 68, 227);

        //Pie de página
        doc.setFontSize(7);
        doc.text('Copia empresa', pageWidth - 120, pageHeight - 5);

        // Guardar el PDF con un nombre específico
        doc.save('boleta' + boletaData.numero_boleta + '.pdf');
      },
      (err) => {
        alert('Error al generar boleta');
      }
    );
  }
}
