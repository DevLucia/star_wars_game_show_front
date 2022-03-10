import { Component, OnInit, Inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Contestant } from '../../../models/contestant';

export interface DialogData {
    characters: string[];
    contestant: Contestant;
    id: string,
    edit: boolean
  }

@Component({
    selector: 'new-contestant-dialog',
    templateUrl: './newContestant.component.html',
    styleUrls: ['./newContestant.component.css']
  })
  export class NewContestantDialog implements OnInit {
    constructor(
      public dialogRef: MatDialogRef<NewContestantDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}

    characters: string[] = [];
    edit: boolean = false;

    name: string = '';
    last_name: string = '';
    birth_date: string = '';
    phone: string = '';
    country: string = '';
    email: string = '';
    character: string = '';

    ngOnInit(): void {
        this.characters = this.data.characters;
        this.edit = this.data.edit;
        
        if (this.edit) {
          this.name = this.data.contestant.name;
          this.last_name = this.data.contestant.last_name;
          this.birth_date = this.data.contestant.birth_date;
          this.country = this.data.contestant.country;
          this.phone = this.data.contestant.phone;
          this.email = this.data.contestant.email;
          this.character = this.data.contestant.character;
        }
    } 
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    addContestant = () => {
      const newContestant = new Contestant( 
        this.name, 
        this.last_name, 
        this.birth_date, 
        this.phone, 
        this.country, 
        this.email, 
        this.character
      );
      this.dialogRef.close(newContestant);
    }

    editContestant = () => {
      const id = this.data.id;
      const newContestant = new Contestant( 
        this.name, 
        this.last_name, 
        this.birth_date, 
        this.phone, 
        this.country, 
        this.email, 
        this.character
      );
      this.dialogRef.close(newContestant);
    }
  }