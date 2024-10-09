'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useChapter } from '@/lib/api/chapter'

export const ChapterList: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = useChapter(id)

  return (
    <div className="grid w-full grid-cols-4 gap-4 md:grid-cols-8">
      <span className="col-span-4 text-xl font-medium md:col-span-8">Chapters</span>
      {isLoading || !data
        ? Array.from({ length: 10 }).map((_, index) => (
            <Button key={index} asChild>
              <Skeleton key={index} />
            </Button>
          ))
        : data.map((item) => (
            <Button key={item.id} asChild>
              <Link href={`/manga/${id}/${item.id}`}>
                {item.attributes.volume && `Vol. ${item.attributes.volume} `}
                {item.attributes.chapter && `Ch. ${item.attributes.chapter} `}
              </Link>
            </Button>
          ))}
    </div>
  )
}
