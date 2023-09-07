import User from "../../../mongoconfig/schema/userSchema";
// import  "../../../config/db";
import "../../../mongoconfig/db";
import { uploadImageToS3 } from '../../../config/s3-credentials';
// zSAEiacXJYypUEGh

export default async function handler(req,res) {

   if(req.method === 'GET'){
    const allData = await User.find()
    res.json({
        // status:'success',
        data : allData,
    })
    
   } else if(req.method === "POST"){
    const {image, fileName,fileType,contactInfo } = req.body;
  const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
  const imageBuffer = Buffer.from(base64Data, 'base64');

    const newUser = await User.create(req.body)
    if(newUser){
      const imageUrl = uploadImageToS3(imageBuffer, fileName, contactInfo,fileType);
        return res.status(200).json({ imageUrl });
    }
   
   }  else if (req.method === "PUT") {
    const { id, firstName, lastName, address, contactInfo } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          firstName,
          lastName,
          address,
          contactInfo
        },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  
}
