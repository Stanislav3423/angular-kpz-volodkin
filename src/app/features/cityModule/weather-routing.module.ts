import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './components/cities/cities.component';
import { RegionComponent } from './components/regions/regions.component';
import { ObservationComponent } from './components/observations/observations.component';

const routes: Routes = [
  { path: '', component: CityComponent },
  { path: 'regions', component: RegionComponent },
  { path: 'observations', component: ObservationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule {}