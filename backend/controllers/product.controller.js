import mongoose from 'mongoose';
import Product from '../models/product.model.js'

// 获取所有产品
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json({ status: 'success', data: products })
  } catch (err) {
    console.error(`Error in find products: ${err.message}`)
    res.status(500).json({ status: 'error', message: 'Server error'})
  }
}

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body
  if (!name || !price || !image) {
    return res.status(200).json({ status: 'error', message: 'Please fill in all fidles.'})
  }
  const newProduct = new Product({ name, price, image })
  try {
    await newProduct.save()
    res.status(200).json({ status: 'success', data: newProduct})
  } catch (err) {
    console.error(`Error in Create Product: ${err.message}`)
    res.status(500).json({ status: 'error', message: err.message })
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params
  const product = req.body
  // 判断 id 是否有效
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(200).json({ status: 'error', message: 'id is not found'})
  }

  try {
    const newProduct = await Product.findByIdAndUpdate(id, product, { new: true })
    res.status(200).json({ status: 'success', data: newProduct })
  } catch (err) {
    console.error(`Error in update producr: ${err.message}`)
    res.status(500).json({ status: 'error', message: 'Server error'})
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    await Product.findByIdAndDelete(id)
    res.status(200).json({ status: 'success', message: 'Produce delete'})
  } catch (err) {
    console.error(`Error in delete produce: ${err.message}`)
    res.status(500).json({ status: 'error', message: 'Server error'})
  }
}
