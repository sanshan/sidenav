import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SelectAutocompleteComponent} from './mat-select-autocomplete.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  declarations: [SelectAutocompleteComponent],
  exports: [SelectAutocompleteComponent]
})
export class SelectAutocompleteModule {
}
