import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class DataServiceService {

constructor(private http:HttpClient){}
chat:any;


    getData() 
    {  
return [{"friendname":"Amparo Mccray","msgs":[]},{"friendname":"Victoria Dejesus","msgs":[]},{"friendname":"Hartman Gill","msgs":[]}];

  }
}




    
