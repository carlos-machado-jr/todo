import { Component } from '@angular/core';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  tasks: any[] = []



  constructor(
    private alertControl: AlertController,
    private toastControl: ToastController,
    private actionSheetControl: ActionSheetController

  ) { }

  ngOnInit() {
    this.getLocalStorage();
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

    let task = { name: newTask, done: false }
    this.tasks.push(task);
    this.updateLocalStorage();


  }

  deletar(task: any){

    this.tasks = this.tasks.filter(taskArray => task != taskArray);
    this.updateLocalStorage()
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
            this.updateLocalStorage();
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


  updateLocalStorage() {
    localStorage.setItem('taskDB', JSON.stringify(this.tasks));
  }

  getLocalStorage() {
    let taskDB = localStorage.getItem('taskDB');
    if (taskDB != null) {
      this.tasks = JSON.parse(taskDB);
    }
  }

}
