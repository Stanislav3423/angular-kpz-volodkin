import { Component, OnInit } from '@angular/core';
import { ObservationService } from '../../services/observation.service';
import { Observation } from '../../interfaces/Observation';

@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss'],
})
export class ObservationComponent implements OnInit {
  isModalOpen = false;
  isEditing = false;
  observations: Observation[] = [];
  selectedObservation: Observation | null = null;

  constructor(private observationService: ObservationService) {}

  ngOnInit(): void {
    this.fetchObservations();
  }

  fetchObservations(): void {
    this.observationService.getObservations().subscribe((data) => {
      this.observations = data;
    });
  }

  onOpenModal(observation: Observation | null) {
    this.isEditing = observation !== null;
    this.selectedObservation = observation || { id: 0, stationId: 0, temperature: 0, humidity: 0, windSpeed: 0, precipitation: 0};
    this.isModalOpen = true;
  }

  onCloseModal() {
    this.isModalOpen = false;
    this.selectedObservation = null;
  }

  onSaveObservation(savedObservation: Observation) {
    if (!savedObservation || !savedObservation.id) {
      console.error('Invalid Observation data:', savedObservation);
      return;
  }
    if (this.isEditing) {
      const index = this.observations.findIndex((observation) => observation.id === savedObservation.id);
      if (index > -1) {
        this.observations[index] = savedObservation;
      }
    } else {
      this.observations.push(savedObservation);
    }
    this.onCloseModal();
  }

  onDeleteObservation(id: number) {
    if (confirm('Are you sure you want to delete this observation?')) {
      this.observationService.deleteObservation(id).subscribe({
        next: () => {
          console.log(`Observation with ID ${id} deleted successfully`);
          this.observations = this.observations.filter((observation) => observation.id !== id);
        },
        error: (err) => {
          console.error(`Error deleting observation with ID ${id}:`, err);
        },
      });
    }
  }
}
