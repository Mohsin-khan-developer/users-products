// import Products from "../../../config/schema/productSchema";
// import User from "@/mongoconfig/schema/userSchema";
import "../../../mongoconfig/db";
import Products from "../../../mongoconfig/schema/productSchema";

export default async function handle(req, res) {
    // console.log(req.method)
try {
    if (req.method === "GET") {
        const allDataa = await Products.find()
        res.json({
            status: "success",
            data: allDataa,
            // request : "GetProduct"
        })
    
    }
    else if (req.method === "POST") {
        const newProduct = await Products.create(req.body)
        // console.log(newProduct);
        res.json({
                status: "success",
                data: newProduct,
                // request : "PostProduct"
            }) 
    }else if (req.method === "PUT") {
          const { id, productName, productPrice, productWeight, productQuantity, productDescription } = req.body;
      
          const updatedProduct = await Products.findByIdAndUpdate(
            id,
            {
              productName,
              productPrice,
              productWeight,
              productQuantity,
              productDescription,
            },
            { new: true }
          );
      
          if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
          }
      
          res.status(200).json(updatedProduct);
        } 
      } catch (error) {
    console.log(error);
        res.json({
            status: "error",
            error
            // data: error,
            // request : "PostProduct"
        })
    
}
}