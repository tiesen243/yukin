import type { NextPage } from 'next'

import { ChapterList } from './_components/chapter-list'
import { MangaDetail } from './_components/manga-detail'

interface Props {
  params: { id: string }
}

const Page: NextPage<Props> = ({ params }) => (
  <main className="container py-4">
    <MangaDetail id={params.id} />

    <hr className="my-4" />

    <ChapterList id={params.id} />
  </main>
)

export default Page
