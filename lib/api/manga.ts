import { useQuery } from '@tanstack/react-query'

import { api } from './axios'

interface MangaQuery {
  q?: string
  includedTagNames?: string[]
  excludedTagNames?: string[]
  limit?: number
  page?: number
}

export const useMangas = ({
  q,
  includedTagNames,
  excludedTagNames,
  page = 1,
  limit = 10,
}: MangaQuery) => {
  return useQuery({
    queryKey: ['mangas', page],
    queryFn: async () => {
      let includedTagIDs: string[] = []
      let excludedTagIDs: string[] = []

      if (includedTagNames || excludedTagNames) {
        const tags = await api<{ data: Tag[] }>('/api/mangadex/tag')

        includedTagIDs = tags.data.data
          .filter((tag) => includedTagNames?.includes(tag.attributes.name.en))
          .map((tag) => tag.id)

        excludedTagIDs = tags.data.data
          .filter((tag) => excludedTagNames?.includes(tag.attributes.name.en))
          .map((tag) => tag.id)
      }

      const others = {
        'order[updatedAt]': 'desc',
        'availableTranslatedLanguage[]': 'vi',
        limit: limit,
        offset: (page - 1) * limit,
      }

      const mangas = await api<{ data: Manga[] }>({
        url: '/api/mangadex/manga',
        params: {
          ...(q && { title: q }),
          ...(includedTagIDs.length && { includedTags: includedTagIDs }),
          ...(excludedTagIDs.length && { excludedTags: excludedTagIDs }),
          ...others,
        },
      })

      return await Promise.all(
        mangas.data.data.map(async (manga) => {
          const coverArtId = manga.relationships.find((r) => r.type === 'cover_art')
          if (!coverArtId) return
          const coverArt = await api<{ data: CoverArt }>({
            url: `/api/mangadex/cover/${coverArtId.id}`,
            params: { 'includes[]': 'manga' },
          })

          const coverArtUrl = `/api/covers/${manga.id}/${coverArt.data.data.attributes.fileName}`

          return { ...manga, coverArtUrl }
        }),
      )
    },
  })
}

export const useManga = (id: string) => {
  return useQuery({
    queryKey: ['manga', id],

    queryFn: async () => {
      const manga = await api<{ data: Manga }>({
        url: `/api/mangadex/manga/${id}`,
        params: { 'includes[]': 'cover_art' },
      })

      return manga.data.data
    },
  })
}

type Language = 'vi' | 'en' | 'ja' | 'ja-ro'

interface Tag {
  id: string
  type: string
  attributes: {
    name: Record<'en', string>
    description: Record<Language, string>
    group: string
  }
}

interface CoverArt {
  id: string
  type: 'cover_art'
  attributes: {
    fileName: string
  }
}

interface Manga {
  id: string
  type: string
  attributes: {
    title: { en: string }
    altTitles: Record<Language, string>[]
    description: Record<Language, string>
    isLocked: boolean
    originalLanguage: Language
    lastVolume: string
    lastChapter: string
    publicationDemographic: string
    status: 'ongoing' | 'completed' | 'hiatus' | 'cancelled'
    year: number
    contentRating: 'safe' | 'suggestive' | 'erotica'
    tags: Tag[]
    state: 'published' | 'unpublished'
    createdAt: string
    updatedAt: string
    availableTranslatedLanguages: Language[]
  }
  relationships: {
    id: string
    type: 'author' | 'artist' | 'cover_art'
    attributes: {
      description: string
      fileName: string
    }
  }[]
}
