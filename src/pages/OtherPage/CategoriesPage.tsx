import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Smartphone,
  Monitor,
  Watch,
  Headphones,
  Camera,
  Gamepad2,
  ImageIcon,
  FolderOpen,
} from 'lucide-react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { Checkbox } from '../../components/ui/checkbox'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog'

import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
  type Category,
} from '../../lib/productApi'

const IMAGE_URL = import.meta.env.VITE_IMAGE_URL

const PAGE_SIZE = 10

const categorySchema = yup.object({
  name: yup.string().trim().required('Category name is required'),

  image: yup
    .mixed()
    .nullable()
    .test(
      'fileType',
      'Only PNG, JPG, SVG, WEBP or GIF files are supported',
      (value) => {
        if (!value) return true

        return (
          value instanceof File &&
          [
            'image/jpeg',
            'image/png',
            'image/svg+xml',
            'image/gif',
            'image/webp',
          ].includes(value.type)
        )
      }
    ),
})

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const [page, setPage] = useState(1)

  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null)

  const [toast, setToast] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  /* =========================
     FETCH CATEGORIES
  ========================= */

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true)

      const response = await getCategories()

      setCategories(response)
    } catch (error) {
      setToast({
        type: 'error',
        message: 'Failed to fetch categories',
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    if (!toast) return

    const timer = setTimeout(() => {
      setToast(null)
    }, 3000)

    return () => clearTimeout(timer)
  }, [toast])

  /* =========================
     FIXED SEARCH
  ========================= */

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categories

    return categories.filter((category) =>
      category.categoryName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  }, [categories, searchTerm])

  /* =========================
     PAGINATION
  ========================= */

  const paginatedCategories = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE

    return filteredCategories.slice(start, start + PAGE_SIZE)
  }, [filteredCategories, page])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCategories.length / PAGE_SIZE)
  )

  /* =========================
     SELECT
  ========================= */

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    )
  }

  /* =========================
     ICONS
  ========================= */

  const iconMap: Record<string, JSX.Element> = {
    phones: <Smartphone className="h-8 w-8 text-slate-500" />,
    computers: <Monitor className="h-8 w-8 text-slate-500" />,
    smartwatch: <Watch className="h-8 w-8 text-slate-500" />,
    headphones: <Headphones className="h-8 w-8 text-slate-500" />,
    camera: <Camera className="h-8 w-8 text-slate-500" />,
    gaming: <Gamepad2 className="h-8 w-8 text-slate-500" />,
  }

  const getCategoryIcon = (name: string) => {
    const key = name.toLowerCase().replace(/\s+/g, '')

    return (
      iconMap[key] ?? (
        <ImageIcon className="h-8 w-8 text-slate-400" />
      )
    )
  }

  /* =========================
     REFRESH
  ========================= */

  const refresh = async () => {
    await fetchCategories()
    setSelectedIds([])
  }

  /* =========================
     DELETE
  ========================= */

  const handleDelete = async () => {
    try {
      setIsDeleting(true)

      await Promise.all(
        selectedIds.map((id) => deleteCategory(id))
      )

      setToast({
        type: 'success',
        message: 'Category deleted successfully',
      })

      setDeleteDialogOpen(false)

      refresh()
    } catch (error) {
      setToast({
        type: 'error',
        message: 'Failed to delete category',
      })
    } finally {
      setIsDeleting(false)
    }
  }

  /* =========================
     FORMIK
  ========================= */

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: selectedCategory?.categoryName || '',
      image: null as File | null,
    },

    validationSchema: categorySchema,

    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSaving(true)

        const payload = {
          categoryName: values.name,
          categoryImage: values.image,
        }

        if (selectedCategory) {
          await updateCategory(selectedCategory.id, payload)

          setToast({
            type: 'success',
            message: 'Category updated successfully',
          })
        } else {
          await addCategory(payload)

          setToast({
            type: 'success',
            message: 'Category created successfully',
          })
        }

        resetForm()

        setDialogOpen(false)

        setSelectedCategory(null)

        refresh()
      } catch (error) {
        setToast({
          type: 'error',
          message: 'Something went wrong',
        })
      } finally {
        setIsSaving(false)
      }
    },
  })

  return (
    <div className="space-y-5">
      {/* TOP BAR */}

      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-[320px]">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <Input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPage(1)
              }}
              placeholder="Search category"
              className="h-12 rounded-xl border-slate-200 pl-11"
            />
          </div>

          <div className="flex items-center gap-3">
            {selectedIds.length > 0 && (
              <Button
                variant="destructive"
                className="h-11 rounded-xl"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete ({selectedIds.length})
              </Button>
            )}

            <Button
              className="h-11 rounded-xl bg-blue-600 px-5 hover:bg-blue-700"
              onClick={() => {
                setSelectedCategory(null)
                setDialogOpen(true)
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add category
            </Button>
          </div>
        </div>
      </div>

      {/* CARDS */}

      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="h-[240px] animate-pulse rounded-[24px] border border-slate-200 bg-slate-100"
            />
          ))
        ) : paginatedCategories.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-white py-20 text-center">
            <FolderOpen className="mb-4 h-12 w-12 text-slate-300" />

            <h3 className="text-lg font-semibold text-slate-700">
              No categories found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try creating a new category
            </p>
          </div>
        ) : (
          paginatedCategories.map((category) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-4 transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              {/* CHECKBOX */}

              <div className="absolute left-4 top-4 z-10">
                <Checkbox
                  checked={selectedIds.includes(category.id)}
                  onCheckedChange={() =>
                    toggleSelect(category.id)
                  }
                />
              </div>

              {/* EDIT */}

              <button
                onClick={() => {
                  setSelectedCategory(category)
                  setDialogOpen(true)
                }}
                className="absolute right-4 top-4 z-10 rounded-lg p-2 transition hover:bg-slate-100"
              >
                <Edit className="h-4 w-4 text-slate-500" />
              </button>

              {/* IMAGE */}

              <div className="flex h-[150px] items-center justify-center overflow-hidden rounded-[18px] bg-slate-50">
                {category.categoryImage ? (
                  <img
                    src={`${IMAGE_URL}/${category.categoryImage}`}
                    alt={category.categoryName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  getCategoryIcon(category.categoryName)
                )}
              </div>

              {/* INFO */}

              <div className="mt-5 text-center">
                <h3 className="line-clamp-1 text-[17px] font-semibold text-slate-800">
                  {category.categoryName}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {category.subCategories?.length || 0} sub categories
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* PAGINATION */}

      {totalPages > 1 && (
        <div className="flex items-center justify-between rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="rounded-xl"
              disabled={page === 1}
              onClick={() =>
                setPage((prev) => Math.max(prev - 1, 1))
              }
            >
              Previous
            </Button>

            <Button
              variant="outline"
              className="rounded-xl"
              disabled={page === totalPages}
              onClick={() =>
                setPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* CREATE / EDIT */}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="overflow-hidden rounded-[30px] border-none p-0 sm:max-w-[520px]">
          <div className="border-b border-slate-100 px-7 py-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-900">
                {selectedCategory
                  ? 'Edit category'
                  : 'Create category'}
              </DialogTitle>

              <DialogDescription className="pt-1 text-slate-500">
                Manage your product categories easily.
              </DialogDescription>
            </DialogHeader>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="space-y-5 p-7"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Category name
              </label>

              <Input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Enter category name"
                className="h-12 rounded-xl"
              />

              {formik.touched.name &&
                formik.errors.name && (
                  <p className="mt-2 text-sm text-red-500">
                    {formik.errors.name}
                  </p>
                )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Category image
              </label>

              <div className="rounded-2xl border border-dashed border-slate-300 p-5">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file =
                      e.currentTarget.files?.[0] || null

                    formik.setFieldValue('image', file)
                  }}
                />

                {formik.values.image && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                    <img
                      src={URL.createObjectURL(
                        formik.values.image
                      )}
                      alt="preview"
                      className="h-44 w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={() => {
                  setDialogOpen(false)
                  setSelectedCategory(null)
                }}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSaving}
                className="rounded-xl bg-blue-600 hover:bg-blue-700"
              >
                {isSaving
                  ? 'Saving...'
                  : selectedCategory
                  ? 'Save changes'
                  : 'Create category'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* DELETE */}

      <Dialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      >
        <DialogContent className="rounded-[28px]">
          <DialogHeader>
            <DialogTitle>
              Delete category
            </DialogTitle>

            <DialogDescription>
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              className="rounded-xl"
              disabled={isDeleting}
              onClick={handleDelete}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 rounded-2xl px-5 py-3 text-sm text-white shadow-xl ${
            toast.type === 'success'
              ? 'bg-emerald-500'
              : 'bg-red-500'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  )
}