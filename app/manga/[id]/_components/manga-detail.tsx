'use client'

import Image from 'next/image'

import { Badge } from '@/components/ui/badge'
import { CardDescription, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useManga } from '@/lib/api/manga'

export const MangaDetail: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading } = useManga(id)

  if (isLoading || !data)
    return (
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="flex flex-col gap-2 md:col-span-2">
          <CardTitle>Loading...</CardTitle>

          <div className="mt-2 flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} className="h-5 w-16 rounded-full" />
            ))}
          </div>

          <CardDescription>Loading...</CardDescription>
        </article>

        <Skeleton className="row-start-1 mx-auto aspect-[2/3] w-1/2 rounded-lg md:col-start-3 md:w-full" />
      </section>
    )

  const coverUrl = data.relationships.find((rel) => rel.type === 'cover_art')?.attributes.fileName

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <article className="flex flex-col gap-2 md:col-span-2">
        <CardTitle>{data.attributes.title.en}</CardTitle>
        <CardDescription>
          {data.attributes.altTitles.map((alt, idx) => (
            <span key={idx}>{alt.vi}</span>
          ))}
        </CardDescription>

        <div className="flex flex-wrap gap-2">
          {data.attributes.tags.map((tag) => (
            <Badge key={tag.id}>{tag.attributes.name.en}</Badge>
          ))}
        </div>

        <p>{data.attributes.description.vi || data.attributes.description.en}</p>
      </article>

      <Image
        src={`https://uploads.mangadex.org/covers/${id}/${coverUrl}`}
        alt={data.attributes.title.en || `Cover of ${id}`}
        width={200}
        height={300}
        className="row-start-1 mx-auto aspect-[2/3] w-1/2 rounded-lg object-cover md:col-start-3 md:w-full"
      />
    </section>
  )
}
