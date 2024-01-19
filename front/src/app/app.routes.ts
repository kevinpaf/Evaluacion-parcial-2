import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { clientesComponent } from './views/clientes/clientes.component';
import { NuevoClienteComponent } from './views/clientes/nuevo-cliente/nuevo-cliente.component';
import { ComprasComponent } from './views/compras/compras.component';
import { NuevaCompraComponent } from './views/compras/nueva-compra/nueva-compra.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clientes', component: clientesComponent },
  { path: 'nuevo-cliente', component: NuevoClienteComponent },
  { path: 'editar-cliente/:id', component: NuevoClienteComponent },
  { path: 'compras', component: ComprasComponent },
  { path: 'nueva-compra', component: NuevaCompraComponent },
  { path: 'editar-compra/:id', component: NuevaCompraComponent },
  { path: '**', component: PageNotFoundComponentComponent },
];
