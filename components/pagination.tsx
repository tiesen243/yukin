import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface Props {
  searchParams: Record<string, string>
}

export const Pagination: React.FC<Props> = ({ searchParams }) => {
  const otherParams = Object.fromEntries(
    Object.entries(searchParams).filter(([key]) => key !== 'page'),
  )

  const prevPage =
    Number(searchParams.page) <= 1 || !searchParams.page ? 1 : Number(searchParams.page) - 1
  const nextPage = Number(searchParams.page) ? Number(searchParams.page) + 1 : 2

  return (
    <section className="mt-4 flex items-center justify-center gap-4">
      <Button variant="outline" size="icon" asChild>
        <Link href={`?page=${prevPage}&${new URLSearchParams(otherParams).toString()}`}>
          <ChevronLeftIcon size={24} />
        </Link>
      </Button>

      <span>Page {searchParams.page ?? 1}</span>

      <Button variant="outline" size="icon" asChild>
        <Link href={`?page=${nextPage}&${new URLSearchParams(otherParams).toString()}`}>
          <ChevronRightIcon size={24} />
        </Link>
      </Button>
    </section>
  )
}
