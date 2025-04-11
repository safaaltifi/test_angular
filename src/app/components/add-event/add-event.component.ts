import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
})
export class AddEventComponent {
  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      lieu: [''],
      date: [''],
      disponible: [false],
      nbrMax: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      this.http.post('http://localhost:3000/events', this.eventForm.value).subscribe(() => {
        this.router.navigate(['/list-event']);
      });
    }
  }
}
