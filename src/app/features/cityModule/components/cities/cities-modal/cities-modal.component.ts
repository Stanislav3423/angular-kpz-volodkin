import { Component, EventEmitter,Input, Output } from '@angular/core';
import { City } from '../../../interfaces/City';
import { CityService } from '../../../services/city.service';

@Component({
  selector: 'app-cities-modal',
  templateUrl: './cities-modal.component.html',
  styleUrls: ['./cities-modal.component.scss'],
})
export class CitiesModalComponent {
  @Input() city: City = { id: 0, name: '', latitude: 0, longitude: 0, regionId: 0 };
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveCity = new EventEmitter<City>();

  constructor(private cityService: CityService) {}

  onClose() {
    this.closeModal.emit();
  }

  onSave() {
    if (this.city.id) {
      this.cityService.updateCity(this.city).subscribe({
        next: (response) => {
          console.log('City updated successfully:', response);
          this.saveCity.emit(response);
          this.onClose();
        },
        error: (err) => {
          console.error('Error updating city:', err);
        },
      });
    } else {
      this.cityService.addCity(this.city).subscribe({
        next: (response) => {
          console.log('City added successfully:', response);
          this.saveCity.emit(response);
          this.onClose();
        },
        error: (err) => {
          console.error('Error adding city:', err);
        },
      });
    }
  }
}
