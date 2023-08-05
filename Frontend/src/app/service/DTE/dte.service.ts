import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DteService {

constructor(private http: HttpClient) { }

apiUrl = 'https://apigateway.cl/api/v1/libredte/dte/documentos/generar?normalizar=1&formato=json&enviar_sii=0&gzip=0&retry=1';

urlenviar = 'https://apigateway.cl/api/v1/libredte/dte/envios/enviar?certificacion=0&gzip=0&retry=1'

makeAuthorizedRequest() {
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiY2ZmYjE1MDMzOGIzY2VmYmIyYjNhODg0ZjU4ZGRlYjYzNjIzNGMwMzA2NTM0ZDRmYjRjOGUxZWRjN2VmMzk5MzhmY2RhMWM4MmY2M2JlM2IiLCJpYXQiOjE2OTEyMDM3NDksIm5iZiI6MTY5MTIwMzc0OSwiZXhwIjo0ODQ2ODc3MzQ5LCJzdWIiOiIxNTQ1Iiwic2NvcGVzIjpbXX0.cyVeJFYTmcBfGYfin7dXoViFXlZ57OQ_BrJnbzBWdLJUHSwlvhBoxKpgWTB9r9-ByWB1VA4-ZAS1eaX12pSkCm8GgPoZXva-isHUFfnW_zG70M5goPr5b3U_TkXEzA9FwV0H42XUWmtwWjy5wUOGsgW6bjKMuMUZUXvlbDDTACX8aAYY1Tc_KcuLayxP_Re7_ZyiMzgX5HlkoyWHvo5lFEDAaCrVUwm5yM3VQcy1ZoRo1bptmnFoeEjKyjFR6jr8myOO8HpWy4NxhtzxGhE7kYvaZHK6LvU5G9V5-ErRkpsvceHyPWp4kpBpi7xPGT-NAA7aUGEUSmdlXiu_ZcMJXObYLh872zpQDec4jQZ77xl6OB67NWEMphS1aIIURebtoMVH_p7rpcezsJmhpYFlDNKMks6365_FnXgaEzBluipmw9R7KStD_Dq1bQZ5xFT58Qfc4o7jtUHuk0AHUIB65lum9xDWy5x83cQ3W-RbGHvzCpPtaQ8rhetP5Ta1mrIJXiX4OBYe18ErwgUSmsrco1QKdckQTXF-1RnlHPQiHC1DByvq5O0i3hMgaPIUn0ZKyOpbE8DNLMjXk817HNsOW1e4D-MiBfNXepVg7fL_MO-gcu3S84BpanRH4hk7KehY1-1KXABEbrdlpJpASIraQxX6BWTmCoVnzqqvCn4b0is'; // Aquí debes proporcionar el token adecuado

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
