interface ProfileSectionProps {
  tags: string[]
}

export function ProfileSection({ tags }: ProfileSectionProps) {
  return (
    <div className="flex items-center gap-2 mb-6 px-4 border-b border-[#ffffff1a] pb-6">
      <h4 className="text-white font-medium">Perfil</h4>
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-[#1876D2] text-white text-xs px-3 py-1 rounded-full flex items-center justify-center"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
