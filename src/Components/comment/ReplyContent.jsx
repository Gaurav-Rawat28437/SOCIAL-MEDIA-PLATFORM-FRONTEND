import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMyComments } from "../../services/commentService"
import {
    setReplies,
    addReplies,
    setHasMore,
    setPage
} from "../../Utils/myRepliesSlice"
import ReplyCard from "./ReplyCard"

function ReplyContent({ userData }) {

    const dispatch = useDispatch()

    const replies = useSelector(
        store => store.MyReplies?.replies || []
    )

    const hasMore = useSelector(
        store => store.MyReplies?.hasMore || false
    )

    const page = useSelector(
        store => store.MyReplies?.page || 1
    )

    const loaded = useSelector(
        store => store.MyReplies?.loaded || false
    )

    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)

    useEffect(() => {

        if (loaded) {
            setLoading(false)
            return
        }

        const fetchReplies = async () => {

            try {

                setLoading(true)

                const response = await getMyComments(1, 18)

                if (response.success) {

                    dispatch(
                        setReplies(response.data || [])
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

        fetchReplies()

    }, [dispatch, loaded])


    const handleScroll = async () => {

        if (loadingMore || !hasMore) return

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

                setLoadingMore(true)

                const nextPage = page + 1

                const response = await getMyComments(
                    nextPage,
                    18
                )

                if (response.success) {

                    dispatch(
                        addReplies(
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
                    Loading replies...
                </div>

            ) : replies.length === 0 ? (

                <div className="
                    text-center
                    py-10
                    text-[#8B6F61]
                ">
                    No replies yet
                </div>

            ) : (

                <div className="space-y-4">

                    {replies.map(reply => (

                        <ReplyCard
                            key={reply._id}
                            comment={reply}
                            userData={userData}
                            type={
                                reply.post?.imgUrl
                                    ? "post"
                                    : "thought"
                            }
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
                    Loading more replies...
                </div>

            )}


            {!hasMore && replies.length > 0 && (

                <div className="
                    text-center
                    py-6
                    text-[#8B6F61]
                ">
                    No more replies
                </div>

            )}

        </div>

    )
}

export default ReplyContent