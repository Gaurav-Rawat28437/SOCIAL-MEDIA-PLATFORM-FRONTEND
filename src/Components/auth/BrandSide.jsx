import React, { useEffect, useState } from 'react'

function BrandSide() {

    const [time, setTime] = useState("")

    useEffect(() => {
        const updateClock = () => {
            setTime(
                new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })
            )
        }

        updateClock()

        const interval = setInterval(updateClock, 30000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-[380px] m-6 rounded-3xl bg-[#2F211B] p-8 flex flex-col">

            <div>
                <h1 className="text-2xl font-serif text-[#F8EDE3]">
                    MUUV
                </h1>

                <p className="text-xs text-[#D0B8A8] mt-1">
                    move the world
                </p>
            </div>

            <div className="flex-1 flex flex-col justify-end gap-4">

                <div className="bg-[#3C2A21] text-[#F8EDE3] p-4 rounded-2xl rounded-bl-sm w-[85%]">
                    <p className="text-xs text-[#D0B8A8] mb-1">
                        Uv
                    </p>

                    <p className="text-sm">
                        still up? just finished the sketch
                    </p>
                </div>

                <div className="bg-[#D0B8A8] text-[#2F211B] p-4 rounded-2xl rounded-br-sm w-[85%] self-end">
                    <p className="text-xs mb-1">
                        YOU
                    </p>

                    <p className="text-sm">
                        always up at this hour, send it
                    </p>
                </div>

                <div className="bg-[#4A352C] text-[#F8EDE3] p-4 rounded-2xl rounded-bl-sm w-[85%]">
                    <p className="text-xs text-[#D0B8A8] mb-1">
                        MIRA
                    </p>

                    <p className="text-sm">
                        posting it now, go look
                    </p>
                </div>


                <div className="flex w-fit items-center gap-1 rounded-2xl rounded-bl bg-[#3C2A21] px-3.5 py-3">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D5CEA3]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D5CEA3] [animation-delay:150ms]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#D5CEA3] [animation-delay:300ms]" />
                </div>

            </div>


            <div className="mt-6 flex justify-between border-t border-[#D0B8A8]/30 pt-[18px] font-mono text-[11px] text-[#D0B8A8]">
                <span >Move. Post. Repeat.</span>

                <span>{time}</span>
            </div>

        </div >
    )
}

export default BrandSide
