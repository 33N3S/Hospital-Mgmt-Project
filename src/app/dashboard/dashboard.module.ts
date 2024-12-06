import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from '../materials/materials.module';
import { MatPaginatorModule,MatPaginator } from '@angular/material/paginator';
@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    MaterialsModule,
    MatPaginatorModule
  ]
})
export class DashboardModule { }
