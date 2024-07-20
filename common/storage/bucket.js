import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

export default class StorageBucket {
  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      endpoint: process.env.AWS_ENDPOINT,
    })
    this.bucket = process.env.AWS_BUCKET_NAME

    if (process.env.DEV_ENV && this.client) {
      console.log('S3 client created', this.client)
    }
  }

  uploadFile(path, data, contentType) {
    const attributes = {
      client: this.client,
      params: {
        Bucket: this.bucket,
        Key: path,
        Body: data,
        ContentType: contentType,
      },
      tags: [],
      queueSize: 4,
      partSize: 1024 * 1024 * 5,
      leavePartsOnError: false,
    }
    console.log('file attributes', attributes)
    return new Upload(attributes)
  }

  getObject(path) {
    return this.client.send(
      new GetObjectCommand({ Bucket: this.bucket, Key: path })
    )
  }
}
