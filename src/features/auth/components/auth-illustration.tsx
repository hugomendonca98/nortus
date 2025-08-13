import Image from 'next/image'

export const AuthIllustration = () => {
  return (
    <div className="flex-1 relative hidden lg:block select-none inverted-radius w-full h-full mr-10 mt-10">
      <Image
        src="/images/hero.png"
        alt="Nortus Illustration"
        draggable={false}
        width={1000}
        height={1000}
        priority
        className="w-full h-auto"
      />
    </div>
  )
}
