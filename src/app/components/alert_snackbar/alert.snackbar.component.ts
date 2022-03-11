import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'alert-snack-bar',
    templateUrl: './alert.snackbar.component.html',
    styles: [
      `
      .color {
        color: white;
      }
    `,
    ],
  })
  export class AlertSnackBar {
      constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any){
      }
  }