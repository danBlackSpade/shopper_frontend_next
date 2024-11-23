import React, { useState } from "react"


interface RideFormProps {
  onSubmit: (userId: string, origin: string, destination: string) => void
}

const RideForm: React.FC<RideFormProps> = ({ onSubmit }) => {
  const [userId, setUserId] = useState("")
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(userId, origin, destination)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        User ID:
        <input
          type="text"
          value={userId}
          id="userId"
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </label>
      <label>
        Origin:
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          required
          id="origin"
        />
      </label>
      <label>
        Destination:
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          id="destination"
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  )
}


export default RideForm
