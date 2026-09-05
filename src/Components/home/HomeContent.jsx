import React, { useEffect,useRef,useState} from "react"
import {useDispatch,useSelector} from "react-redux"
import { getFeedPosts} from "../../services/postServices"
import { setFeedPosts, addFeedPosts, setFeedPage, setFeedHasMore} from "../../Utils/feedSlice"
import FeedCard from "./FeedCard"
import PostComposer from "./PostComposer"

function HomeContent() {
    const dispatch = useDispatch()

    const posts = useSelector(
        store => store.Feed?.posts || []
    )

    const currentPage = useSelector(
    store => store.Feed?.page || 1
)

    const hasMore = useSelector(
        store => store.Feed?.hasMore ?? true
    )

    const loaded = useSelector(
        store => store.Feed?.loaded || false
    )

    const loadingMoreRef = useRef(false)

    const [loading, setLoading] =
        useState(true)

    const [loadingMore, setLoadingMore] =
        useState(false)

    useEffect(() => {

        if (loaded) {
            setLoading(false)
            return
        }

        const fetchFeed = async () => {
            try {
                setLoading(true)

                const response =
                    await getFeedPosts(1, 18)

                if (response.success) {
                    dispatch(
                        setFeedPosts(
                            response.data
                        )
                    )

                    dispatch(
                        setFeedPage(1)
                    )

                    dispatch(
                        setFeedHasMore(
                            response.hasMore
                        )
                    )
                }
            } catch (error) {
                console.log(
                    "FIRST LOAD ERROR:",
                    error
                )
            } finally {
                setLoading(false)
            }
        }

        fetchFeed()
    }, [dispatch,loaded])

    useEffect(() => {
        const handleScroll = async () => {
            if (
                loadingMoreRef.current ||
                !hasMore
            ) {
                return
            }

            const scrollTop =
                window.scrollY

            const windowHeight =
                window.innerHeight

            const scrollHeight =
                document.documentElement
                    .scrollHeight

            if (
                scrollTop +
                    windowHeight +
                    200 <
                scrollHeight
            ) {
                return
            }

            const nextPage = currentPage + 1

            loadingMoreRef.current = true
            setLoadingMore(true)

            try {
                

                const response =
                    await getFeedPosts(
                        nextPage,
                        18
                    )

                if (response.success) {
                    if (
                        response.data.length >
                        0
                    ) {
                        dispatch(
                            addFeedPosts(
                                response.data
                            )
                        )

                        dispatch(
                            setFeedPage(
                                nextPage
                            )
                        )
                    }

                    dispatch(
                        setFeedHasMore(
                            response.hasMore
                        )
                    )
                }
            } catch (error) {
                console.log(
                    "LOAD MORE ERROR:",
                    error
                )
            } finally {
                loadingMoreRef.current = false
                setLoadingMore(false)
            }
        }

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
        posts.length,
        hasMore,
        dispatch
    ])

    return (
        <div className="w-full">
            <PostComposer />

            <div className="mt-6">
                {loading ? (
                    <div
                        className="
                            py-12
                            text-center
                            text-[#1A120B]
                           
                        "
                    >
                        Loading feed...
                    </div>
                ) : posts.length===0 ? (
                    <div
                        className="
                            bg-[#D5CEA3]
                            rounded-2xl
                            border
                            border-[#3C2A21]
                            py-12
                            text-center
                            text-[#1A120B]
                            shadow-[0_3px_12px_rgba(141,73,58,0.07)]
                        "
                    >
                        No posts yet
                    </div>
                ) : (
                    <div className="flex flex-col gap-5">
                        {posts.map(post => (
                            <FeedCard
                                key={post._id}
                                post={post}
                            />
                        ))}
                    </div>
                )}




                {loadingMore && (
                    <div
                        className="
                            py-6
                            text-center
                            text-[#1A120B]
                        "
                    >
                        Loading more...
                    </div>
                )}

                {!hasMore &&
                    posts.length > 0 && (
                        <div
                            className="
                                py-6
                                text-center
                                text-[#1A120B]
                            "
                        >
                            No more posts
                        </div>
                    )}

            </div>
        </div>
    )
}

export default HomeContent