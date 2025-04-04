"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Users } from "lucide-react"
import Image from "next/image"

interface AmenityCardProps {
  name: string
  description: string
  image: string
  availability: string
  capacity: {
    max: number
    current: number
  }
  isChargeable: boolean
  price: number
  onBookNow: () => void
}

export function AmenityCard({
  name,
  description,
  image,
  availability,
  capacity,
  isChargeable,
  price,
  onBookNow,
}: AmenityCardProps) {
  return (
    <Card className="overflow-hidden card-hover">
      <div className="relative h-[200px] w-full">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
        {isChargeable && (
          <div className="absolute top-2 right-2 bg-secondary text-secondary-foreground text-xs font-bold px-2 py-1 rounded-full">
            ₹{price}
          </div>
        )}
      </div>
      <CardHeader className="p-4">
        <CardTitle className="font-heading">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <div className="flex items-center text-sm">
          <Clock className="mr-2 h-4 w-4 text-primary" />
          <span>{availability}</span>
        </div>
        <div className="flex items-center text-sm">
          <Users className="mr-2 h-4 w-4 text-primary" />
          <div className="w-full">
            <div className="flex justify-between mb-1">
              <span>Capacity</span>
              <span className="font-medium">
                {capacity.current}/{capacity.max}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${(capacity.current / capacity.max) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full font-medium" onClick={onBookNow}>
          Book Now
        </Button>
      </CardFooter>
    </Card>
  )
}

