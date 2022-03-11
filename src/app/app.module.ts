import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import { AppComponent } from './app.component';
import { ContestantsComponent } from '../app/components/contestants/contestants.component';
import { NewContestantDialog } from '../app/components/newContestant/newContestant.component';
import { ConfirmationDialog } from '../app/components/confirmationDialog/confirmation.component';
import { AlertSnackBar } from '../app/components/alert_snackbar/alert.snackbar.component';

import { ContestantsService } from '../services/contestants.service';
import { CharactersService } from '../services/characters.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [ 
    AppComponent,
    ContestantsComponent,
    NewContestantDialog,
    ConfirmationDialog,
    AlertSnackBar
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatAutocompleteModule
  ],
  providers: [
    ContestantsService,
    CharactersService  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
