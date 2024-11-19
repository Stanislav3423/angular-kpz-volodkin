import { Component, OnInit } from '@angular/core';
import { RegionService } from '../../services/region.service';
import { Region } from '../../interfaces/Region';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.scss'],
})
export class RegionComponent implements OnInit {
  isModalOpen = false;
  isEditing = false;
  regions: Region[] = [];
  selectedRegion: Region | null = null;

  constructor(private regionService: RegionService) {}

  ngOnInit(): void {
    this.fetchRegions();
  }

  fetchRegions(): void {
    this.regionService.getRegions().subscribe((data) => {
      this.regions = data;
    });
  }

  onOpenModal(region: Region | null) {
    this.isEditing = region !== null;
    this.selectedRegion = region || { id: 0, name: '', country: ''};
    this.isModalOpen = true;
  }

  onCloseModal() {
    this.isModalOpen = false;
    this.selectedRegion = null;
  }

  onSaveRegion(savedRegion: Region) {
    if (!savedRegion || !savedRegion.id) {
      console.error('Invalid Region data:', savedRegion);
      return;
  }
    if (this.isEditing) {
      const index = this.regions.findIndex((region) => region.id === savedRegion.id);
      if (index > -1) {
        this.regions[index] = savedRegion;
      }
    } else {
      this.regions.push(savedRegion);
    }
    this.onCloseModal();
  }

  onDeleteRegion(id: number) {
    if (confirm('Are you sure you want to delete this region?')) {
      this.regionService.deleteRegion(id).subscribe({
        next: () => {
          console.log(`Region with ID ${id} deleted successfully`);
          this.regions = this.regions.filter((region) => region.id !== id);
        },
        error: (err) => {
          console.error(`Error deleting Region with ID ${id}:`, err);
        },
      });
    }
  }
}
