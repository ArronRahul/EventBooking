import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EventBooking';

  @ViewChild('modal') model: ElementRef | undefined;
  // Correct casing

  isLoginForm: boolean = false;

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
}
