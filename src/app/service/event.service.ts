import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAPIResponse, IEvent, User } from '../model/model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  apiUrl: string = 'https://freeapi.miniprojectideas.com/api/EventBooking/';

  constructor(private http: HttpClient ) { }

  getAllEvents(){
    return this.http.get<IAPIResponse>(`${this.apiUrl}GetAllEvents`); // Replace with your API endpoint
  }

  getEventById(eventId: number){
    return this.http.get<IEvent>(`${this.apiUrl}GetEventById?id=${eventId}`).pipe(
      map((item: any) =>{ 
        return item.data;
      })
    )
  }

  getEventByOraganizer(organizerId: number){
    return this.http.get<IEvent>(`${this.apiUrl}GetEventsByOrganizer?organizerId=${organizerId}`).pipe(
      map((item: any) =>{ 
        return item.data;
      })
    )
  }
  registerUser(obj:User){
    return this.http.post<IAPIResponse>(`${this.apiUrl}CreateUser`, obj);
  }

  loginUser(obj:any){
    return this.http.post<IAPIResponse>(`${this.apiUrl}Login`, obj);
  }

  book(obj:any){
    return this.http.post<IAPIResponse>(`${this.apiUrl}bookevent`, obj);
  }

}


