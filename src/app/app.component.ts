import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IAPIResponse, ILogin, User } from './model/model';
import { FormsModule } from '@angular/forms';
import { EventService } from './service/event.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {



  title = 'EventBooking';

  @ViewChild('modal') model: ElementRef | undefined;
  // Correct casing

  eventService = inject(EventService);
  isLoginForm: boolean = false;

  loginObj: ILogin = new ILogin();

  userObj: any = new User();


  constructor() {
    const loggedData= localStorage.getItem('eventUser');
    if(loggedData != null){
      this.userObj = JSON.parse(loggedData);
    }
  }

  openLoginModal(): void {
    console.log('Login button clicked'); // Debug log
    if (this.model) {
      this.model.nativeElement.style.display = 'block';
    } else {
      console.warn('Model element is not available');
    }
  }

  closeLoginModal(){
    if (this.model) {
      this.model.nativeElement.style.display = 'none'; // Hide the modal
    } else {
      console.warn('Model element is not available');
    }
  }

  onRegister(){
    console.log(this.userObj)
    console.log("clicked")
    this.eventService.registerUser(this.userObj).subscribe((res: IAPIResponse) => {
      if (res.result) {
        alert('User registration successful')
        this.closeLoginModal()
      }
      else{
        alert('Failed to register user')
      }
    })
  }

  onLogin(){
    console.log(this.loginObj)
    this.eventService.loginUser(this.loginObj).subscribe((res: IAPIResponse) => {
      console.log('login clicked');
      if (res.result) {
        alert('User login successful')
        localStorage.setItem('eventUser', JSON.stringify(res.data));
        this.userObj = res.data
        this.closeLoginModal()
      }
      else{
        alert('Failed to login user')
      }
    })
  }
  logoff(){
    localStorage.removeItem('eventUser');
    this.userObj = new User();
  }
}
