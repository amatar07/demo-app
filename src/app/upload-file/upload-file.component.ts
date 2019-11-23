import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {

  error: boolean = false;
  excelData: any = [];
  buttonName: string = "Upload File";
  constructor() {
  }

  /**
   * Changed selected file function
   * @param evt event triggered from uploading file
   */
  onFileChange(evt: any) {
    this.resetFileData(evt);
    if (evt.target.accept.includes(evt.target.files[0].type)) {
      const target: DataTransfer = <DataTransfer>(evt.target);
      if (target.files.length !== 1) throw new Error('Cannot use multiple files');
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        this.loopOnSheets(wb);
      };
      reader.readAsBinaryString(target.files[0]);
    } else {
      this.error = true;
    }
  }

  /**
   * Looping on sheets in workbook file and adding them to our excelData object
   * @param wb workbook uploaded
   */
  loopOnSheets(wb: XLSX.WorkBook) {
    wb.SheetNames.forEach(sheet => {
      const wsname: string = sheet;
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      let data = <any>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      data.name = wsname;
      this.excelData.push(data);
    })
  }

  /**
   * Resetting workbook data if a new file is being uploaded
   * @param event event for file being triggered to set button name
   */
  resetFileData(event: any) {
    this.error = false;
    this.excelData = [];
    this.buttonName = event.target.files[0].name;
  }

}
