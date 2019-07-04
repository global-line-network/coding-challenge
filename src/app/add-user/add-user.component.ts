import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  @Output() onEvent = new EventEmitter();
  user: Object = {};
  avatar;
  formData = new FormData();
  constructor() {}

  ngOnInit() {}

  onFileChange(files: FileList) {
    this.avatar = files.item(0);
  }

  save() {
    this.formData = new FormData();
    this.formData.append('avatar', this.avatar, this.avatar.name);
    Object.keys(this.user).map(key => this.formData.append(key, this.user[key]));
    this.onEvent.emit({ type: 'save', data: this.formData });
  }

  cancel() {
    this.onEvent.emit({ type: 'cancel' });
  }
}
