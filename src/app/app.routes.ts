import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EventComponent } from './pages/event/event.component';
import { MyBookingComponent } from './pages/my-booking/my-booking.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    // Add more routes here
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path:'event/:id',
        component: EventComponent
    },
    {
        path: 'my-booking',
        component: MyBookingComponent
    }
];
