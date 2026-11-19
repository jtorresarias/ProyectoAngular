import { Component, computed, Input, input, Output, EventEmitter /*computed, signal*/ } from '@angular/core';
//import { DUMMY_USERS } from '../dummy-user';

//const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length)

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  /*selectedUser = signal(DUMMY_USERS[randomIndex]);
  imagePath = computed(() => 'users/' + this.selectedUser().avatar)*/
  // get imagePath() {
  //   return 'users/' + this.selectedUser.avatar
  // }
  @Input({ required:true }) id!: string;
  @Input({ required:true }) avatar!: string;
  @Input({ required:true }) name!: string;
  @Output() select = new EventEmitter();

  /*avatar = input.required<string>();
  name = input.required<string>();

  imagePath = computed(() => {
    return 'users/' + this.avatar();
  }
  )*/

  get imagePath () {
    return  'users/' + this.avatar;
  }
  onSelectUser() {
    /*const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length)
    this.selectedUser.set(DUMMY_USERS[randomIndex]);*/
    this.select.emit(this.id);
  }
}
