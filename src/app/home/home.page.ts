import { Component } from '@angular/core';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';
import { HomeService } from './home.service';
import { Task } from '../model/tasks.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  tasks: Task[] = []
  public subject: Subscription



  constructor(
    private taskService: HomeService,
    private alertControl: AlertController,
    private toastControl: ToastController,
    private actionSheetControl: ActionSheetController

  ) { }

  ngOnInit() {
    this.subject = this.taskService.getTasks().subscribe(data =>{
    
    this.tasks = data 
    console.log(this.tasks)
  })
   
    console.log(this.tasks)
  }

  async showAdd() {
    const alert = await this.alertControl.create({
      header: 'O que deseja fazer?',
      inputs: [{
        name: 'task',
        type: 'text',
        placeholder: 'Digite a nova tarefa'
      }],
      buttons: [
        {
          text: 'cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {

          }
        },
        {
          text: 'Adicionar',
          handler: (form) => {

            this.add(form.task);

          }
        }]
    })

    await alert.present();

  }

  async add(newTask: string) {

    if (newTask.trim().length < 1) {
      const toast = await this.toastControl.create({
        message: 'Informe a tarefa!!',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      toast.present();
      return;
    }

    let task = {  name: newTask, done: false }
    this.tasks.push(task);
    // this.taskService.updateLocalStorage(this.tasks);


  }

  deletar(task: any){

    this.tasks = this.tasks.filter(taskArray => task != taskArray);
    // this.taskService.updateLocalStorage(this.tasks);
  }

  async openActions(task: any) {
    const actionSheet = await this.actionSheetControl.create({
      header: 'O que fazer?',
      buttons: [
        {
          text: task.done ? 'Desmarcar' : 'Marcar',
          icon: task.done ? 'radion-button-off' : 'checkmark-circle',
          handler: () => {
            task.done = !task.done;
            // this.taskService.updateLocalStorage(this.tasks);
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {

          }
        }
      ]

    });

    await actionSheet.present()

  }
  
}
