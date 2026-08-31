import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getFeedPosts } from "../../services/postServices"

import {
    setFeedPosts,
    addFeedPosts,
    setFeedPage,
    setFeedHasMore
} from "../../Utils/feedSlice"

import FeedCard from "./FeedCard"

function HomeContent() {

    const dispatch = useDispatch()

    const posts = useSelector(
        store => store.Feed?.posts || []
    )

    const hasMore = useSelector(
        store => store.Feed?.hasMore ?? true
    )

    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)


    
    useEffect(() => {

        const fetchFeed = async () => {

            try {

                setLoading(true)

                const response = await getFeedPosts(1, 18)

                if (response.success) {

                    dispatch(setFeedPosts(response.data))

                    dispatch(setFeedPage(1))

                    dispatch(
                        setFeedHasMore(response.hasMore)
                    )
                }

            } catch (error) {

                console.log("FIRST LOAD ERROR:", error)

            } finally {

                setLoading(false)
            }
        }

        fetchFeed()

    }, [dispatch])


    useEffect(() => {

        const handleScroll = async () => {

            if (loadingMore) {
                return
            }

            if (!hasMore) {
                return
            }

            const scrollTop = window.scrollY
            const windowHeight = window.innerHeight
            const scrollHeight =
                document.documentElement.scrollHeight

            if (
                scrollTop + windowHeight + 200 <
                scrollHeight
            ) {
                return
            }


            const nextPage =
                Math.floor(posts.length / 18) + 1


            try {

                setLoadingMore(true)

                const response =
                    await getFeedPosts(
                        nextPage,
                        18
                    )


                if (response.success) {

                    if (response.data.length > 0) {

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
        loadingMore
    ])


    return (
        <div className="w-full">

            <div className="bg-white border border-[#D0B8A8] rounded-2xl p-5 mb-6">

                <h1 className="text-2xl font-semibold text-[#4A352C]">
                    Welcome to Muuv
                </h1>

                <p className="mt-1 text-[#8B6F61]">
                    Discover what people are sharing.
                </p>

            </div>


            {loading ? (

                <div className="bg-white rounded-2xl border border-[#D0B8A8] py-12 text-center text-[#8B6F61]">
                    Loading feed...
                </div>

            ) : posts.length === 0 ? (

                <div className="bg-white rounded-2xl border border-[#D0B8A8] py-12 text-center text-[#8B6F61]">
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
                <div className="py-6 text-center text-[#8B6F61]">
                    Loading more...
                </div>
            )}


            {!hasMore && posts.length > 0 && (
                <div className="py-6 text-center text-[#8B6F61]">
                    No more posts
                </div>
            )}

        </div>
    )
}

export default HomeContent