'use client'

import { Plus, Copy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Product } from '../types'

interface ProductsSectionProps {
  products: Product[]
}

export function ProductsSection({ products }: ProductsSectionProps) {
  return (
    <div className="mb-6 border-b border-[#ffffff1a] pb-4">
      <div className="flex items-center justify-between mb-3 px-4">
        <h4 className="text-white font-medium">Produtos</h4>
        <button className="text-blue-400 hover:text-blue-300 transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3 px-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between">
            <div className="flex items-center justify-between gap-2">
              <div
                className={cn(
                  'w-2 h-2 rounded-full',
                  product.status === 'active' ? 'bg-green-500' : 'bg-red-500',
                )}
              />
              <div>
                <p className="text-white text-sm">{product.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-gray-400 text-xs">{product.price}</p>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
