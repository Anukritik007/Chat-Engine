import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms';
import {LoginServiceService} from '../../login-service.service';
import CryptoJS from 'crypto-js';
import * as alertify from 'alertify.js';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})


export class ResetComponent implements OnInit {

  successMessage:string;
  em:string;
  id:string;
  new_pwd:any;
  confirmpwd:any;

  constructor(private loginservice : LoginServiceService,private router: Router, private spinner: NgxSpinnerService) { }

  onReset(form: any) {
  
    this.id= form.id;
    this.em= form.email;
    this.new_pwd= form.new_pwd;

    let pwd1= CryptoJS.MD5(this.new_pwd);
    this.confirmpwd= form.confirmpwd;

console.log(this.new_pwd);
console.log(this.confirmpwd);

    if(this.confirmpwd===this.new_pwd)
    {
          const request={
            userid: this.id,
            email:this.em,
            password:pwd1.toString()
            };

            this.spinner.show();
          this.loginservice.resetpassword(request)
          .subscribe(
            data=> {
              this.spinner.hide();
              console.log("data: "+data);
              if(data==null)  //no data returned from RESTapi in case of invalid userId
              {
                this.showMessage('No such user Registered');
              }
              else{
                
              // this.showMessage('Password Changed !');
              alertify.alert('Password reset successful !');
              this.onResetDataEmpty();
              }    
            },
            error =>{
              this.spinner.hide();
              this.showMessage('Unable to hit RESTapi');
            }
          );

        }else{
            this.showMessage('passwords do not match');
          }
  }

    showMessage(successval:any)
    {
        this.successMessage = successval;

        setTimeout(function(){
          this.successMessage = '';
          // document.getElementById('show').style.display='none';
        },2000);

        console.log("msg : "+this.successMessage);
  }

   onResetDataEmpty() {
      this.id='';
        this.em='';
        this.confirmpwd='';
        this.new_pwd='';
  }

  ngOnInit() { 
  }

}



