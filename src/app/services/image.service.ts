import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() { }
  AuthorizedExtensions: string[] = ['jpg', 'jpeg', 'png', 'gif'];
  extension: string = '';
  uploadImageAndGetBase64(file: any): Promise<string> {
      this.extension = file.name.split('.')[1];
      if (!this.AuthorizedExtensions.includes(this.extension)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Vous devez choisir une image',
        });
        return Promise.reject('Extension de fichier non autorisée');
      }
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const imageBase64 = reader.result as string;
        resolve(imageBase64);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  }
}
