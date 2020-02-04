const S3config = {
    bucketName: 'archivise',
    region: 'ap-southeast-2',
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY
}

export default S3config
