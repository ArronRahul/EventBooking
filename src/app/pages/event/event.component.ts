import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventService } from '../../service/event.service';
import { Observable, switchMap } from 'rxjs';
import { IAPIResponse, IEvent, User } from '../../model/model';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event',
  imports: [AsyncPipe, CommonModule, RouterLink,FormsModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {

  @ViewChild('modal') model: ElementRef | undefined;

  eventData$: Observable<IEvent>;
  events$: Observable<IEvent[]>;

  members: any = {
    "Name": "",
    "Age": 0,
    "IdentityCard": "",
    "CardNo": "",
    "ContactNo": ""
  }

  bookingObj: any = {
    "BookingId": 0,
    "UserId": "string",
    "EventId": 0,
    "NoOfTickes": 0,
    "EventBookingmembers":[]
  }
    
  userObj: any = new User();


  constructor(private activatedRoute: ActivatedRoute, private eventService: EventService) {
      const loggedData= localStorage.getItem('eventUser');
      if(loggedData != null){
        this.userObj = JSON.parse(loggedData);
      }
    
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

  addMember(){
    const newObj = JSON.stringify(this.members);
    const obj = JSON.parse(newObj);
    this.bookingObj.EventBookingmembers.push(obj);
    console.log(this.bookingObj);
    this.members = {
      "Name": "",
      "Age": 0, 
      "IdentityCard": "",
      "CardNo": "",
      "ContactNo": ""
    }
  }

  onBooking(){
    console.log(this.bookingObj);
    debugger;
    this.bookingObj.NoOfTickes = this.bookingObj.EventBookingmembers.length;
    this.eventService.book(this.bookingObj).subscribe((res : IAPIResponse) => {
      if(res.result){
        alert("Ticket Booked Successfully");
        this.closeBookingModal();
      }
      else{
        alert("Failed to book ticket");
      }
    });
  }
    
}

