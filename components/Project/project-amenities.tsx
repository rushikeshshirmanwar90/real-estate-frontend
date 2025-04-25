import type React from "react"
import { Wifi, Car, Dumbbell, Droplet, Shield, TreePine } from "lucide-react"

interface Amenity {
  icon: string
  name: string
}

export function ProjectAmenities({ amenities }: { amenities?: Amenity[] }) {
  const getIcon = (iconName: string): React.ReactNode => {
    const iconProps: React.SVGProps<SVGSVGElement> = { className: "h-6 w-6" }

    switch (iconName.toLowerCase()) {
      case "wifi":
        return <Wifi {...iconProps} />
      case "car":
        return <Car {...iconProps} />
      case "dumbbell":
        return <Dumbbell {...iconProps} />
      case "swimming-pool":
        return <Droplet {...iconProps} />
      case "shield":
        return <Shield {...iconProps} />
      case "tree":
        return <TreePine {...iconProps} />
      default:
        return <Shield {...iconProps} />
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {amenities?.map((amenity, index) => (
        <div
          key={index}
          className="flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-sm transition-all duration-300 hover:shadow-md"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
            {getIcon(amenity.icon)}
          </div>
          <span className="text-sm font-medium text-gray-800">{amenity.name}</span>
        </div>
      ))}
    </div>
  )
}

