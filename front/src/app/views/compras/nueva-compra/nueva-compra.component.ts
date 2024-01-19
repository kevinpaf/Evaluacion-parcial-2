import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ComprasService } from '../../../Services/Compras.service';
import Swal from 'sweetalert2';
import { IClientes } from '../../../Interfaces/iclientes';
import { ClientesService } from '../../../Services/Clientes.service';
@Component({
  selector: 'app-nueva-compra',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nueva-compra.component.html',
  styleUrl: './nueva-compra.component.css',
})
export class NuevaCompraComponent {
  title = '';
  id!: number;
  listaClientes: IClientes[] = [];

  provedor: FormGroup = new FormGroup({
    ID_cliente: new FormControl('', Validators.required),
    ID_producto: new FormControl('', Validators.required),
    Cantidad: new FormControl('', Validators.required),
    Total: new FormControl('', Validators.required),
  });
  constructor(
    private comprasServicio: ComprasService,
    private clientesService: ClientesService,
    private rutas: Router,
    private parametros: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.id = this.parametros.snapshot.params['id'];
    await this.cargaClientes();
    console.log(this.id);
    if (this.id == 0 || this.id == undefined) {
      this.title = 'Nueva Asignatura';
    } else {
      this.title = 'Actualizar Asignatura';
      this.comprasServicio.uno(this.id).subscribe((res) => {
        console.log(res);
        this.provedor.patchValue({
          ID_cliente: res.ID_cliente,
          ID_producto: res.ID_producto,
          Cantidad: res.Cantidad,
          Total: res.Total,
        });
      });
    }
  }
  get f() {
    return this.provedor.controls;
  }

  cargaClientes() {
    this.clientesService.todos().subscribe((res) => {
      this.listaClientes = res;
    });
  }

  grabar() {
    Swal.fire({
      title: 'compras',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.comprasServicio
            .insertar(this.provedor.value)
            .subscribe((res) => {
              Swal.fire({
                title: 'compras',
                text: 'Se insertó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/compras']);
              this.id = 0;
            });
        } else {
          this.comprasServicio
            .actualizar(this.provedor.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'compras',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/compras']);
              this.id = 0;
            });
        }
      } else {
        Swal.fire({
          title: 'compras',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
