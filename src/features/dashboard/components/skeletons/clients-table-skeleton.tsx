import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function ClientsTableSkeleton() {
  return (
    <Card className="col-span-3 bg-[#171d30] border-slate-700">
      <CardHeader>
        <div className="h-6 bg-slate-600 rounded animate-pulse w-32 mb-4"></div>
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <div className="h-10 bg-slate-600 rounded-full animate-pulse"></div>
          </div>

          <div className="h-10 bg-slate-600 rounded-full animate-pulse w-40"></div>
          <div className="h-10 bg-slate-600 rounded-full animate-pulse w-40"></div>
          <div className="h-10 bg-slate-600 rounded-full animate-pulse w-40"></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Table Header */}
          <div className="flex border-b border-slate-700 pb-2">
            {['Cliente', 'Tipo', 'Valor Mensal', 'Status', 'Renovação', 'Região'].map((header, i) => (
              <div key={i} className="flex-1">
                <div className="h-4 bg-slate-600 rounded animate-pulse w-20"></div>
              </div>
            ))}
          </div>
          
          {/* Table Rows */}
          {[1, 2, 3, 4, 5].map((row) => (
            <div key={row} className="flex items-center py-3 border-b border-slate-700">
              <div className="flex-1">
                <div className="h-4 bg-slate-600 rounded animate-pulse w-32 mb-2"></div>
                <div className="h-3 bg-slate-600 rounded animate-pulse w-24"></div>
              </div>
              <div className="flex-1">
                <div className="h-4 bg-slate-600 rounded animate-pulse w-20"></div>
              </div>
              <div className="flex-1">
                <div className="h-4 bg-slate-600 rounded animate-pulse w-24"></div>
              </div>
              <div className="flex-1">
                <div className="h-6 bg-slate-600 rounded-full animate-pulse w-16"></div>
              </div>
              <div className="flex-1">
                <div className="h-4 bg-slate-600 rounded animate-pulse w-20"></div>
              </div>
              <div className="flex-1">
                <div className="h-4 bg-slate-600 rounded animate-pulse w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
