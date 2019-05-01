import {NgModule} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import {MessengerComponent } from './messenger/messenger.component';
import { UserComponent } from './user/user.component';
import{SignUpComponent} from './user/sign-up/sign-up.component';
import{ResetComponent} from './user/reset/reset.component';

const appRoute:Routes=[
{
  path:'login',component:UserComponent,
children:[{path:'',component:LoginComponent}]
},

{path:'signup',component:UserComponent,
children:[{path:'',component:SignUpComponent}]
},

{path:'reset' ,component:UserComponent,
children:[{path:'',component:ResetComponent}]
},

{path:'chat',component:MessengerComponent},

{path:'',redirectTo:'/login',pathMatch:'full'}

];

@NgModule({
imports:[
RouterModule.forRoot(appRoute)
],
exports:[RouterModule]
})
export class AppRoutingModule{

}