
import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatListModule,
  MatGridListModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatSnackBarModule,
} from '@angular/material';

const modules = [
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatGridListModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatSnackBarModule
];

@NgModule({
  imports: modules,
  exports: modules
})

export class MaterialModule {}
