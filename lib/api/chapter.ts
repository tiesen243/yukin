import { useQuery } from '@tanstack/react-query'

import { api } from './axios'

export const useChapter = (id: string) =>
  useQuery({
    queryKey: ['chapter', id],
    queryFn: async () => {
      const chapter = await api<{ data: Chapter[] }>({
        url: `/api/mangadex/manga/${id}/feed`,
      })

      const sorted = chapter.data.data.sort((a, b) => {
        const aVolume = parseInt(a.attributes.volume)
        const aChapter = parseFloat(a.attributes.chapter)
        const bVolume = parseInt(b.attributes.volume)
        const bChapter = parseFloat(b.attributes.chapter)

        if (aVolume === bVolume) {
          return aChapter - bChapter
        }

        return aVolume - bVolume
      })

      const filtered = sorted.filter((item) => item.attributes.translatedLanguage === 'vi')

      return filtered
    },
  })

export const useChapterById = (id: string) =>
  useQuery({
    queryKey: ['chapterDownload', id],
    queryFn: async () => {
      const chapter = await api<ChapterDownload>({
        url: `/api/mangadex/at-home/server/${id}`,
      })

      return chapter.data
    },
  })

interface Chapter {
  id: string
  type: 'chapter'
  attributes: {
    title: string
    volume: string
    chapter: string
    translatedLanguage: string
    publishAt: string
  }
}

interface ChapterDownload {
  baseUrl: string
  chapter: {
    hash: string
    data: string[]
    dataSaver: string[]
  }
}
