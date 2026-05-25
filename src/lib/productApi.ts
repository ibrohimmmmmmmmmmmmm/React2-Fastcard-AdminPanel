import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export interface Product {
  id: number
  name: string
  price: number
  inventory: string
  category: string
}

const normalizeResponse = (data: any): Product[] => {
  const items = Array.isArray(data)
    ? data
    : data?.data && Array.isArray(data.data)
    ? data.data
    : []

  return items.map((item: any) => ({
    id: Number(item.id),
    name: String(item.name ?? ''),
    price: Number(item.price ?? 0),
    inventory: String(item.inventory ?? ''),
    category: String(item.category ?? ''),
  }))
}

// Mock products data since /api/products endpoint doesn't exist in Swagger
const mockProducts: Product[] = [
  { id: 1, name: 'Laptop', price: 999.99, inventory: '15', category: 'Electronics' },
  { id: 2, name: 'Mouse', price: 29.99, inventory: '50', category: 'Electronics' },
  { id: 3, name: 'Keyboard', price: 79.99, inventory: '30', category: 'Electronics' },
  { id: 4, name: 'Monitor', price: 299.99, inventory: '10', category: 'Electronics' },
  { id: 5, name: 'USB Cable', price: 9.99, inventory: '100', category: 'Accessories' },
]

export const getProducts = async (): Promise<Product[]> => {
  // Mock data - /api/products endpoint doesn't exist in Swagger
  console.log('Using mock products data')
  return mockProducts
}

export const deleteProduct = async (id: number) => {
  // Mock delete - would call /products/{id} if endpoint existed
  console.log('Mock delete product:', id)
}

export const updateProduct = async (
  id: number,
  payload: Partial<Product>
): Promise<Product> => {
  // Mock update - would call /products/{id} if endpoint existed
  console.log('Mock update product:', id, payload)
  return { id, name: '', price: 0, inventory: '', category: '', ...payload }
}

export const searchProducts = async (query: string): Promise<Product[]> => {
  // Mock search
  return mockProducts.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  )
}
