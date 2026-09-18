import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMyLikes } from "../../services/likeServices"
import {
    setLikes,
    addLikes,
    setHasMore,
    setPage
} from "../../Utils/myLikesSlice"
import LikeCard from "./LikeCard"

function MyLikesContent({ userData }) {

    const dispatch = useDispatch()

    const likes = useSelector(
        store => store.MyLikes?.likes || []
    )

    const hasMore = useSelector(
        store => store.MyLikes?.hasMore || false
    )

    const page = useSelector(
        store => store.MyLikes?.page || 1
    )

    const loaded = useSelector(
        store => store.MyLikes?.loaded || false
    )

    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)

    const loadingMoreRef = useRef(false)

    useEffect(() => {

        if (loaded) {
            setLoading(false)
            return
        }

        const fetchLikes = async () => {

            try {

                setLoading(true)

                const response = await getMyLikes(1, 18)

                if (response.success) {

                    dispatch(
                        setLikes(response.data || [])
                    )

                    dispatch(
                        setHasMore(
                            response.pagination?.hasMore || false
                        )
                    )

                    dispatch(setPage(1))
                }

            } catch (error) {

                console.log(error)

            } finally {

                setLoading(false)

            }
        }

        fetchLikes()

    }, [dispatch, loaded])


    const handleScroll = async () => {

        if (loadingMoreRef.current || !hasMore) return

        const scrollTop =
            document.documentElement.scrollTop

        const windowHeight =
            window.innerHeight

        const scrollHeight =
            document.documentElement.scrollHeight

        if (
            windowHeight +
            scrollTop +
            1 >=
            scrollHeight
        ) {

            try {

                loadingMoreRef.current = true
                setLoadingMore(true)

                const nextPage = page + 1

                const response = await getMyLikes(
                    nextPage,
                    18
                )

                if (response.success) {

                    dispatch(
                        addLikes(
                            response.data || []
                        )
                    )

                    dispatch(
                        setHasMore(
                            response.pagination?.hasMore || false
                        )
                    )

                    dispatch(setPage(nextPage))
                }

            } catch (error) {

                console.log(error)

            } finally {

                loadingMoreRef.current = false
                setLoadingMore(false)

            }
        }
    }


    useEffect(() => {

        window.addEventListener(
            "scroll",
            handleScroll
        )

        return () => {

            window.removeEventListener(
                "scroll",
                handleScroll
            )

        }

    }, [
        page,
        hasMore,
        loadingMore
    ])


    return (

        <div className="p-6">

            {loading ? (

                <div className="
                    text-center
                    py-10
                    text-[#8B6F61]
                ">
                    Loading likes...
                </div>

            ) : likes.length === 0 ? (

                <div className="
                    text-center
                    py-10
                    text-[#8B6F61]
                ">
                    No likes yet
                </div>

            ) : (

                <div className="space-y-4">

                    {likes.map(like => (

                        <LikeCard
                            key={like._id}
                            like={like}
                            userData={userData}
                        />

                    ))}

                </div>

            )}


            {loadingMore && (

                <div className="
                    text-center
                    py-6
                    text-[#8B6F61]
                ">
                    Loading more likes...
                </div>

            )}


            {!hasMore && likes.length > 0 && (

                <div className="
                    text-center
                    py-6
                    text-[#8B6F61]
                ">
                    No more likes
                </div>

            )}

        </div>

    )
}

export default MyLikesContent