import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DteService {

constructor(private http: HttpClient) { }

apiUrl = 'https://apigateway.cl/api/v1/libredte/dte/documentos/generar?normalizar=1&formato=json&enviar_sii=0&gzip=0&retry=1';

makeAuthorizedRequest() {
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiM2ZhMjZmYjdjN2NmMjEzZDFmYzg4ZjFlOWUwNmY1NDQyZmQyZGMyZmZlN2U0MGYyMGQ0ZjYxODhiMzg0ZTllMTYxNmQ5ZGUxMjk3ODJkOTMiLCJpYXQiOjE2OTA5NDk1NDEsIm5iZiI6MTY5MDk0OTU0MSwiZXhwIjo0ODQ2NjIzMTQxLCJzdWIiOiIxNTI2Iiwic2NvcGVzIjpbXX0.JW8VJY3cR8-KmVTPcPDRoAZ8JJKFuGM8shIrKcoPOkCcTNnUEgFUdJjwzOM1Goj7UW69g45Sc2uhVbbMaymyM36QeAwe2NZgc2giHvPMhpEzz54Q0FLGruDi-MUHdrQx9augqzNN21GB1fDpAYLshcNcNK7gJp_7Xn__BvJOr8NqltmvuHEd9BFhSDw8aekMR4xClSf9m6Zt1VerRrSREMYzuNOHtO4ksk1rCB-sOfHFflH5LHPCSK9midkpiByoPMjLA9SXD0Q-j60e4Hu4fDH0H9GSy8iDkCq9VVNUaN3y0gEftJQJBY1lcER3XTIUckQIde-n2sLLwZnaHR8q_N777PtJ-SH2QRwq3-iVBWR1Y0uixaAr8i4oYF_GNrsgfWignWdxj0_NYSb6HEnp7yMH4cWt2ytrv1_k62RonsAhirWC9WLE1ANLhE3i3hTO0zHtAQd8nJeBh7aMfwA2MXlhjvlZIrFGOB5wPD2mtNdEtSJVvS7RcCR0vhXSRdEgJLMvIj-oe4IJ_sXpcVRKnKsY1zoYbcGPkscbjEaeWRojZ48-D5jNC_xw4piJHCFyEqVNfWcbt0AQMC3YPLJeE3usfKqfBtwa7bHknT8eL0Lo6gMcgPgSumfHBEkQyp6vDsh0vH2znYTjNiUWEEGForwanXH4KpWrSrGLQzyax_M'; // Aquí debes proporcionar el token adecuado

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  // Realiza la solicitud HTTP con el encabezado de autorización
  this.http.get('https://apigateway.cl', { headers }).subscribe(
    (response) => {
      console.log(response);
    },
    (error) => {
      console.error(error);
    }
  );
}

emitirFacturaDTE(dte: any): Observable<any> {
return this.http.post<any>(this.apiUrl, dte);
}
}
