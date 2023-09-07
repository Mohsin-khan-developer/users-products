// import AWS from 'aws-sdk';
// AWS.config.logger = console;

// const s3 = new AWS.S3({
//   accessKeyId: 'AKIAQL6HLAZ3LATIXOMI',
//   secretAccessKey: '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',
//   region: 'ap-south-1',
// });

// export default function uploadToS3(file, fileName) {
//   const params = {
//     Bucket: 's3-image-uploading',
//     Key: fileName,
//     Body: file,
//   };

//   return s3.upload(params).promise();
// }




import { FirstPage } from '@mui/icons-material';
import AWS from 'aws-sdk';

// export async function uploadImageToS3(file, fileName) {
//   AWS.config.update({
//     accessKeyId: process.env.awskeyid,
//     secretAccessKey: process.env.secretid,
//     region: 'ap-south-1',
//   });
  

//   const s3 = new AWS.S3();

//   const params = {
//     Bucket: 's3-image-uploading',
//     Key: fileName,
//     Body: file,
//     ACL: 'public-read', // Optional: Set the desired ACL for the uploaded file
//   };

//   try {
//     const response = await s3.upload(params).promise();
//     console.log('Image uploaded successfully!', response.Location);
//     return response.Location;
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     throw error;
//   }
// }



// import { S3 } from 'aws-sdk';

// const s3 = new S3({
//   accessKeyId: process.env.awskeyid,
//   secretAccessKey: process.env.secretid,
//   region: 'ap-south-1',
// });

// export async function uploadImageToS3(image, fileName) {
//   const params = {
//     Bucket: 's3-image-uploading',
//     Key: fileName,
//     Body: image,
//     ACL: 'public-read', // Optional: Set the desired ACL for the uploaded file
//   };

//   try {
//     const response = await s3.upload(params).promise();
//     console.log('Image uploaded successfully!', response.Location);
//     return response.Location;
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     throw error;
//   }
// }



import { S3 } from 'aws-sdk';

const s3 = new S3({
  accessKeyId: process.env.awskeyid,
  secretAccessKey: process.env.secretid,
  region: 'ap-south-1',
});

export async function uploadImageToS3(imageBuffer, fileName,contactInfo,fileType) {
  const params = {
    Bucket: 's3-image-uploading',
    Key: fileName,
    Body: imageBuffer,
    ContentType:  fileType,
    ACL: 'public-read', // Optional: Set the desired ACL for the uploaded file
    Metadata: {
      'contactInfo': contactInfo
    }
  };

  try {
    const response = await s3.upload(params).promise();
    console.log('Image uploaded successfully!', response.Location);
    return response.Location;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}
