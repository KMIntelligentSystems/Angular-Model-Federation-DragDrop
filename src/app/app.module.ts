import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestDragDropComponent } from './drag-drop/test-drag-drop/test-drag-drop.component';
import { DragDrop } from './drag-drop/drag-drop';
import { CdkDropList } from './drop-list.directive';
import { CdkDrag } from './drag.directive';
import { CdkDragHandle } from './drag-handle.directive';
import { CdkDropListGroup } from './drop-list-group.directive';
import { CdkDragPlaceholder } from './drag-placeholder.directive';
import { CdkDragPreview } from './drag-preview.directive';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'drag'
  },
  {
    path: 'drag',
    component: TestDragDropComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TestDragDropComponent,
    CdkDropList,
    TestDragDropComponent,
    CdkDrag,
    CdkDropListGroup,
    CdkDragHandle,
     CdkDragPlaceholder,
     CdkDragPreview
  ],
  imports: [
    BrowserModule,
    CdkScrollableModule,
   // AppRoutingModule,
    CommonModule,
  RouterModule.forChild(APP_ROUTES)
  ],
  exports: [ CdkDropList,
    CdkDropListGroup,
    CdkDrag, CdkDragHandle, CdkDragPlaceholder, CdkDragPreview],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
