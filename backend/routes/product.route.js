import express from 'express'
import Product from '../models/product.model.js'
import { getProducts, createProduct, updateProduct, deleteProduct} from '../controllers/product.controller.js'

const router = express.Router()

// 获取所有的 产品
router.get('/', getProducts)

// 新增产品
router.post('/', createProduct)

// 更新产品
router.put('/:id', updateProduct)

// 删除产品
router.delete('/:id', deleteProduct)

export default router
