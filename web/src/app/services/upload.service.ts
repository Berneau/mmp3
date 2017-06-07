import { Injectable } from '@angular/core';
import { ApiEndpoint } from './../app.config'

@Injectable()
export class UploadService {

  private apiEndpoint = ApiEndpoint

  constructor() { }

  fileUpload(file, item) {
    let fileUrl = `${this.apiEndpoint}/upload`
    let token = JSON.parse(localStorage.getItem('currentUser')).token

    return new Promise((resolve, reject) => {
      var formData: FormData = new FormData()
      var xhr = new XMLHttpRequest()
      if (file) {
        formData.append('file', file)

        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) return resolve(xhr.response)
            else return reject(xhr.response)
          }
        }
        xhr.open("POST", fileUrl, true)
        xhr.setRequestHeader('x-amz-meta-fieldName', item);
        xhr.setRequestHeader('x-access-token', token);
        xhr.send(formData)
      }
      else {
        return null
      }
    })
  }

}
