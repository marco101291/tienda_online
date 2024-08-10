import { Product } from "../models/Product.js";
import { Purchase } from "../models/Purchase.js";

export const getProducts = async (req, res) =>{
     const products = await Product.findAll();
     res.json(products);
}

export const getProductById = async (req, res) => {
     const product = await Product.findByPk(req.params.id);
     if(product){
          res.json(product);
     } else{
          res.status(404).json({error: 'Product not found'})
     }
}

export const purchaseProduct = async (req, res) => {
     try {
       const { userId, products, totalAmount, purchaseDate } = req.body;
       const authenticatedUserId = req.userId; // ID del usuario autenticado

       console.log("products from productController", products)
   
       if (!products || products.length === 0) {
         return res.status(400).json({ error: 'No products provided for purchase' });
       }
   
       
       // Calculate total amount
       let calculatedTotalAmount = 0;
       const productDetails = await Promise.all(
         products.map(async (product) => {
           const dbProduct = await Product.findByPk(product.id);
           if (!dbProduct) {
             throw new Error(`Product with id ${product.id} not found`);
           }
           calculatedTotalAmount += dbProduct.price * product.quantity;
           return {
             id: dbProduct.id,
             name: dbProduct.name,
             price: dbProduct.price,
             quantity: product.quantity,
             description: dbProduct.description,
             image: dbProduct.image,
           };
         })
       );
   
       const finalTotalAmount = totalAmount || calculatedTotalAmount;
   
       // Create purchase for purchase table
       const newPurchase = await Purchase.create({
         userId: authenticatedUserId,
         products: productDetails,
         totalAmount: finalTotalAmount,
         purchaseDate: purchaseDate || new Date(), // Usar la fecha proporcionada o la actual
       });
   
       res.status(201).json({ message: 'Purchase successful', purchase: newPurchase });
     } catch (error) {
       console.error(error);
       res.status(500).json({ error: 'Purchase failed. Try again' });
     }
   };
