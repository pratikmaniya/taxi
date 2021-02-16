const AWS = require('aws-sdk')

const config = require('./config')

AWS.config.update({
    accessKeyId: config.awsAccesskey,
    secretAccessKey: config.awsSecretkey
})

const s3 = new AWS.S3()
const promise = require('bluebird');

class S3 {
    uploadImageOnS3(path, file) {
        return new promise((resolve, reject) => {
            let fileName = path + Date.now() + "-" + file.originalname.toString().trim(),
                params = {
                    Bucket: config.s3bucketName,
                    Key: fileName,
                    Body: file.buffer,
                    ACL: 'public-read'
                }
            s3.putObject(params, (error, result) => {
                if (error) {
                    console.log(error)
                    reject({ code: 0, message: 'ERROR_UPLOADING_IMAGE' })
                } else {
                    // console.log(result)
                    resolve(`${config.s3bucketName}/${fileName}`)
                }
            })
        })
    }

    deleteImageFromS3(fullPaths) {
        return new promise((resolve, reject) => {
            let fileNames = [
                {
                    Key: `${fullPaths.replace(config.s3uploadURL + '/', '').replace('%2F', '/')}`
                }],
                params = {
                    Bucket: config.s3bucketName,
                    Delete: {
                        Objects: fileNames,
                        Quiet: false
                    }
                }
            s3.deleteObjects(params, (err, data) => {
                if (err) {
                    console.log("error===========", err)
                    console.log(err, err.stack); // an error occurred
                    reject()
                } else {
                    console.log(data)
                    console.log("Delete image successfully...");
                    resolve()
                }
            });
        })
    }
}

module.exports = new S3()
