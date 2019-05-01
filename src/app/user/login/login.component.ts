import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms';
import {LoginServiceService} from '../../login-service.service';
import CryptoJS from 'crypto-js';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  error: string;
  check:boolean;
  em:string;
  pwd:any;
 
  userName:string;

  constructor(private loginservice : LoginServiceService,private router: Router, private spinner: NgxSpinnerService) { }

  onSubmit(form: any) {
  // console.log(form);
    this.check = true;
    this.em = form.email;
    this.pwd = form.pwd;
  
      //encoding the password
    let x=CryptoJS.MD5(this.pwd).toString();
    console.log(x);

    let request={
      email:this.em,
      password:x
    };

    this.spinner.show();
    this.loginservice.login(request)
    .subscribe(
      data=> {
        this.spinner.hide();
        console.log("data: "+data);
        if(data==null)  //no data returned in case of invalid credentials from RESTapi
        {
          this.check=false;
          this.error = 'Invalid Credentials';
        }
        else{
          // localStorage.setItem('token',data.toString());
        localStorage.setItem('name',data[0].toString());
        localStorage.setItem('UserId',data[1].toString());
        this.router.navigate(['/chat']);
        }    
      },
      error =>{
        this.spinner.hide();
        console.log('Unable to hit RESTapi');
      }
    );


        // console.log(this.usr);
        // for(let i=0;i<this.usr.length;i++)
        // {
        //   if(this.usr[i].email==em)
        //   {
        //     if(this.usr[i].password==x)
        //     {
        //       this.userName=this.usr[i].name;
        //       localStorage.setItem("email",em);
        //       localStorage.setItem("name",this.userName);
        //       localStorage.setItem("password",pwd);

        //       console.log(localStorage);
        //       this.router.navigate(['/chat']);
        //     }
        //     else{
        //       check=false;
        //     }
        //   }
        //   else{
        //     check=false;
        //   }

        //   if(check==false)
        //   this.error = 'Invalid Credentials';
        // }

  }
  

  ngOnInit() { 

  // this.loginservice.usersChanged.subscribe((users)=>{
  //   this.usr=users;
  // })

  }

}

