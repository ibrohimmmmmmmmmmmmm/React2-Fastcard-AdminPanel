import { useEffect, useMemo, useState } from 'react'
import { Search, Plus, Edit, Trash2 } from 'lucide-react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { Checkbox } from '../../components/ui/checkbox'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog'
import {
  deleteProduct,
  getProducts,
  updateProduct,
  type Product,
} from '../../lib/productApi'

const productSchema = yup.object({
  name: yup.string().required('Name is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .positive('Price must be greater than 0')
    .required('Price is required'),
  inventory: yup.string().required('Inventory is required'),
  category: yup.string().required('Category is required'),
})

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [pendingDeleteIds, setPendingDeleteIds] = useState<number[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const response = await getProducts()
      setProducts(response)
    } catch (error) {
      setToast({ type: 'error', message: 'Failed to load products.' })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (toast) {
      const timeout = window.setTimeout(() => setToast(null), 3000)
      return () => window.clearTimeout(timeout)
    }
  }, [toast])

  useEffect(() => {
    setSelectedRows((current) =>
      current.filter((id) => products.some((product) => product.id === id))
    )
  }, [products])

  const visibleProducts = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase()
    if (!normalizedTerm) {
      return products
    }

    return products.filter((product) =>
      product.name.toLowerCase().includes(normalizedTerm)
    )
  }, [products, searchTerm])

  const isAllSelected =
    visibleProducts.length > 0 &&
    visibleProducts.every((product) => selectedRows.includes(product.id))

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    )
  }

  const toggleAllRows = () => {
    if (isAllSelected) {
      setSelectedRows([])
      return
    }

    setSelectedRows(visibleProducts.map((product) => product.id))
  }

  const openDeleteDialog = (ids: number[]) => {
    setPendingDeleteIds(ids)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    setIsDeleting(true)
    try {
      await Promise.all(pendingDeleteIds.map((id) => deleteProduct(id)))
      setToast({
        type: 'success',
        message:
          pendingDeleteIds.length > 1
            ? 'Selected products deleted successfully.'
            : 'Product deleted successfully.',
      })
      setSelectedRows([])
      setDeleteDialogOpen(false)
      await fetchProducts()
    } catch (error) {
      setToast({ type: 'error', message: 'Unable to delete product(s).' })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product)
    setEditModalOpen(true)
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: selectedProduct?.name ?? '',
      price: selectedProduct?.price ?? 0,
      inventory: selectedProduct?.inventory ?? '',
      category: selectedProduct?.category ?? '',
    },
    validationSchema: productSchema,
    onSubmit: async (values) => {
      if (!selectedProduct) {
        return
      }

      setIsSaving(true)
      try {
        await updateProduct(selectedProduct.id, {
          name: values.name,
          price: Number(values.price),
          inventory: values.inventory,
          category: values.category,
        })
        setToast({ type: 'success', message: 'Product updated successfully.' })
        setEditModalOpen(false)
        await fetchProducts()
      } catch (error) {
        setToast({ type: 'error', message: 'Failed to update product.' })
      } finally {
        setIsSaving(false)
      }
    },
  })

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>

        <div className="flex flex-wrap items-center gap-3">
          {selectedRows.length > 0 && (
            <Button
              variant="destructive"
              className="bg-red-600 text-white"
              onClick={() => openDeleteDialog(selectedRows)}
            >
              Delete Selected
            </Button>
          )}
          <Button className="bg-blue-600 p-5 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Add order
          </Button>
        </div>
      </div>

      {isLoading && (
        <div className="mb-4 text-sm text-slate-500">Loading products...</div>
      )}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search..."
            className="pl-9"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            disabled={isLoading}
          />
        </div>
        <Select defaultValue="newest">
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Newest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" disabled={isLoading}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" disabled={isLoading}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox checked={isAllSelected} onCheckedChange={toggleAllRows} />
              </TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  {isLoading ? 'Loading products...' : 'No products found'}
                </TableCell>
              </TableRow>
            ) : (
              visibleProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(product.id)}
                      onCheckedChange={() => toggleRow(product.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-md" />
                    {product.name}
                  </TableCell>
                  <TableCell>{product.inventory}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditClick(product)}
                    >
                      <Edit className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openDeleteDialog([product.id])}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 rounded-2xl px-4 py-3 text-sm shadow-xl ${
            toast.type === 'success'
              ? 'bg-emerald-500 text-white'
              : 'bg-red-500 text-white'
          }`}
        >
          {toast.message}
        </div>
      )}

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product details and save your changes.</DialogDescription>
          </DialogHeader>

          <form onSubmit={formik.handleSubmit} className="space-y-4 mt-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="name">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name && formik.errors.name ? (
                <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
              ) : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="price">
                Price
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                min={0}
                step="0.01"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.price && formik.errors.price ? (
                <p className="mt-1 text-sm text-red-500">{formik.errors.price}</p>
              ) : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="inventory">
                Inventory
              </label>
              <Input
                id="inventory"
                name="inventory"
                value={formik.values.inventory}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.inventory && formik.errors.inventory ? (
                <p className="mt-1 text-sm text-red-500">{formik.errors.inventory}</p>
              ) : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="category">
                Category
              </label>
              <Input
                id="category"
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.category && formik.errors.category ? (
                <p className="mt-1 text-sm text-red-500">{formik.errors.category}</p>
              ) : null}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
