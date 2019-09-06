import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodigoPage } from './codigo';

@NgModule({
  declarations: [
    CodigoPage,
  ],
  imports: [
    IonicPageModule.forChild(CodigoPage),
  ],
})
export class CodigoPageModule {}
