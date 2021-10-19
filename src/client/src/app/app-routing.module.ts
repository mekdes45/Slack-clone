import { SidebarComponent } from './components/sidebar/sidebar.component';


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { PageUsersComponent } from './pages/page-users/page-users.component';
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/container/chat/chat.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  
  { path: 'register', component: RegisterComponent },
  {path:'side',component:SidebarComponent},
  { path: 'login', component: LoginComponent },
  { path: 'chat', component: ChatComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
