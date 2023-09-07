import db from '../../../config/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    db.query('SELECT * FROM user', (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        return res.status(500).json({ error: 'Error fetching products from the database' });
      } else {
        return res.status(200).json({ data: results });
      }
    });
  } else if (req.method === 'POST') {
    const { firstName, lastName, address, contactInfo } = req.body;
    // console.log(req.body);
  
    // Insert the user data into the database
    const sql = 'INSERT INTO user (firstname, lastname, address, contactInfo) VALUES (?, ?, ?, ?)';
    db.query(sql, [firstName, lastName, address, contactInfo], (err) => {
      if (err) {
        console.error('Error saving user data:', err);
        res.status(500).send('Error saving user data');
      } else {
        res.status(200).send('OK');
      }
    });
    
  }  else if (req.method === 'PUT') {
    // const id = req.body._id;
    // const {firstName,lastName,address,contactInfo} =req.body;
    const user = req.body;
    // console.log(user.firstName,user.lastName,user.id);
    const sql = 'UPDATE user SET firstName = ?, lastName = ?, address = ?, contactInfo = ? WHERE _id = ?';
    // const updateProduct = query({
    //   query: "UPDATE user SET firstName = ?, lastName = ?, address = ?, contactInfo = ? WHERE _id = ?",
    //   values: [user.firstName, user.lastName, user.address, user.contactInfo, user.id],
    // });
    
    
    // const results = updateProduct.affectedRows;
    // if (results) {
    //   message = "Successfully updated.";
    // } else {
    //   message = "Error updating product.";
    // }
    
   
    db.query(sql,[user.firstName,user.lastName,user.address,user.contactInfo,user.id], (err) => {
      if (err) {
        console.error('Error updating user Data');
        res.status(404).send(_500).send('Error updating user');
      }else {
        res.status(200).send('ok');
      }
    });


  } else {
    res.status(405).send('Method Not Allowed');
  }
  
}
