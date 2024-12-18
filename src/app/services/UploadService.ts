import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) {}


  getPreSignedUrl(fileName: string, fileType: string): Observable<any> {
    const body = { fileName, fileType };
    return this.http.post('http://localhost:8080/api/upload/presigned-url', body);
  }

 
  uploadFileToS3(file: File, preSignedUrl: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': file.type });
    return this.http.put(preSignedUrl, file, { headers, reportProgress: true, observe: 'events' });
  }
}
