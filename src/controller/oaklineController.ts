import type { Request, Response } from 'express';
import Product = require('../models/oakline/Product');
import STProduct from '../models/oakline/SingleProduct';

export const getAllProducts = async (req: Request, res: Response) => {
    console.log('get all products @ oakline called')
  try {
    const all_products = await Product.find();
    console.log(all_products)
    res.status(200).json(all_products);
  } catch (err) {
    console.error('ERROR ENCOUNTERED', err);
    res.status(500).send('SERVER ERROR @ OAKLINE GET ALL PRODUCTS');
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const {id} = req.query;
    const prod_id = id;

    if (typeof id !== 'string') {
      res.status(400).send('Missing or invalid product ID');
      return;
    }

    const product = await STProduct.find({id:prod_id});

    if (!product) {
      res.status(404).send('Product not found');
      return;
    }

    res.json(product);
  } catch (err) {
    console.error('ERROR ENCOUNTERED', err);
    res.status(500).send('SERVER ERROR @ OAKLINE GET PRODUCT BY ID');
  }
};