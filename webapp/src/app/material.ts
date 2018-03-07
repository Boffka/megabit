import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule, MatDividerModule,
  MatInputModule,
  MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    CdkTableModule,
    MatTableModule,
    MatSortModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ]
})
export class MyMaterial {
}
