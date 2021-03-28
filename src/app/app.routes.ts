import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
export const ROUTES:Routes = [
    {path:"", component:HomeComponent},
    {path:"home", component:HomeComponent},
    {path:"home/:id", component:HomeComponent}
]