'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useChapter } from '@/lib/api/chapter'

export const ChapterList: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = useChapter(id)

  return (
    <div className="grid w-full grid-cols-8 gap-4">
      <span className="col-span-8 text-xl font-medium">Chapters</span>
      {isLoading || !data
        ? Array.from({ length: 10 }).map((_, index) => (
            <Button key={index} asChild>
              <Skeleton key={index} />
            </Button>
          ))
        : data.map((item) => (
            <Button key={item.id} asChild>
              <Link href={`/manga/${id}/${item.id}`}>
                Vol. {item.attributes.volume} - Ch. {item.attributes.chapter}
              </Link>
            </Button>
          ))}
    </div>
  )
}
