import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @Output() onEvent = new EventEmitter();
  user: Object = {};
  constructor() {}

  ngOnInit() {}

  save() {
    this.onEvent.emit({ type: 'save', data: this.user });
  }

  cancel() {
    this.onEvent.emit({ type: 'cancel' });
  }
}
