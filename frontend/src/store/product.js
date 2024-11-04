import { create } from 'zustand'

export const useProductStore = create(set => ({
  products: [],
  setProducts: products => set({ products }),
  // 新增产品
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: 'Please fill in all fidles.'}
    }
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduct)
    })

    const data = res.json()
    set(state => ({ products: [...state.products, data.data]}))
    return { success: true, message: 'Product created successfully'}
  },
  // 获取产品列表
  fetchProducts: async () => {
    const res = await fetch('/api/products')
    const data = await res.json()
    set({ products: data.data })
  },
  // 删除产品
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: 'DELETE'
    })

    const data = await res.json()
    if (data.status === 'error') return { success: false, message: data.message }

    // 更新 UI 数据
    set(state => ({ products: state.products.filter(item => item._id !== pid) }))
    return { success: true, message: data.message }
  },
  // 更新产品
  updateProduct: async (id, updateProduct) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateProduct)
    })

    const data = await res.json()
    if (data.status === 'error') return { success: false, message: data.message }

    set(state => ({ products: state.products.map(item => (item._id === id ? data.data : item))}))
    return { success: true, message: data.message }
  }
}))
