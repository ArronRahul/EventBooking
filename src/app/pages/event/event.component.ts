import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../../service/event.service';
import { Observable, switchMap } from 'rxjs';
import { IEvent } from '../../model/model';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-event',
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {

  @ViewChild('modal') model: ElementRef | undefined;

  eventData$: Observable<IEvent>;
  events$: Observable<IEvent[]>;

  constructor(private activatedRoute: ActivatedRoute, private eventService: EventService) {
    // Use switchMap to chain observables
    this.eventData$ = this.activatedRoute.params.pipe(
      switchMap(params => this.eventService.getEventById(params['id']))
    );

    // Fetch related events based on organizerId from eventData$
    this.events$ = this.eventData$.pipe(
      switchMap(event => this.eventService.getEventByOraganizer(event.organizerId))
    );
  }

  openBookingModal(): void {
    console.log('Booking button clicked'); // Debug log
    if (this.model) {
      this.model.nativeElement.style.display = 'block';
    } else {
      console.warn('Model element is not available');
    }
  }

  closeBookingModal(){
    if (this.model) {
      this.model.nativeElement.style.display = 'none'; // Hide the modal
    } else {
      console.warn('Model element is not available');
    }
  }
    
}

