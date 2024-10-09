'use client'

import type { NextPage } from 'next'
import Image from 'next/image'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { CardDescription, CardTitle } from '@/components/ui/card'
import { useManga } from '@/lib/api/manga'

interface Props {
  params: { id: string }
}

const Page: NextPage<Props> = ({ params }) => {
  const { data, isLoading } = useManga(params.id)

  const coverUrl = data?.relationships.find((rel) => rel.type === 'cover_art')?.attributes.fileName

  return (
    <main className="container py-4">
      {isLoading ? (
        'Loading...'
      ) : (
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="flex flex-col gap-2 md:col-span-2">
            <CardTitle>{data?.attributes.title.en}</CardTitle>
            <CardDescription>
              {data?.attributes.altTitles.map((alt) => <p key={alt.vi}>{alt.vi}</p>)}
            </CardDescription>

            <div className="flex flex-wrap gap-2">
              {data?.attributes.tags.map((tag) => (
                <Badge key={tag.id}>{tag.attributes.name.en}</Badge>
              ))}
            </div>

            <p>{data?.attributes.description.vi ?? data?.attributes.description.en}</p>
          </article>

          <Image
            src={`/api/covers/${params.id}/${coverUrl}`}
            alt={data?.attributes.title.en ?? `Cover of ${params.id}`}
            width={200}
            height={300}
            className="row-start-1 mx-auto w-1/2 rounded-lg md:col-start-3 md:w-full"
          />
        </section>
      )}
    </main>
  )
}

export default Page
