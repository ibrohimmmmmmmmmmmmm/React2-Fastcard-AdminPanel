import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

/* =========================
   PRODUCT TYPE (SWAGGER)
========================= */
export interface Product {
  id: number
  productName: string
  price: number
  quantity: number
  categoryId: number
  categoryName?: string
  description?: string
}

/* =========================
   GET PRODUCTS
========================= */
export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get("/Product/get-products")

  return response.data?.data?.products ?? []
}

/* =========================
   DELETE PRODUCT
========================= */
export const deleteProduct = async (id: number) => {
  await api.delete(`/Product/delete-product?id=${id}`)
}

/* =========================
   UPDATE PRODUCT
   (VERY IMPORTANT FIX)
========================= */
export const updateProduct = async (
  id: number,
  payload: Partial<Product>
): Promise<Product> => {
  const response = await api.put("/Product/update-product", {
    Id: id,
    ProductName: payload.productName,
    Price: payload.price,
    Quantity: payload.quantity,
    CategoryId: payload.categoryId,
  })

  return response.data?.data ?? response.data
}

/* =========================
   SEARCH PRODUCTS
========================= */
export const searchProducts = async (query: string): Promise<Product[]> => {
  const response = await api.get("/Product/get-products", {
    params: {
      ProductName: query,
    },
  })

  return response.data?.data?.products ?? []
}

/* =========================
   ADD PRODUCT (POST)
========================= */
export interface SubCategory {
  id: number
  subCategoryName: string
  categoryId: number
}

export interface Category {
  id: number
  categoryName: string
  categoryImage: string | null
  subCategories: SubCategory[]
}

export interface Brand {
  id: number
  brandName: string
}

export interface Color {
  id: number
  colorName: string
}

export const addProduct = async (formData: FormData): Promise<any> => {
  const response = await api.post("/Product/add-product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get("/Category/get-categories")
  return response.data?.data ?? []
}

/* =========================
   GET BRANDS
========================= */
export const getBrands = async (): Promise<Brand[]> => {
  const response = await api.get("/Brand/get-brands")
  return response.data?.data?.brands ?? []
}

/* =========================
   GET COLORS
========================= */
export const getColors = async (): Promise<Color[]> => {
  const response = await api.get("/Color/get-colors")
  return response.data?.data ?? []
}