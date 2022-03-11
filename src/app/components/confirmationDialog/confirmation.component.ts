import { Component, OnInit, Inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Contestant } from '../../../models/contestant';

export interface DialogData {
    contestant: Contestant;
    id: string,
  }

@Component({
    selector: 'confirmation-dialog',
    templateUrl: './confirmation.component.html'
  })
  export class ConfirmationDialog implements OnInit {
    constructor(
      public dialogRef: MatDialogRef<ConfirmationDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}


    name: string = '';
    last_name: string = '';
    id: string = '';

    ngOnInit(): void {
        this.name = this.data.contestant.name;
        this.last_name = this.data.contestant.last_name;
        this.id = this.data.id;
    } 
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    executeAction = () => {
      this.dialogRef.close(this.id);
    }
  }