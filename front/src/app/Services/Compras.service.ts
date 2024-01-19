import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICompras } from '../Interfaces/icompras';

@Injectable({
  providedIn: 'root',
})
export class ComprasService {
  private urlBase: string = environment.URL + 'Compras.Controller.php?op=';
  constructor(private clientePhp: HttpClient) {}

  todos(): Observable<ICompras[]> {
    return this.clientePhp.get<ICompras[]>(this.urlBase + 'todos');
  }
  insertar(compra: ICompras): Observable<any> {
    var co = new FormData();
    co.append('ID_cliente', compra.ID_cliente.toString());
    co.append('ID_producto', compra.ID_producto.toString());
    co.append('Cantidad', compra.Cantidad.toString());
    co.append('Total', compra.Total.toString());
    return this.clientePhp.post(this.urlBase + 'insertar', co);
  }
  eliminar(id: number): Observable<any> {
    var co = new FormData();
    co.append('ID_compra', id.toString());
    return this.clientePhp.post(this.urlBase + 'eliminar', co);
  }
  uno(id: number): Observable<ICompras> {
    var co = new FormData();
    co.append('ID_compra', id.toString());
    return this.clientePhp.post<ICompras>(this.urlBase + 'uno', co);
  }
  actualizar(compra: ICompras, id: number): Observable<any> {
    var co = new FormData();
    co.append('ID_compra', id.toString());
    co.append('ID_cliente', compra.ID_cliente.toString());
    co.append('ID_producto', compra.ID_producto.toString());
    co.append('Cantidad', compra.Cantidad.toString());
    co.append('Total', compra.Total.toString());
    return this.clientePhp.post(this.urlBase + 'actualizar', co);
  }
}
