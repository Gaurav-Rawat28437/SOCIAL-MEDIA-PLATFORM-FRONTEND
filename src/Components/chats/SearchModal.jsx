import React from "react"

function SearchModal({
    following,
    searchResults,
    search,
    loading,
    searchLoading,
    loadingMore,
    onSelect,
    onScroll
}) {

    return (
        <div
            onScroll={onScroll}
            className="absolute left-3 right-3 sm:left-5 sm:right-5 mt-2 bg-[#E5E5CB] border border-[#5A382A]/30 rounded-xl shadow-lg z-50 max-h-64 sm:max-h-80 overflow-y-auto"
        >

            <div className="px-3 sm:px-4 py-3 border-b border-[#5A382A]/20">

                <p className="font-semibold text-sm sm:text-base text-[#1A120B]">
                    {search ? "Search Results" : "Following"}
                </p>

            </div>

            {loading ? (

                <div className="px-3 sm:px-4 py-3 text-sm">
                    Loading...
                </div>

            ) : search ? (

                searchLoading ? (

                    <div className="px-3 sm:px-4 py-4 text-sm text-[#5A382A]">
                        Loading...
                    </div>

                ) : searchResults.length > 0 ? (

                    searchResults.map((item) => (

                        <div
                            key={item._id}
                            onClick={() => onSelect(item)}
                            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-[#FFE5BF] cursor-pointer"
                        >

                            <img
                                src={item.displayPicture || "/muuv_pfp_dark.svg"}
                                alt=""
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shrink-0"
                            />

                            <div className="min-w-0">

                                <p className="font-semibold text-xs sm:text-sm truncate">
                                    {item.username}
                                </p>

                                <p className="text-[10px] sm:text-xs text-[#5A382A]/70 truncate">
                                    {item.firstName} {item.lastName}
                                </p>

                            </div>

                        </div>

                    ))

                ) : (

                    <div className="px-3 sm:px-4 py-4 text-sm text-[#5A382A]">
                        No users found
                    </div>

                )

            ) : (

                following.length > 0 ? (

                    following.map((item) => (

                        <div
                            key={item._id}
                            onClick={() => onSelect(item.following)}
                            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-[#FFE5BF] cursor-pointer"
                        >

                            <img
                                src={item.following.displayPicture || "/muuv_pfp_dark.svg"}
                                alt=""
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover shrink-0"
                            />

                            <div className="min-w-0">

                                <p className="font-semibold text-xs sm:text-sm truncate">
                                    {item.following.username}
                                </p>

                                <p className="text-[10px] sm:text-xs text-[#5A382A]/70 truncate">
                                    {item.following.firstName} {item.following.lastName}
                                </p>

                            </div>

                        </div>

                    ))

                ) : (

                    <div className="px-3 sm:px-4 py-4 text-sm text-[#5A382A]">
                        No users found
                    </div>

                )

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