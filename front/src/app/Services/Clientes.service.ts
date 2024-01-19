import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IClientes } from '../Interfaces/iclientes';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private urlBase: string = environment.URL + 'Clientes.Controller.php?op=';
  constructor(private clientePhp: HttpClient) {}
  todos(): Observable<IClientes[]> {
    return this.clientePhp.get<IClientes[]>(this.urlBase + 'todos');
  }

  uno(id: number): Observable<IClientes> {
    var cli = new FormData();
    cli.append('ID_cliente', id.toString());
    return this.clientePhp.post<IClientes>(this.urlBase + 'uno', cli);
  }

  insertar(cliente: IClientes): Observable<any> {
    var cli = new FormData();
    cli.append('Nombre', cliente.Nombre);
    cli.append('Direccion', cliente.Direccion);
    cli.append('Telefono', cliente.Telefono.toString());
    return this.clientePhp.post(this.urlBase + 'insertar', cli);
  }

  actualizar(cliente: IClientes, id: number): Observable<any> {
    var cli = new FormData();
    cli.append('ID_cliente', id.toString());
    cli.append('Nombre', cliente.Nombre);
    cli.append('Direccion', cliente.Direccion);
    cli.append('Telefono', cliente.Telefono);
    return this.clientePhp.post(this.urlBase + 'actualizar', cli);
  }

  eliminar(id: number): Observable<any> {
    var cli = new FormData();
    cli.append('ID_cliente', id.toString());
    return this.clientePhp.post(this.urlBase + 'eliminar', cli);
  }
}
