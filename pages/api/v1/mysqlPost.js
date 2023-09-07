// import db from '../../../config/db';
// import { uploadImageToS3 } from '../../../config/s3-credentials';

// export default function handler(req, res) {
//   const { firstName, lastName, address, contactInfo,image,fileName,fileType } = req.body;
//   // const file = req.body.formData.image; // Use req.body.image instead of req.body.file
//   // const fileName = req.body.formData.image.name; // Use req.body.image.name instead of req.body.fileName
//   // console.log('Image:', image);
//   // const imageFile = req.body.image;
//   // const imageName = req.body.image.name;
//   // const imageDescription = req.query.imageDescription;
//   // console.log(image,fileName);
//   // console.log(imageDescription);
//   // Insert the user data into the database
//   const sql = 'INSERT INTO user (firstName, lastName, address, contactInfo) VALUES (?, ?, ?, ?)';
//   db.query(sql, [firstName, lastName, address, contactInfo], (err) => {
//     if (err) {
//       console.error('Error saving user data:', err);
//       res.status(500).send('Error saving user data');
//     } else {
//       res.status(200).json({
//         message: 'Image received successfully',
//         image: image,
//         imageName: fileName,
//         imageType : fileType,
//       });
//       console.log('User data saved successfully');
//       try {
//         const imageUrl = uploadImageToS3(image, fileName,contactInfo,fileType);
//         return res.status(200).json({ imageUrl });
//       } catch (error) {
//         console.error('Error uploading image:', error);
//         return res.status(500).json({ error: 'Image upload failed' });
//       }
      
//     }
//   });
// }



import db from '../../../config/db';
import { uploadImageToS3 } from '../../../config/s3-credentials';

export default function handler(req, res) {
  const { firstName, lastName, address, contactInfo, image, fileName,fileType } = req.body;
  const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
  const imageBuffer = Buffer.from(base64Data, 'base64');
  
  const sql = 'INSERT INTO user (firstName, lastName, address, contactInfo) VALUES (?, ?, ?, ?)';
  db.query(sql, [firstName, lastName, address, contactInfo], (err) => {
    if (err) {
      console.error('Error saving user data:', err);
      return res.status(500).send('Error saving user data');
    } else {
      try {
        const imageUrl = uploadImageToS3(imageBuffer, fileName, contactInfo,fileType);
        return res.status(200).json({ imageUrl });
      } catch (error) {
        console.error('Error uploading image:', error);
        return res.status(500).json({ error: 'Image upload failed' });
      }
    }
  });
}
