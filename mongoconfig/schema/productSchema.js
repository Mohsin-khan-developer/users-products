import { Schema , model } from 'mongoose';

const prodSchema = new Schema({
    productName: {
        type: String,
        // required: [true, 'enter product name']
    },
    productPrice: {
        type: String,
        // required: [true, 'enter product price']
    },
    productWeight: {
        type: String,
        // required: [true, 'enter product weight']
    },
    productQuantity: {
        type: String,
        // required: [true, 'enter product quantity']
    },
    productDescription: {
        type: String,
        // required: [true, 'enter product description']
    },
    // productImage: {
    //     type: String,
    //     required: true
    //   }
});


let Products;

try {
    Products = model("product");
    } catch (error) {
        Products = model("product", prodSchema);
    }

    export default Products;    