import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-confirmationDialog',
    templateUrl: 'confirmationDialog.component.html',
  })
  export class ConfirmationDialogComponent {
  
    constructor(
        public confDialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {

      }
  
  }