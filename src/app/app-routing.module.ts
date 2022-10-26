import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateComponent } from './generate/generate.component';
import { ListComponent } from './list/list.component';
import { GraphComponent } from './graph/graph.component';

const routes: Routes = [
  { path: 'generate', component: GenerateComponent },
  { path: 'list', component: ListComponent },
  { path: 'graph', component: GraphComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
