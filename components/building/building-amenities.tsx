import type React from "react"
import { CableCarIcon as Elevator, Power, Droplet, Flame } from "lucide-react"
import type { LucideProps } from "lucide-react"

interface Amenity {
  icon: string
  name: string
}

export function BuildingAmenities({ amenities }: { amenities: Amenity[] }) {
  const getIcon = (iconName: string): React.ReactNode => {
    const iconProps: LucideProps = { className: "h-6 w-6" }

    switch (iconName.toLowerCase()) {
      case "elevator":
        return <Elevator {...iconProps} />
      case "power-backup":
        return <Power {...iconProps} />
      case "water-purifier":
        return <Droplet {...iconProps} />
      case "fire-safety":
        return <Flame {...iconProps} />
      default:
        return <Elevator {...iconProps} />
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {amenities?.map((amenity, index) => (
        <div
          key={index}
          className="flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-sm transition-all duration-300 hover:shadow-md"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600">
            {getIcon(amenity.icon)}
          </div>
          <span className="text-sm font-medium text-gray-800">{amenity.name}</span>
        </div>
      ))}
    </div>
  )
}

