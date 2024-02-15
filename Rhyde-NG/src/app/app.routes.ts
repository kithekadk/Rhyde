import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { DriverdashboardComponent } from './components/driverdashboard/driverdashboard.component';
import { ViewUsersComponent } from './components/view-users/view-users.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'admin', component:AdminDashboardComponent, children:[
        {path: 'view-users', component: ViewUsersComponent},
        {path: 'update-user/:user_id', component: UpdateUserComponent},
    ]},
    {path:'customer', component:UserdashboardComponent},
    {path:'driver', component:DriverdashboardComponent},
    {path:'**', component: NotfoundComponent}
];
