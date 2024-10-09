import type { NextPage } from 'next'

import { ChapterPage } from './_components/chapter-page'
import { ChapterTitle } from './_components/chapter-title'

interface Props {
  params: { id: string; chapterId: string }
}

const Page: NextPage<Props> = ({ params }) => (
  <main className="container max-w-screen-md py-4">
    <ChapterTitle {...params} />

    <ChapterPage chapterId={params.chapterId} />
  </main>
)

export default Page
