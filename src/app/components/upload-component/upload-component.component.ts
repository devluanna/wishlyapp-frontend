import { Component } from '@angular/core';
import { UploadService } from '../../services/UploadService';
import { HttpEventType } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-component',
  standalone: true,
  imports: [CommonModule],
  providers:[UploadService],
  templateUrl: './upload-component.component.html',
  styleUrl: './upload-component.component.scss'
})
export class UploadComponent {
  selectedFile: File | null = null;
  uploadProgress: number = 0;
  uploadSuccess: boolean = false;


  constructor(private uploadService: UploadService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      // Passo 1: Solicitar a URL pré-assinada
      this.uploadService.getPreSignedUrl(this.selectedFile.name, this.selectedFile.type)
        .subscribe(response => {
          const preSignedUrl = response.url;

          // Passo 2: Fazer o upload para o S3
          this.uploadService.uploadFileToS3(this.selectedFile!, preSignedUrl)
            .subscribe(event => {
              if (event.type === HttpEventType.UploadProgress && event.total) {
                this.uploadProgress = Math.round(100 * (event.loaded / event.total));
              } else if (event.type === HttpEventType.Response) {
                this.uploadSuccess = true;
                console.log('Upload concluído com sucesso!');
              }
            });
        });
    }
  }
}