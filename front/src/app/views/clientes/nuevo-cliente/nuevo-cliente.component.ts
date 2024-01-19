import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientesService } from '../../../Services/Clientes.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nuevo-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nuevo-cliente.component.html',
  styleUrl: './nuevo-cliente.component.css',
})
export class NuevoClienteComponent {
  title = '';
  id!: number;

  provedor: FormGroup = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Direccion: new FormControl('', Validators.required),
    Telefono: new FormControl('', Validators.required),
  });
  constructor(
    private clienteServicio: ClientesService,
    private rutas: Router,
    private parametros: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.parametros.snapshot.params['id'];
    console.log(this.id);
    if (this.id == 0 || this.id == undefined) {
      this.title = 'Nuevo cliente';
    } else {
      this.title = 'Actualizar cliente';
      this.clienteServicio.uno(this.id).subscribe((res) => {
        console.log(res);
        this.provedor.patchValue({
          Nombre: res.Nombre,
          Direccion: res.Direccion,
          Telefono: res.Telefono,
        });
      });
    }
  }
  get f() {
    return this.provedor.controls;
  }

  grabar() {
    Swal.fire({
      title: 'clientes',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.clienteServicio
            .insertar(this.provedor.value)
            .subscribe((res) => {
              Swal.fire({
                title: 'clientes',
                text: 'Se insertó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/clientes']);
              this.id = 0;
            });
        } else {
          this.clienteServicio
            .actualizar(this.provedor.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'clientes',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/clientes']);
              this.id = 0;
            });
        }
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
