import type React from "react"
import { Flower2, Car, TreePine, Shield, Sun, Droplets } from "lucide-react"
import type { LucideProps } from "lucide-react"

interface Amenity {
  icon: string
  name: string
}

export function RowHouseAmenities({ amenities }: { amenities: Amenity[] }) {
  const getIcon = (iconName: string): React.ReactNode => {
    const iconProps: LucideProps = { className: "h-6 w-6" }

    switch (iconName.toLowerCase()) {
      case "garden":
        return <Flower2 {...iconProps} />
      case "parking":
        return <Car {...iconProps} />
      case "terrace":
        return <TreePine {...iconProps} />
      case "security":
        return <Shield {...iconProps} />
      case "solar":
        return <Sun {...iconProps} />
      case "rainwater":
        return <Droplets {...iconProps} />
      default:
        return <Flower2 {...iconProps} />
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
      {amenities?.map((amenity, index) => (
        <div
          key={index}
          className="flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-sm transition-all duration-300 hover:shadow-md"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
            {getIcon(amenity.icon)}
          </div>
          <span className="text-sm font-medium text-gray-800">{amenity.name}</span>
        </div>
      ))}
    </div>
  )
}

