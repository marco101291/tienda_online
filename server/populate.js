import axios from 'axios';
import {Product} from './models/Product.js';
import {sequelize} from './utils/db.js';

const MAX_DESCRIPTION_LENGTH = 255;

const truncateText = (text, MaxLength) => {
     return text.length > MaxLength ? text.substring(0, MaxLength) : text
}

const populateDB = async () =>{
     await sequelize.sync({force: true});

     const fetchUrl = 'https://fakestoreapi.com/products'

     const {data} = await axios.get(fetchUrl);
     console.log("Data fetched from fakestoreapi");
     

     for(const item of data){
          await Product.create({
               name: item.title,
               description: truncateText(item.description, MAX_DESCRIPTION_LENGTH),
               price: item.price,
               image: item.image
          });
          console.log("Database populated", item);
     }
     
};

populateDB().then(()=>{
     process.exit();
}).catch((error)=>{
     console.error('Error populating database', error);
     process.exit(1);
     
})