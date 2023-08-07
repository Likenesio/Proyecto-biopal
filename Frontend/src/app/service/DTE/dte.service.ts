import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DteService {

constructor(private http: HttpClient) { }

apiUrl = environment.apiDTE;

urlenviar = environment.apiDTEEnviar;

makeAuthorizedRequest() {
  const token = environment.tokenDTE; // Aquí debes proporcionar el token adecuado

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

enviarDTE(xml: any): Observable<any> {
return this.http.post<any>(this.urlenviar, xml);

}

}
