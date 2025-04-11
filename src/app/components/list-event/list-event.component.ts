import { Component, OnInit } from '@angular/core';
import { EvenementService } from '../../services/evenement.service';
import { Evenement } from 'src/app/models/evenement';


@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
})
export class ListEventComponent implements OnInit {
  events: Evenement[] = [];
  filteredEvents: Evenement[] = [];
  search: string = '';

  constructor(private eventService: EvenementService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
      this.filteredEvents = data;
    });
  }

  deleteEvent(id: number, disponible: boolean) {
    if (!disponible) {
      this.eventService.deleteEvent(id).subscribe(() => {
        this.loadEvents();
      });
    }
  }

  searchEvents() {
    const term = this.search.toLowerCase();
    this.filteredEvents = this.events.filter(e =>
      e.lieu.toLowerCase().includes(term) || e.date.includes(term)
    );
  }

  countAvailableEvents(): number {
    return this.events.filter(e => e.disponible).length;
  }
}
