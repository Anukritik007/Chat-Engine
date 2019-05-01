import {Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
// import {User} from './user/user.model';

@Injectable()
export class LoginServiceService 
{
  // usersChanged=new EventEmitter<any>();
constructor(private http:HttpClient){}
users:any;

 login(body:any)
 {
            // this.http.get <{message:string, users:any}> ('http://localhost:3000/api/login')
            //       .subscribe((userData)=>{
            //           this.users=userData.users;
            //     });

    return this.http.post('aws-resource/login-signup/login',body,{
      observe:'body'
  })
 }
 
 addUser(body:any)   //body is json obj 
 {
      //  this.users.push(temp)
      //  console.log(this.users);
      //  return  this.users;
    //this.usersChanged.emit(this.users);

  return this.http.post('aws-resource/login-signup',body,{
    observe:'body'
  })
 }

 resetpassword(body:any){
   return this.http.post('aws-resource/reset',body,{
    observe:'body'
  })
 }

//  getUserName(){
//   return this.http.get('http://localhost:3000/users/username',{
//      observe:'body',
//      params:new HttpParams().append('token',localStorage.getItem('token'))
//    });

//  }


}