import { Component, OnInit } from '@angular/core';
import { CityService } from '../../services/city.service';
import { City } from '../../interfaces/City';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss'],
})
export class CityComponent implements OnInit {
  isModalOpen = false;
  isEditing = false;
  cities: City[] = [];
  selectedCity: City | null = null;

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.fetchCities();
  }

  fetchCities(): void {
    this.cityService.getCities().subscribe((data) => {
      this.cities = data;
    });
  }

  onOpenModal(city: City | null) {
    this.isEditing = city !== null;
    this.selectedCity = city || { id: 0, name: '', latitude: 0, longitude: 0, regionId: 0 };
    this.isModalOpen = true;
  }

  onCloseModal() {
    this.isModalOpen = false;
    this.selectedCity = null;
  }

  onSaveCity(savedCity: City) {
    if (!savedCity || !savedCity.id) {
      console.error('Invalid city data:', savedCity);
      return;
  }
    if (this.isEditing) {
      const index = this.cities.findIndex((city) => city.id === savedCity.id);
      if (index > -1) {
        this.cities[index] = savedCity;
      }
    } else {
      this.cities.push(savedCity);
    }
    this.onCloseModal();
  }

  onDeleteCity(id: number) {
    if (confirm('Are you sure you want to delete this city?')) {
      this.cityService.deleteCity(id).subscribe({
        next: () => {
          console.log(`City with ID ${id} deleted successfully`);
          this.cities = this.cities.filter((city) => city.id !== id); // Оновлення списку
        },
        error: (err) => {
          console.error(`Error deleting city with ID ${id}:`, err);
        },
      });
    }
  }
}
