import { Component, OnInit, Inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';

import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs-compat/observable';

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
    myControl = new FormControl();
    filteredOptions!: Observable<string[]>;

    edit: boolean = false;

    name: string = '';
    last_name: string = '';
    birth_date: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)]);
    phone: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]);
    country: FormControl = new FormControl('', [Validators.required, Validators.pattern(/Spain/)]);
    email: FormControl = new FormControl('', [Validators.required, Validators.pattern(/(.+)@(.+){2,}\.(.+){2,}/i)]);
    character: string = '';

    ngOnInit(): void {
        this.characters = this.data.characters.map((char: any) => char.name);
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value: any) => this._filter(value)),
        );
        this.edit = this.data.edit;
        if (this.edit) {
          this.name = this.data.contestant.name;
          this.last_name = this.data.contestant.last_name;
          this.birth_date.setValue(this.data.contestant.birth_date);
          this.country.setValue(this.data.contestant.country);
          this.phone.setValue(this.data.contestant.phone);
          this.email.setValue(this.data.contestant.email);
          this.character = this.data.contestant.character;
        }
    } 

    private _filter(value: string): string[] {
      const filterValue = value.toLowerCase();
  
      return this.characters.filter(option => option.toLowerCase().includes(filterValue));
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

    getMailErrorMessage() {
      if (this.email.hasError('required')) {
        return 'You must enter a valid mail';
      }
      return this.email.hasError('email') ? 'Not a valid email' : '';
    }

    getBirthDateErrorMessage() {
      console.log('birth date', this.birth_date)
      if (this.birth_date.hasError('required')) {
        return 'You must enter a valid birth date, yyyy-mm-dd';
      }
      const birthday = +new Date(this.birth_date.value)
      const age = ~~((Date.now() - birthday) / (31557600000))
      console.log('AGE', age)
      if (age < 18){
        return 'The age of the contestant must be over 18 years.'
      }
      return (this.birth_date.hasError('birth_date')) ? 'Not a valid birth date -> yyyy-mm-dd' : '';
    }

    getCountryErrorMessage() {
      if (this.country.hasError('required')) {
        return 'You must enter a valid country';
      }
      return this.country.hasError('country') ? 'Not a valid country, you must live in Spain to participate in the show' : '';
    }

    getPhoneErrorMessage() {
      if (this.phone.hasError('required')) {
        return 'You must enter a valid phone number';
      }
      return this.phone.hasError('phone') ? 'Not a valid phone number (+34 666 66 66 66)' : '';
    }

    getCharacter = (event: any) => {
      console.log('event', event);
    }

    addContestant = () => {
      const newContestant = new Contestant( 
        this.name, 
        this.last_name, 
        this.birth_date.value, 
        this.phone.value, 
        this.country.value, 
        this.email.value, 
        this.character
      );
      this.dialogRef.close(newContestant);
    }

    editContestant = () => {
      const id = this.data.id;
      const editedContestant = new Contestant( 
        this.name, 
        this.last_name, 
        this.birth_date.value, 
        this.phone.value, 
        this.country.value, 
        this.email.value, 
        this.character
      );
      this.dialogRef.close({
        contestant: editedContestant,
        id: id });
    }
  }