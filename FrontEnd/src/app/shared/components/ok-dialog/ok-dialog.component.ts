import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ok-dialog',
  templateUrl: './ok-dialog.component.html',
  styleUrls: ['./ok-dialog.component.scss']
})
export class OkDialogComponent implements OnInit {

  constructor(
    public dialog:MatDialogRef<OkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message:string
  ) { }
  ngOnInit(): void {
  }
  onClosed():void{
    this.dialog.close();
  }


}
