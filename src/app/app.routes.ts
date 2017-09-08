import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { AppComponent } from './app.component';
import { NewUserComponent } from './components/new-user/new-user.component';

import { AuthGuard } from './services/auth.guard';



const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    {path:'home', component:HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersComponent   },    
    { path: 'new-user', component: NewUserComponent}


        // otherwise redirect to home
    // { path: '**', redirectTo: 'login' }
];

export const appRouting = RouterModule.forRoot(appRoutes, {useHash: true});