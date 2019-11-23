import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  excelData: any = [];
  buttonName: string = "Upload File";
  constructor() {
  }
  ngOnInit() {
  }

/**
 * Changed selected file function
 * @param evt event triggered from uploading file
 */
  onFileChange(evt: any) {
    this.excelData = [];
    this.buttonName = evt.target.files[0].name;
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      wb.SheetNames.forEach(sheet => {
        const wsname: string = sheet;

        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        let data = <any>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        data.name = wsname;
        this.excelData.push(data);
      })
    };
    reader.readAsBinaryString(target.files[0]);
    console.log(this.excelData);
  }

}
