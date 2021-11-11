import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestDragDropComponent} from './drag-drop/test-drag-drop/test-drag-drop.component'

const routes: Routes =  [
  { 
      path: 'drag', 
      component: TestDragDropComponent, 
      pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
