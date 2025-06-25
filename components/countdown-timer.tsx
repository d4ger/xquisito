"use client"

import { useState, useEffect } from "react"

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Calculate target date (3 months from now)
  const targetDate = new Date()
  targetDate.setMonth(targetDate.getMonth() + 3)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mb-8">
      <div className="flex justify-center items-center gap-4 md:gap-8 opacity-0 translate-y-5 animate-fade-in-up animation-delay-500">
        <div className="text-center">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px]">
            <div className="text-2xl md:text-3xl font-bold text-teal-400">
              {timeLeft.days.toString().padStart(2, "0")}
            </div>
            <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">Días</div>
          </div>
        </div>
        <div className="text-teal-400 text-xl md:text-2xl font-bold">:</div>
        <div className="text-center">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px]">
            <div className="text-2xl md:text-3xl font-bold text-teal-400">
              {timeLeft.hours.toString().padStart(2, "0")}
            </div>
            <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">Horas</div>
          </div>
        </div>
        <div className="text-teal-400 text-xl md:text-2xl font-bold">:</div>
        <div className="text-center">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px]">
            <div className="text-2xl md:text-3xl font-bold text-teal-400">
              {timeLeft.minutes.toString().padStart(2, "0")}
            </div>
            <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">Min</div>
          </div>
        </div>
        <div className="text-teal-400 text-xl md:text-2xl font-bold">:</div>
        <div className="text-center">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px]">
            <div className="text-2xl md:text-3xl font-bold text-teal-400">
              {timeLeft.seconds.toString().padStart(2, "0")}
            </div>
            <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">Seg</div>
          </div>
        </div>
      </div>
    </div>
  )
} 