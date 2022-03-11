import { Component, OnInit, ViewChild } from '@angular/core';
import { Contestant } from '../../../models/contestant';

import { ContestantsService } from '../../../services/contestants.service';
import { CharactersService } from '../../../services/characters.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { MatDialog } from '@angular/material/dialog';
import { NewContestantDialog } from '../newContestant/newContestant.component';
import { ConfirmationDialog } from '../confirmationDialog/confirmation.component';
import { AlertSnackBar } from '../alert_snackbar/alert.snackbar.component';

import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contestants',
  templateUrl: './contestants.component.html',
  styleUrls: ['./contestants.component.css']
})
export class ContestantsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private contestantService: ContestantsService,
    private characterService: CharactersService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  public contestants: Contestant [] = [];
  public characters: any = [];

  displayedColumns: string[] = ['name', 'last_name', 'birth_date', 'phone', 'country', 'email', 'character', 'actions'];

  dataSource!: MatTableDataSource<Contestant>;

  durationInseconds: number = 5;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  ngAfterViewInit():void {
    
  }

  ngOnInit(): void {
    this.getContestants();
    this.getAllCharacters();
  }

  getContestants = () => {
    this.contestantService.getAll()
    .then((result: any) => {
      console.log('Contestants', result);
      // Sorting contestants by last name
      this.contestants = result.sort((a: Contestant, b: Contestant) => (a.last_name > b.last_name) ? 1 : ((b.last_name > a.last_name) ? -1 : 0))
      this.dataSource = new MatTableDataSource(this.contestants);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('paginator', this.dataSource.paginator);
      console.log('sort', this.dataSource.sort);
    })
  }

  getAllCharacters = () => {
    this.characterService.getAll(1)
    .then(result => {
      console.log('Characters', result);
      // Saco el número de paginas para cargar todos los caracteres
      const pages = result.count / 10 + 1;
      this.characters = [...this.characters, ...result.results];

      const promises = [];
      for(let i = 2; i<= pages; i++){
        promises.push(this.characterService.getAll(i))
      }

      Promise.all(promises)
      .then(result => {
        console.log('resultado promises', result);
        for (let i = 0; i < result.length; i++){
          this.characters = [...this.characters, ...result[i].results];
        }
        console.log('characters', this.characters);
      })
      .catch(err => console.log(err));
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addContestant = () => {
      const dialogRef = this.dialog.open(NewContestantDialog, {
        width: '400px',
        data: {characters: this.characters, contestant: null, edit: false, id: null},
      });
  
      dialogRef.afterClosed().subscribe((result: Contestant) => {
        console.log('The dialog was closed', result);
        if (result){
          const newContestant = result;
          this.contestantService.insert(newContestant)
          .then(res => {
            this.getContestants();
            return this._snackBar.openFromComponent(AlertSnackBar, {
              duration: this.durationInseconds * 1000,
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              data: 'Contestant Created!'
            });
          })
          .catch(err => console.log(err));
        }
      });
  }

  editContestant = (contestant: any) => {
    console.log('edit event', contestant);
    const dialogRef = this.dialog.open(NewContestantDialog, {
      width: '400px',
      data: {characters: this.characters, contestant: contestant, edit: true, id: contestant.id},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed', result);
      if (result){
        const editedContestant = result.contestant;
        const id = result.id;
        this.contestantService.update(editedContestant, id)
        .then(res => {
          this.getContestants();
          return this._snackBar.openFromComponent(AlertSnackBar, {
            duration: this.durationInseconds * 1000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            data: 'Contestant Edited!'
          })
        })
      }
    });
  }

  deleteContestant = (contestant: any) => {
    console.log('delete event', contestant);
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '400px',
      data: {contestant: contestant, id: contestant.id, delete: true},
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log('The dialog was closed', result);
      const deleteId = result;
      this.contestantService.delete(deleteId)
      .then(res => {
        this.getContestants();
        return this._snackBar.openFromComponent(AlertSnackBar, {
          duration: this.durationInseconds * 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          data: 'Contestant Deleted!'
        })
      })
      .catch(err => console.log(err))
    });
  }

}
