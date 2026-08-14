"use client"

import ProfileTab from "./ProfileTab"

export default function ProfilePage() {
  const handleInputChange = (field: string, value: unknown) => {
    console.log(`Field updated: ${field} =`, value)
  }

  return (
    <div className="p-4">
      <ProfileTab
        businessName="My Booking Hub Business"
        category="photography"
        tags={["Wedding", "Event", "Portrait"]}
        onInputChange={handleInputChange}
      />
    </div>
  )
}
