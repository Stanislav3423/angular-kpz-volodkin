import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherRoutingModule } from './weather-routing.module';  // Імпорт маршрутизації
import { HighlightDirective } from 'src/app/shared/directives/highlight.directive';
import { CityComponent } from './components/cities/cities.component';
import { CitiesModalComponent } from './components/cities/cities-modal/cities-modal.component';
import { RegionComponent } from './components/regions/regions.component';
import { RegionsModalComponent } from './components/regions/regions-modal/regions-modal.component';
import { ObservationComponent } from './components/observations/observations.component';
import { ObservationsModalComponent } from './components/observations/observations-modal/observations-modal.component';

@NgModule({
  declarations: [
    CityComponent,
    RegionComponent,
    CitiesModalComponent,
    RegionsModalComponent,
    ObservationsModalComponent,
    ObservationComponent,
    HighlightDirective,
  ],
  imports: [CommonModule, FormsModule, WeatherRoutingModule],  // Імпорт CitiesRoutingModule
})
export class WeatherModule {}