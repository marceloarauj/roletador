import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SorteioComponent} from '../app/sorteio/sorteio.component';

const routes: Routes = [{path:'',component:SorteioComponent},
                        {path:'**',redirectTo:''}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
