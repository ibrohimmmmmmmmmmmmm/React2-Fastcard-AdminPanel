import { useCallback, useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Edit, Trash2, Layers3, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { addBrand, deleteBrand, getBrands, updateBrand, type Brand } from '../../lib/productApi'

const schema = yup.object({ brandName: yup.string().trim().required('Required') })
const PAGE_SIZE = 8

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [page, setPage] = useState(1)
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  const fetchBrands = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getBrands()
      setBrands(res?.data?.brands ?? res ?? [])
    } finally { setLoading(false) }
  }, [])

  useEffect(() => { fetchBrands() }, [fetchBrands])

  const paginatedBrands = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return brands.slice(start, start + PAGE_SIZE)
  }, [brands, page])

  const totalPages = Math.ceil(brands.length / PAGE_SIZE)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { brandName: selectedBrand?.brandName ?? '' },
    validationSchema: schema,
    onSubmit: async (values, { resetForm }) => {
      setSaving(true)
      try {
        selectedBrand ? await updateBrand(selectedBrand.id, values.brandName) : await addBrand(values.brandName)
        setOpenDialog(false); setSelectedBrand(null); resetForm(); await fetchBrands()
      } finally { setSaving(false) }
    },
  })

  return (
    <div className="space-y-6  animate-in fade-in duration-500">
      {/* HEADER SECTION */}
    
      {/* TABLE SECTION */}
      <div className="border rounded-2xl bg-white shadow-sm overflow-hidden">
        <div className="p-6 flex justify-between items-center border-b">
          <div>
            <h2 className="text-xl font-bold">Brands</h2>
            <p className="text-sm text-slate-500">Manage all your product brands</p>
          </div>
          <Button onClick={() => { setSelectedBrand(null); setOpenDialog(true) }} className="rounded-full">
            <Plus size={16} className="mr-2" /> Add new
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow><TableHead>Brand Name</TableHead><TableHead className="text-right">Actions</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {paginatedBrands.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-medium">{b.brandName}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => { setSelectedBrand(b); setOpenDialog(true) }}><Edit size={16} className="text-blue-600" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteBrand(b.id).then(fetchBrands)}><Trash2 size={16} className="text-red-500" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* SHADCN-STYLE PAGINATION */}
        <div className="p-4 flex items-center justify-between border-t">
          <p className="text-sm text-slate-500">Page {page} of {totalPages || 1}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}><ChevronLeft size={16}/></Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}><ChevronRight size={16}/></Button>
          </div>
        </div>
      </div>

      {/* DIALOG FORM */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedBrand ? 'Edit Brand' : 'Create New Brand'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={formik.handleSubmit} className="space-y-4 py-4">
            <Input name="brandName" value={formik.values.brandName} onChange={formik.handleChange} placeholder="Enter brand name..." />
            <Button type="submit" className="w-full" disabled={saving}>{saving ? 'Saving...' : 'Confirm'}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}