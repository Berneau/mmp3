import { Component, ViewEncapsulation } from '@angular/core';
import { config } from './../config'
// Import the Amazon S3 service client
import * as AWS from 'aws-sdk'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor() {
  }

  ngOnInit(): void {
    this.initS3();
  }

  initS3() {
    AWS.config.accessKeyId = config.s3Credentials.accessKeyId
    AWS.config.secretAccessKey = config.s3Credentials.secretAccessKey
    AWS.config.region = config.s3Credentials.bucketRegion

    let params = {
      Bucket: 'lungau',
    };

    let sts = new AWS.STS();
    sts.getSessionToken(function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data);           // successful response
    });

    // let s3 = new AWS.S3({
    //   apiVersion: '2006-03-01',
    //   accessKeyId: config.s3Credentials.accessKeyId,
    //   secretAccessKey: config.s3Credentials.secretAccessKey,
    //   region: config.s3Credentials.bucketRegion,
    //   sessionToken: ''
    // });
    //

  }
}
