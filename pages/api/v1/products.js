// import { Restaurant } from '@mui/icons-material';
import db from '../../../config/db';


{/* <ButtonAppBar /> */}
export default function  handler(req,res){
    if (req.method == 'GET'){
            db.query(
                'SELECT * FROM products',(error,result) =>{
                    if(error){
                        console.error('Error executing mysqli query',error);
                        res.status(500).json({
                        message: 'Error fetching data for products'
                       
                        });
                    }
                    else{
                        res.status(200).json({data : result});
                    }
                }
            );

        // res.status(200).json({
        //     message: 'Hello World'
        // })
    } else if (req.method === 'POST'){
        const {productName,productPrice,productWeight,productQuantity,productDescription} = req.body;
        // console.log(req.body);
        const sql ='INSERT INTO products (productName, productPrice, productWeight, productQuantity, productDescription) VALUES(?,?,?,?,?)';
        db.query(sql, [productName, productPrice, productWeight, productQuantity, productDescription], (err)=>{
            if(err){
                console.error('Error saving data in DB',err);
                // return err;
            }
        });
    }   else if (req.method === 'PUT'){
        const product = req.body;
        const sql = 'UPDATE products SET productName = ?, productPrice = ?, productWeight = ?, productQuantity = ?,productDescription = ? WHERE _id = ?';
        db.query(sql,[product.productName,product.productPrice,product.productWeight,product.productQuantity,product.productDescription,product.id], (err) => {
            if (err) {
              console.error('Error updating products Data');
              res.status(404).send(_500).send('Error updating user');
            }else {
              res.status(200).send('ok');
            }
          });
    }
}
