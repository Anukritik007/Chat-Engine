import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';


@Injectable()
export class ChatService {

   private socket =io(environment.ws_url);

   count(){
      
      let observable =new Observable<number>(observer =>{
       this.socket.on('number of online users', (numberOfOnlineUsers)=>{
         observer.next(numberOfOnlineUsers);
       });
       return ()=> {this.socket.disconnect();}
     });

     return observable;
   }

   presentUsers(){
      let observable =new Observable<any[]>(observer =>{
       this.socket.on('online users', (online)=>{
         observer.next(online);
       });
       return ()=> {this.socket.disconnect();}
     });

     return observable;
   }

   joinRoom(data){
     this.socket.emit('join' ,data);
   }

   newUserJoined(){
     let observable =new Observable<{user:String, reply:String ,isInfo:boolean}>(observer =>{
       this.socket.on('new user joined', (data)=>{
         observer.next(data);
       });
       return ()=> {this.socket.disconnect();}
     });

     return observable;
   }

   leaveRoom(data){
     this.socket.emit('leave', data);
   }

   userLeftRoom(){
     let observable =new Observable<{user:String, reply:String, isInfo:boolean}>(observer =>{
       this.socket.on('left room', (data)=>{
         observer.next(data);
       });
       return ()=> {this.socket.disconnect();}
     });

     return observable;
   }

   sendMessage(data){
     this.socket.emit('message',data);
   }

   newMessageReceived(){
     let observable =new Observable<{user:String, reply:String ,time:any ,isInfo:boolean}>(observer =>{
       this.socket.on('new message', (data)=>{
         observer.next(data);
       });
       return ()=> {this.socket.disconnect();}
     });

     return observable;
   }
}
