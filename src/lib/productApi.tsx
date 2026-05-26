import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

/* =========================
   TYPES
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

/* =========================
   PRODUCTS
========================= */

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get("/Product/get-products")

  const data = response.data?.data

  return Array.isArray(data)
    ? data
    : data?.products ?? []
}

export const deleteProduct = async (id: number) => {
  await api.delete(`/Product/delete-product?id=${id}`)
}

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

export const searchProducts = async (query: string): Promise<Product[]> => {
  const response = await api.get("/Product/get-products", {
    params: {
      ProductName: query,
    },
  })

  const data = response.data?.data

  return Array.isArray(data)
    ? data
    : data?.products ?? []
}

export const addProduct = async (formData: FormData): Promise<any> => {
  const response = await api.post("/Product/add-product", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return response.data
}

/* =========================
   CATEGORIES
========================= */

export const getCategories = async (query?: string): Promise<Category[]> => {
  const response = await api.get("/Category/get-categories", {
    params: query ? { CategoryName: query } : {},
  })

  const raw = response.data?.data

  if (Array.isArray(raw)) return raw

  return raw?.categories ?? raw?.data ?? []
}

export const addCategory = async (payload: {
  categoryName: string
  categoryImage?: File | null
}): Promise<Category> => {
  const formData = new FormData()
  formData.append("CategoryName", payload.categoryName)

  if (payload.categoryImage) {
    formData.append("CategoryImage", payload.categoryImage)
  }

  const response = await api.post("/Category/add-category", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return response.data?.data ?? response.data
}

export const updateCategory = async (
  id: number,
  payload: {
    categoryName: string
    categoryImage?: File | null
  }
): Promise<Category> => {
  const formData = new FormData()

  formData.append("Id", String(id))
  formData.append("CategoryName", payload.categoryName)

  if (payload.categoryImage) {
    formData.append("CategoryImage", payload.categoryImage)
  }

  const response = await api.put("/Category/update-category", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return response.data?.data ?? response.data
}

export const deleteCategory = async (id: number) => {
  await api.delete(`/Category/delete-category?id=${id}`)
}

/* =========================
   BRANDS (FIXED 🔥)
========================= */

export const getBrands = async (query?: string): Promise<Brand[]> => {
  const response = await api.get("/Brand/get-brands", {
    params: query ? { BrandName: query } : {},
  })

  return response.data?.data?.brands ?? []
}

export const addBrand = async (brandName: string): Promise<Brand> => {
  const response = await api.post("/Brand/add-brand", {
    brandName, // ✅ FIXED (was BrandName)
  })

  return response.data?.data ?? response.data
}

export const updateBrand = async (
  id: number,
  brandName: string
): Promise<Brand> => {
  const response = await api.put("/Brand/update-brand", {
    id: id,
    brandName, // ✅ FIXED
  })

  return response.data?.data ?? response.data
}

export const deleteBrand = async (id: number) => {
  await api.delete(`/Brand/delete-brand?id=${id}`)
}

/* =========================
   COLORS
========================= */

export const getColors = async (): Promise<Color[]> => {
  const response = await api.get("/Color/get-colors")
  return response.data?.data ?? []
}