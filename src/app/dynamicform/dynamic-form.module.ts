import { NgModule } from '@angular/core';

import { ControlsService } from './controls.service';
import { DynamicControlsService } from './dynamic-controls.service';
import { DynamicFormComponent } from './dynamic-form.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [IonicModule,ReactiveFormsModule,CommonModule ],
  providers: [DynamicControlsService, ControlsService],
  declarations: [DynamicFormComponent],
  exports: [DynamicFormComponent]
})
export class DynamicFormModule {

}