import { X } from "lucide-react"
import React from "react"

function SearchModal({
    following,
    searchResults,
    search,
    loading,
    loadingMore,
    onSelect,
    onClose,
    onScroll
}) {

    return (
        <div
            onScroll={onScroll}
            className="absolute left-5 right-5 mt-2 bg-[#E5E5CB] border border-[#5A382A]/30 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto"
        >

            <div className="flex justify-between items-center px-4 py-3 border-b border-[#5A382A]/20">

                <p className="font-semibold text-[#1A120B]">
                    {search ? "Search Results" : "Following"}
                </p>

                <button
                    onClick={onClose}
                    className="text-[#5A382A] cursor-pointer"
                >
                    <X size={18} />
                </button>

            </div>

            {loading ? (

                <div className="px-4 py-3 text-sm">
                    Loading...
                </div>

            ) : search ? (

                searchResults.length > 0 ? (

                    searchResults.map((item) => (

                        <div
                            key={item._id}
                            onClick={() => onSelect(item)}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-[#FFE5BF] cursor-pointer"
                        >

                            <img
                                src={item.displayPicture}
                                alt=""
                                className="w-10 h-10 rounded-full object-cover"
                            />

                            <div>

                                <p className="font-semibold text-sm">
                                    {item.username}
                                </p>

                                <p className="text-xs text-[#5A382A]/70">
                                    {item.firstName} {item.lastName}
                                </p>

                            </div>

                        </div>

                    ))

                ) : (

                    <div className="px-4 py-4 text-sm text-[#5A382A]">
                        No users found
                    </div>

                )

            ) : (

                following.map((item) => (

                    <div
                        key={item._id}
                        onClick={() => onSelect(item.following)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[#FFE5BF] cursor-pointer"
                    >

                        <img
                            src={item.following.displayPicture}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover"
                        />

                        <div>

                            <p className="font-semibold text-sm">
                                {item.following.username}
                            </p>

                            <p className="text-xs text-[#5A382A]/70">
                                {item.following.firstName} {item.following.lastName}
                            </p>

                        </div>

                    </div>

                ))

            )}

            {!search && loadingMore && (
                <div className="text-center py-3 text-sm text-[#5A382A]">
                    Loading more...
                </div>
            )}

        </div>
    )
}

export default SearchModal