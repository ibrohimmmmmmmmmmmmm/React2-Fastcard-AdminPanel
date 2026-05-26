import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Upload, X, Plus, Save, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../../components/ui/dialog';
import {
  addProduct,
  getCategories,
  getBrands,
  getColors,
  type Category,
  type SubCategory,
  type Brand,
  type Color,
} from '../../lib/productApi';

const productSchema = yup.object({
  productName: yup.string().required('Product name is required'),
  code: yup.string().required('Code is required'),
  description: yup.string().required('Description is required'),
  categoryId: yup.number().typeError('Category is required').required('Category is required'),
  subCategoryId: yup.number().typeError('Subcategory is required').required('Subcategory is required'),
  brandId: yup.number().typeError('Brand is required').required('Brand is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .positive('Price must be greater than 0')
    .required('Price is required'),
  discountPrice: yup
    .number()
    .typeError('Discount price must be a number')
    .nullable()
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
  quantity: yup
    .number()
    .typeError('Quantity must be a number')
    .integer('Quantity must be an integer')
    .min(0, 'Quantity cannot be negative')
    .required('Quantity is required'),
  colorId: yup.number().typeError('Color is required').required('Color is required'),
  size: yup.string().required('Size is required'),
  weight: yup.string().required('Weight is required'),
});

const AddProductPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<{ name: string; url: string }[]>([]);

  // Fetch metadata from backend on mount
  useEffect(() => {
    const fetchMetadata = async () => {
      setIsLoadingMetadata(true);
      try {
        const [cats, brs, cols] = await Promise.all([
          getCategories(),
          getBrands(),
          getColors(),
        ]);
        setCategories(cats);
        setBrands(brs);
        setColors(cols);
      } catch (error) {
        setToast({ type: 'error', message: 'Failed to load categories, brands, or colors from backend.' });
      } finally {
        setIsLoadingMetadata(false);
      }
    };
    fetchMetadata();
    getCategories()
    getBrands()
    getColors()
  }, []);

  // Cleanup Object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [imagePreviews]);

  // Handle toast timeout
  useEffect(() => {
    if (toast) {
      const timeout = window.setTimeout(() => setToast(null), 4000);
      return () => window.clearTimeout(timeout);
    }
  }, [toast]);

  const formik = useFormik({
    initialValues: {
      productName: '',
      code: '',
      description: '',
      categoryId: '',
      subCategoryId: '',
      brandId: '',
      price: '',
      discountPrice: '',
      quantity: '',
      colorId: '',
      size: 'S',
      weight: '10',
    },
    validationSchema: productSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const formData = new FormData();
      formData.append('ProductName', values.productName);
      formData.append('Code', values.code);
      formData.append('Description', values.description);
      formData.append('Price', values.price.toString());
      if (values.discountPrice) {
        formData.append('DiscountPrice', values.discountPrice.toString());
      }
      formData.append('Quantity', values.quantity.toString());
      formData.append('CategoryId', values.categoryId.toString());
      formData.append('SubCategoryId', values.subCategoryId.toString());
      formData.append('BrandId', values.brandId.toString());
      formData.append('ColorId', values.colorId.toString());
      formData.append('Size', values.size);
      formData.append('Weight', values.weight);

      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          formData.append('Images', file);
        });
      }

      try {
        await addProduct(formData);
        setSuccessDialogOpen(true);
      } catch (error: any) {
        const errorMsg = error?.response?.data?.message || error?.message || 'Failed to add product.';
        setToast({ type: 'error', message: errorMsg });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const catId = Number(e.target.value);
    formik.setFieldValue('categoryId', catId || '');
    
    const selectedCat = categories.find((c) => c.id === catId);
    if (selectedCat && selectedCat.subCategories) {
      setSubCategories(selectedCat.subCategories);
      formik.setFieldValue('subCategoryId', '');
    } else {
      setSubCategories([]);
      formik.setFieldValue('subCategoryId', '');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
      
      const newPreviews = filesArray.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <form onSubmit={formik.handleSubmit} className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Products / <span className="text-gray-500">Add new</span></h1>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={18} /> {formik.isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      {isLoadingMetadata && (
        <div className="mb-4 text-sm text-slate-500">Connecting to API and loading options...</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="font-semibold mb-4">Information</h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-3">
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  placeholder="Product name"
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-2 border rounded-md"
                />
                {formik.touched.productName && formik.errors.productName ? (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.productName}</p>
                ) : null}
              </div>
              <div className="col-span-1">
                <input
                  type="text"
                  id="code"
                  name="code"
                  placeholder="Code"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-2 border rounded-md"
                />
                {formik.touched.code && formik.errors.code ? (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.code}</p>
                ) : null}
              </div>
            </div>
            
            <div className="mt-4">
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-2 border rounded-md h-32"
              ></textarea>
              {formik.touched.description && formik.errors.description ? (
                <p className="mt-1 text-sm text-red-500">{formik.errors.description}</p>
              ) : null}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formik.values.categoryId}
                  onChange={handleCategoryChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-2 border rounded-md text-gray-500 bg-white"
                >
                  <option value="">Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.categoryName}
                    </option>
                  ))}
                </select>
                {formik.touched.categoryId && formik.errors.categoryId ? (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.categoryId}</p>
                ) : null}
              </div>

              <div>
                <select
                  id="subCategoryId"
                  name="subCategoryId"
                  value={formik.values.subCategoryId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-2 border rounded-md text-gray-500 bg-white disabled:opacity-60"
                  disabled={subCategories.length === 0}
                >
                  <option value="">Sub Categories</option>
                  {subCategories.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.subCategoryName}
                    </option>
                  ))}
                </select>
                {formik.touched.subCategoryId && formik.errors.subCategoryId ? (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.subCategoryId}</p>
                ) : null}
              </div>

              <div>
                <select
                  id="brandId"
                  name="brandId"
                  value={formik.values.brandId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-2 border rounded-md text-gray-500 bg-white"
                >
                  <option value="">Brands</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.brandName}
                    </option>
                  ))}
                </select>
                {formik.touched.brandId && formik.errors.brandId ? (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.brandId}</p>
                ) : null}
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="font-semibold mb-4">Price</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Product price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-2 border rounded-md"
                />
                {formik.touched.price && formik.errors.price ? (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.price}</p>
                ) : null}
              </div>
              <div>
                <input
                  type="number"
                  id="discountPrice"
                  name="discountPrice"
                  placeholder="Discount"
                  value={formik.values.discountPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-2 border rounded-md"
                />
                {formik.touched.discountPrice && formik.errors.discountPrice ? (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.discountPrice}</p>
                ) : null}
              </div>
              <div>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  placeholder="Count"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full p-2 border rounded-md"
                />
                {formik.touched.quantity && formik.errors.quantity ? (
                  <p className="mt-1 text-sm text-red-500">{formik.errors.quantity}</p>
                ) : null}
              </div>
            </div>
            <label className="flex items-center gap-2 mt-4 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" /> Add tax for this product
            </label>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Different Options</h2>
              <div className="w-10 h-6 bg-blue-600 rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="space-y-6">
              {/* Size Option */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="text-sm font-medium text-slate-700">Size</span>
                <div className="col-span-2 flex flex-wrap gap-2">
                  {['S', 'M', 'L', 'XL'].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => formik.setFieldValue('size', s)}
                      className={`px-3 py-1 rounded text-sm font-medium border transition ${
                        formik.values.size === s
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-gray-100 text-gray-800 border-transparent hover:bg-gray-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              {formik.touched.size && formik.errors.size ? (
                <p className="text-sm text-red-500 ml-[33.3%]">{formik.errors.size}</p>
              ) : null}

              {/* Weight Option */}
              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="text-sm font-medium text-slate-700">Weight</span>
                <div className="col-span-2 flex flex-wrap gap-2">
                  {['10', '20', '30', '40'].map((w) => (
                    <button
                      type="button"
                      key={w}
                      onClick={() => formik.setFieldValue('weight', w)}
                      className={`px-3 py-1 rounded text-sm font-medium border transition ${
                        formik.values.weight === w
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-gray-100 text-gray-800 border-transparent hover:bg-gray-200'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
              {formik.touched.weight && formik.errors.weight ? (
                <p className="text-sm text-red-500 ml-[33.3%]">{formik.errors.weight}</p>
              ) : null}

              <button type="button" className="text-blue-600 flex items-center gap-1 font-medium">
                <Plus size={16} /> Add more
              </button>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="font-semibold mb-4">Colour</h2>
            <select
              id="colorId"
              name="colorId"
              value={formik.values.colorId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border rounded-md text-gray-500 bg-white"
            >
              <option value="">Select Color</option>
              {colors.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.colorName}
                </option>
              ))}
            </select>
            {formik.touched.colorId && formik.errors.colorId ? (
              <p className="mt-1 text-sm text-red-500">{formik.errors.colorId}</p>
            ) : null}
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="font-semibold mb-4">Tags</h2>
            <input type="text" placeholder="Tags name" className="w-full p-2 border rounded-md mb-2" />
            <div className="flex flex-wrap gap-2">
              {['T-Shirt', 'Men Clothes', 'Summer Collection'].map((t) => (
                <span key={t} className="bg-gray-100 px-2 py-1 rounded text-sm flex items-center gap-1">
                  {t} <X size={12} className="inline cursor-pointer" />
                </span>
              ))}
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="font-semibold mb-4">Images</h2>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed rounded-lg p-6 text-center text-gray-400 hover:border-blue-400 cursor-pointer"
            >
              <Upload className="mx-auto mb-2" />
              <p className="text-sm">Click to upload or drag and drop</p>
              <input
                type="file"
                multiple
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            
            {imagePreviews.length > 0 && (
              <div className="mt-4 space-y-3">
                {imagePreviews.map((img, i) => (
                  <div key={i} className="flex items-center justify-between p-2 border rounded-lg bg-slate-50">
                    <div className="flex items-center gap-3">
                      <img src={img.url} alt={img.name} className="w-10 h-10 object-cover rounded-md border" />
                      <span className="text-sm font-medium text-slate-700 max-w-[150px] truncate">{img.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="p-1 hover:bg-red-100 rounded text-red-500 cursor-pointer transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
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

      {/* Success Dialog */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="max-w-md p-8 rounded-2xl bg-white border shadow-2xl">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 animate-bounce">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold text-slate-900">Successfully add</DialogTitle>
              <DialogDescription className="text-slate-500 text-sm">
                Do you want to add new product to your store?
              </DialogDescription>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 w-full pt-2">
              <Button
                variant="outline"
                type="button"
                className="flex-1 py-5 border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer"
                onClick={() => {
                  setSuccessDialogOpen(false);
                  navigate('/admin/products')
                  formik.resetForm()
                  setImagePreviews([])
                  setSelectedFiles([]);
                }}
              >
                Go to products
              </Button>
              <Button
                type="button"
                className="flex-1 py-5 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => {
                  setSuccessDialogOpen(false);
                  formik.resetForm();
                  setImagePreviews([]);
                  setSelectedFiles([]);
                }}
              >
                <Plus size={16} /> Add new
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </form>
    
  );
};

export default AddProductPage;