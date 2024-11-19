import { Component, EventEmitter,Input, Output } from '@angular/core';
import { Region } from '../../../interfaces/Region';
import { RegionService } from '../../../services/region.service';

@Component({
  selector: 'app-regions-modal',
  templateUrl: './regions-modal.component.html',
  styleUrls: ['./regions-modal.component.scss'],
})
export class RegionsModalComponent {
  @Input() region: Region = { id: 0, name: '', country: ''};
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveRegion = new EventEmitter<Region>();

  constructor(private regionService: RegionService) {}

  onClose() {
    this.closeModal.emit();
  }

  onSave() {
    if (this.region.id) {
      this.regionService.updateRegion(this.region).subscribe({
        next: (response) => {
          console.log('Region updated successfully:', response);
          this.saveRegion.emit(response);
          this.onClose();
        },
        error: (err) => {
          console.error('Error updating region:', err);
        },
      });
    } else {
      this.regionService.addRegion(this.region).subscribe({
        next: (response) => {
          console.log('Region added successfully:', response);
          this.saveRegion.emit(response);
          this.onClose();
        },
        error: (err) => {
          console.error('Error adding region:', err);
        },
      });
    }
  }
}
