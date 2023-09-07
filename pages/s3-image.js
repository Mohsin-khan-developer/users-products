import React from 'react';
import uploadToS3 from '../config/s3-credentials';

export default function S3ImagePage() {
  async function handleImageUpload(event) {
    event.preventDefault();
    // alert('Uploading');

    const file = event.target.files[0];
    const fileName = file.name;

    try {
      const response = await uploadToS3(file, fileName);
      console.log('Image uploaded successfully!', response.Location);
      console.log({fileName});
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  return (
    <form>
      <input type="file" onChange={handleImageUpload} />
      <button type="submit">Upload-image</button>
    </form>
  );
}




// import { useState } from 'react';
// import { uploadImageToS3 } from '../config/s3-credentials';

// export default function UploadImagePage() {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       console.error('No file selected.');
//       return;
//     }

//     try {
//       const imageUrl = await uploadImageToS3(selectedFile, selectedFile.name);
//       console.log('Image URL:', imageUrl);
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload Image</button>
//     </div>
//   );
// }
