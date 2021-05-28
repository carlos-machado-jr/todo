import { Injectable, APP_ID } from '@angular/core';
import { Task } from '../model/tasks.model'
import { TODO_API } from '../app.api';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'


@Injectable()

export class HomeService{

    constructor(private httpClient: HttpClient){}

    private tasks: Task[];

    getTasks(): Observable<Task[]>{
        return this.httpClient.get<Task[]>(`${TODO_API}/tasks`);
           
    }

    



}