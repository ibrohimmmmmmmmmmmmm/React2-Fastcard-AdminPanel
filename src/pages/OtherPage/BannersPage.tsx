import { ImagePlus } from 'lucide-react'
import { Button } from '../../components/ui/button'

export default function BannersPage() {
  return (
    <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
        <ImagePlus className="h-10 w-10" />
      </div>
      <div className="mt-8 space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Coming soon</p>
        <h2 className="text-3xl font-semibold text-slate-900">Banner API will be implemented soon</h2>
        <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-600">
          The banner management page is ready for the next backend release. Once the Swagger endpoints are available,
          the create/edit/delete workflow will be activated here.
        </p>
        <div className="flex justify-center">
          <Button variant="outline" disabled className="cursor-not-allowed">
            Create banner soon
          </Button>
        </div>
      </div>
    </div>
  )
}
