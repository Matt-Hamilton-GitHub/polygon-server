import { Schema, model } from 'mongoose';

// ---------- Types ----------

export interface ISTThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface ISTProductImage {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails: {
    small: ISTThumbnail;
    large: ISTThumbnail;
    full: ISTThumbnail;
  };
}

export interface ISTProduct {
  id: string; // original product id, e.g. "recZkNf2kwmdBcqd0"
  name: string;
  price: number; // in cents, e.g. 25999 = $259.99
  stock: number;
  stars: number;
  reviews: number;
  colors: string[]; // hex values
  company: string;
  category: string;
  description: string;
  shipping: boolean;
  featured: boolean;
  images: ISTProductImage[];
}

// ---------- Sub-schemas ----------

const thumbnailSchema = new Schema<ISTThumbnail>(
  {
    url: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  { _id: false, id: false }
);

const imageSchema = new Schema<ISTProductImage>(
  {
    id: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    url: { type: String, required: true },
    filename: { type: String, required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
    thumbnails: {
      small: { type: thumbnailSchema, required: true },
      large: { type: thumbnailSchema, required: true },
      full: { type: thumbnailSchema, required: true },
    },
  },
  { _id: false, id: false }
);

// ---------- Main schema ----------

const CATEGORIES = ['office', 'living room', 'kitchen', 'bedroom', 'dining', 'kids'];
const HEX_COLOR = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

const stproductSchema = new Schema<ISTProduct>(
  {
    id: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true, lowercase: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    stars: { type: Number, min: 0, max: 5, default: 0 },
    reviews: { type: Number, min: 0, default: 0 },
    colors: {
      type: [{ type: String, match: HEX_COLOR }],
      default: [],
    },
    company: { type: String, required: true, trim: true, lowercase: true },
    category: { type: String, required: true, trim: true, lowercase: true, enum: CATEGORIES },
    description: { type: String, required: true, trim: true },
    shipping: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    images: { type: [imageSchema], default: [] },
  },
  {
    versionKey: false, // drops the __v field
    id: false, // we store our own `id` field, so skip mongoose's virtual id
  }
);

// Indexes for the filters a store usually needs
stproductSchema.index({ category: 1 });
stproductSchema.index({ company: 1 });
stproductSchema.index({ featured: 1 });
stproductSchema.index({ price: 1 });
stproductSchema.index({ name: 'text', description: 'text' }); // for text search

// Third argument pins the collection name to "products"
const STProduct = model<ISTProduct>('STProduct', stproductSchema, 'single-stock-product');

export default STProduct;