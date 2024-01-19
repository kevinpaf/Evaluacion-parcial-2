import { Component } from '@angular/core';
import { ICompras } from '../../Interfaces/icompras';
import { ComprasService } from '../../Services/Compras.service';
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css',
})
export class ComprasComponent {
  title = 'Compras';
  compras: ICompras[] = [];

  constructor(private compraservice: ComprasService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.compraservice.todos().subscribe((listacompras) => {
      this.compras = listacompras;
      console.log(listacompras);
    });
  }
  alerta() {
    Swal.fire('compras', 'Mensaje en compras', 'success');
  }

  eliminar(ID_cuenta: number) {
    Swal.fire({
      title: 'compras',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.compraservice.eliminar(ID_cuenta).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'compras',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
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
