import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IClientes } from '../../Interfaces/iclientes';
import { ClientesService } from '../../Services/Clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class clientesComponent {
  title = 'Clientes';
  clientes: IClientes[];

  constructor(private clienteService: ClientesService) {}

  ngOnInit() {
    this.cargaClientes();
  }

  cargaClientes() {
    this.clienteService.todos().subscribe((listaclientes) => {
      this.clientes = listaclientes;
      console.log(listaclientes);
    });
  }

  alerta() {
    Swal.fire('clientes', 'Mensaje en clientes', 'success');
  }

  eliminar(ID_cliente: number) {
    Swal.fire({
      title: 'clientes',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.eliminar(ID_cliente).subscribe((datos) => {
          this.cargaClientes();
          Swal.fire({
            title: 'clientes',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
      } else {
        Swal.fire({
          title: 'clientes',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
