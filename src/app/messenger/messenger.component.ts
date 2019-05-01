import { Component, OnInit ,HostListener} from '@angular/core';
import {DataServiceService} from '../data-service.service';
import { Router } from '@angular/router';
import {ChatService} from './chat.service';
import * as alertify from 'alertify.js';

@Component({
  selector: 'app-chatbot',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
  providers:[DataServiceService,ChatService]
  
})

export class MessengerComponent implements OnInit {
  CurrentTime: any;
  mess:Array<{user:String, reply:String}>=[];  //:any
  rep: any;
  selectedItem : boolean;
  friendName: String;
   arr=[];
  userName:String;
  UserId:string;
  chatroom:string='group chat';
  userclicked:boolean=false;
  // info:Array<{user:String, reply:String}>=[];
  numberOfOnlineUsers:number;
  filtertext:any;

  constructor(private chat:ChatService, private dataservice : DataServiceService, private router: Router) 
  {
   
    this.userName=localStorage.getItem("name");
    console.log("Name:"+this.userName)

    this.UserId=localStorage.getItem("UserId");
    console.log("UserId:"+this.UserId)

    this.chat.newUserJoined()
    .subscribe(data=>this.mess.push(data));

    this.chat.userLeftRoom()
    .subscribe(data=>this.mess.push(data));

    this.chat.newMessageReceived()
    .subscribe(data=>this.mess.push(data));
 
    this.chat.presentUsers().subscribe(data=>{
      // this.arr.push({friendname:data ,msgs:[]});
      this.arr=[];  //important step :D
      console.log('data received');
      console.log(data);

      data.forEach(element => {
        var temp={friendname:element , msgs:[]};
      this.arr.push(temp);
      });
      
      console.log(this.arr);
    });
  }

  ngOnInit(){

    //this.arr=this.dataservice.getData();
    //this.arr.push({friendname:this.userName ,msgs:[]});

    this.chat.joinRoom({user:this.userName, room:this.chatroom});

    this.chat.count().subscribe(data=>this.numberOfOnlineUsers=data);
  }

  Send(){
    // let temp;
    //   temp={"user":"User","reply":this.rep}; 
    //   this.mess.push(temp);

      this.CurrentTime = new Date().getHours() + ':' + new Date().getMinutes() + ':'+  new Date().getSeconds();
    
      console.log(this.CurrentTime);

      this.chat.sendMessage({ user:this.userName , room:this.chatroom, reply:this.rep ,time:this.CurrentTime});

      this.rep='';
      document.querySelector(".chatlogs").scrollTop = document.querySelector(".chatlogs").scrollHeight;

  }

  // fetchUser(event,newValue,friendname:any,i:any)
  // {
  //   this.selectedItem = newValue;

  //   this.mess=  this.arr[i].msgs;
  //   this.friendName = this.arr[i].friendname;
    
  //   this.userclicked=true;

  //   document.querySelector(".chatlogs").scrollTop = document.querySelector(".chatlogs").scrollHeight; //scroll to bottom
  // }

  onLogoutLeave(){
    localStorage.clear();
    this.router.navigate(['']);

    this.chat.leaveRoom({user:this.userName, room:this.chatroom});

    alertify.alert('Successfully Logged out !');
  }

  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event) {
    this.chat.leaveRoom({user:this.userName, room:this.chatroom});
  }
}
