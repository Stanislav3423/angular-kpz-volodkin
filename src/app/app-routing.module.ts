import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/cities', pathMatch: 'full' },
  {
    path: 'cities',
    loadChildren: () =>
      import('./features/cityModule/weather.module').then((m) => m.WeatherModule),
  },
  {
    path: 'regions',
    loadChildren: () =>
      import('./features/cityModule/weather.module').then((m) => m.WeatherModule),
  },
  {
    path: 'observations',
    loadChildren: () =>
      import('./features/cityModule/weather.module').then((m) => m.WeatherModule),
  },
  { path: '**', redirectTo: '/cities' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}