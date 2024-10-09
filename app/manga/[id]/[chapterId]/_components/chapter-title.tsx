'use client'

import { useChapter } from '@/lib/api/chapter'

export const ChapterTitle: React.FC<{ id: string; chapterId: string }> = ({ id, chapterId }) => {
  const { data, isLoading } = useChapter(id)

  if (isLoading || !data)
    return <h1 className="mb-4 text-center text-2xl font-semibold">Loading...</h1>

  const currentChapter = data.find((item) => item.id === chapterId)
  return (
    <h1 className="mb-4 text-center text-2xl font-semibold">
      {currentChapter?.attributes.volume && `Vol. ${currentChapter.attributes.volume} - `}
      {currentChapter?.attributes.chapter && `Ch. ${currentChapter.attributes.chapter}`}
      {currentChapter?.attributes.title && `: ${currentChapter.attributes.title}`}
    </h1>
  )
}
