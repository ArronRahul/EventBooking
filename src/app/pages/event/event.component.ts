import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../service/event.service';
import { Observable } from 'rxjs';
import { IEvent } from '../../model/model';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-event',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css'
})
export class EventComponent {

  activatedRoute = inject(ActivatedRoute);
  
  eventService= inject(EventService);

  eventData$ :Observable<IEvent> = new Observable<IEvent>;

  constructor(){
    this.activatedRoute.params.subscribe((res:any) => {
      this.eventData$ = this.eventService.getEventById(res.id);
    })
  }

}
