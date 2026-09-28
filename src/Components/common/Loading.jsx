import React from "react"

function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="flex flex-col items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>

                <p className="text-gray-600 text-sm">
                    Loading...
                </p>
            </div>
        </div>
    )
}

export default Loading