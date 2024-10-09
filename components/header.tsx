import Image from 'next/image'
import Link from 'next/link'

export const Header: React.FC = () => {
  return (
    <header className="sticky inset-0 z-50 border-b bg-background/70 py-2 backdrop-blur-xl backdrop-saturate-150">
      <div className="container flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={28} height={28} className="dark:invert" />
          <span className="text-xl font-bold">Yukin</span>
        </Link>

        <form action="/manga" className="flex items-center gap-2">
          <input
            name="q"
            type="search"
            placeholder="Search"
            className="border-b border-gray-300 bg-transparent focus:border-gray-500 focus:outline-none dark:border-gray-700 dark:focus:border-gray-400"
          />
        </form>
      </div>
    </header>
  )
}
