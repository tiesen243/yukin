'use client'

import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Pagination } from '@/components/pagination'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useMangas } from '@/lib/api/manga'

interface Props {
  searchParams: {
    page?: string
  }
}

const Page: NextPage<Props> = ({ searchParams = { page: 1 } }) => {
  const { data, isLoading } = useMangas({ page: Number(searchParams.page ?? 1) })

  return (
    <main className="container py-4">
      <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <Card key={index}>
                <Skeleton className="aspect-square w-full rounded-t-lg" />
                <CardHeader>
                  <CardTitle className="line-clamp-1">Loading...</CardTitle>
                  <CardDescription className="line-clamp-2">Loading...</CardDescription>
                </CardHeader>
              </Card>
            ))
          : data?.map((manga) => (
              <Link key={manga?.id} href={`/manga/${manga?.id}`}>
                <Card key={manga?.id}>
                  <Image
                    src={manga?.coverArtUrl ?? '/logo.svg'}
                    alt={manga?.attributes.title.en ?? 'cover'}
                    width={200}
                    height={300}
                    className="aspect-square w-full rounded-t-lg object-cover"
                  />
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{manga?.attributes.title.en}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      Last chapter: {manga?.attributes.lastChapter}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
      </section>

      <Pagination searchParams={searchParams} />
    </main>
  )
}

export default Page
