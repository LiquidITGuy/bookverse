"use client"

import { useState, useEffect } from "react"

export default function OnlineStatusIndicator() {
    const [isOnline, setIsOnline] = useState(true)

    useEffect(() => {
        function handleOnline() {
            setIsOnline(true)
        }

        function handleOffline() {
            setIsOnline(false)
        }

        window.addEventListener("online", handleOnline)
        window.addEventListener("offline", handleOffline)

        return () => {
            window.removeEventListener("online", handleOnline)
            window.removeEventListener("offline", handleOffline)
        }
    }, [])

    return (
        <div className={`text-center py-2 ${isOnline ? "bg-green-500" : "bg-red-500"} text-white`}>
            {isOnline ? "Online" : "Offline"}
        </div>
    )
}
