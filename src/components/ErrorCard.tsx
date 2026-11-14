import type { ReactNode } from 'react'

export default function ErrorCard({ hand, title, children, as: Tag = 'main' }: { hand: string; title?: string; children?: ReactNode; as?: 'main' | 'div' }) {
  return (
    <Tag className="flex min-h-[70vh] items-center justify-center bg-cream px-4 py-16 text-ink">
      <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border-2 border-ink bg-white p-8 text-center shadow-hard">
        <p className="font-hand text-2xl text-orange-deep">{hand}</p>
        {title && <h1 className="text-3xl font-extrabold">{title}</h1>}
        {children}
      </div>
    </Tag>
  )
}

export const errorBtn =
  'rounded-xl bg-orange-deep px-6 py-3 font-semibold text-white'
