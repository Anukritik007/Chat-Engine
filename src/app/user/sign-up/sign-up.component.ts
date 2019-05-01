import { Component, OnInit } from '@angular/core';
import CryptoJS from 'crypto-js';
import {LoginServiceService} from '../../login-service.service';
import * as alertify from 'alertify.js';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
    providers:[LoginServiceService]
})
export class SignUpComponent implements OnInit {

//  users=this.loginservice.getUser();
  // @Output() userCreated=new EventEmitter();

  successMessage:string;
  fullName: string;
  em:string;
  pwd:any;
  confirmpwd:any;

  constructor(private loginservice : LoginServiceService, private spinner: NgxSpinnerService) { }

  onSignup(form: any)
  {  
    this.fullName=form.fullName;
    this.em=form.email;
    this.pwd=form.pwd;
    let pwd1=CryptoJS.MD5(this.pwd);
    this.confirmpwd=form.confirmpwd;

    if(this.confirmpwd===this.pwd)
    {
      const temp={name:this.fullName,
                  email:this.em,
                  password:pwd1.toString()
                };

                this.spinner.show();
      this.loginservice.addUser(temp)
      .subscribe(
        data=> {
          this.spinner.hide();
          if(data==null)
          {
            this.showMessage('Email Already Registered');
          }
          else{
          // this.showMessage('successfully registered !');
          alertify.alert('Successfully registered !');
          this.onSignupDataEmpty();
          }
          
        },
        error=> 
        {
          this.spinner.hide();
          this.showMessage('some error in reaching Database !');
        }
      );

    }
    else{
       this.showMessage('passwords do not match');
    }
  }

  showMessage(successval:any){

    this.successMessage = successval;

    setTimeout(function(){
      this.successMessage = '';
      // document.getElementById('show').style.display='none';
    },2000);

    console.log("msg : "+this.successMessage);
  }
  
  onSignupDataEmpty() {
    this.fullName='';
    this.em='';
    this.confirmpwd='';
    this.pwd='';
  }
  ngOnInit() {
  }


}
