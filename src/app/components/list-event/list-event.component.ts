import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Evenement } from 'src/app/models/evenement';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html'
})
export class ListEventComponent implements OnInit {
  events: Evenement[] = [];
  filteredEvents: Evenement[] = [];
  search = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.http.get<Evenement[]>('http://localhost:3000/events').subscribe(data => {
      this.events = data;
      this.filteredEvents = [...this.events];
    });
  }

  deleteEvent(id: number, disponible: boolean) {
    if (!disponible) {
      this.http.delete(`http://localhost:3000/events/${id}`).subscribe(() => this.loadEvents());
    }
  }

  searchEvents() {
    this.filteredEvents = this.events.filter(event =>
      event.lieu.toLowerCase().includes(this.search.toLowerCase()) ||
      event.date.includes(this.search)
    );
  }

  countAvailableEvents() {
    return alert(this.events.filter(e => e.disponible).length);
  }
}
