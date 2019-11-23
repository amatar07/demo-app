import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-uploaded-table',
  templateUrl: './uploaded-table.component.html',
  styleUrls: ['./uploaded-table.component.css']
})
export class UploadedTableComponent implements OnInit {

  @Input() tableData: any[];

  constructor() { }

  ngOnInit() {
  }

}
