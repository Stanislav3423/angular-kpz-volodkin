import { Component, EventEmitter,Input, Output } from '@angular/core';
import { Observation } from '../../../interfaces/Observation';
import { ObservationService } from '../../../services/observation.service';

@Component({
  selector: 'app-observations-modal',
  templateUrl: './observations-modal.component.html',
  styleUrls: ['./observations-modal.component.scss'],
})
export class ObservationsModalComponent {
  @Input() observation: Observation = { id: 0, stationId: 0, temperature: 0, humidity: 0, windSpeed: 0, precipitation: 0 };
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveObservation = new EventEmitter<Observation>();

  constructor(private observationService: ObservationService) {}

  onClose() {
    this.closeModal.emit();
  }

  onSave() {
    if (this.observation.id) {
      this.observationService.updateObservation(this.observation).subscribe({
        next: (response) => {
          console.log('Observation updated successfully:', response);
          this.saveObservation.emit(response);
          this.onClose();
        },
        error: (err) => {
          console.error('Error updating Observation:', err);
        },
      });
    } else {
      this.observationService.addObservation(this.observation).subscribe({
        next: (response) => {
          console.log('Observation added successfully:', response);
          this.saveObservation.emit(response);
          this.onClose();
        },
        error: (err) => {
          console.error('Error adding Observation:', err);
        },
      });
    }
  }
}
