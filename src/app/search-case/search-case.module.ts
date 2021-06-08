import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {MatStepperModule} from '@angular/material/stepper';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { IonicContextMenuModule } from 'ionic-context-menu';

import { SearchCasePage } from './search-case.page';


const routes: Routes = [
  {
    path: '',
    component: SearchCasePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatStepperModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    IonicContextMenuModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchCasePage]
})
export class SearchCasePageModule {}
