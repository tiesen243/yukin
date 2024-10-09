'use client'

import Image from 'next/image'

import { Skeleton } from '@/components/ui/skeleton'
import { useChapterById } from '@/lib/api/chapter'

export const ChapterPage: React.FC<{ chapterId: string }> = ({ chapterId }) => {
  const { data, isLoading } = useChapterById(chapterId)

  if (isLoading || !data)
    return Array.from({ length: 10 }).map((_, index) => (
      <Skeleton key={index} className="h-96 w-full" />
    ))

  console.log(data)

  return data.chapter.data.map((img, index) => (
    <Image
      key={index}
      src={`${data.baseUrl}/data/${data.chapter.hash}/${img}`}
      alt={`page-${index}`}
      width={400}
      height={600}
      className="w-full"
    />
  ))
}
