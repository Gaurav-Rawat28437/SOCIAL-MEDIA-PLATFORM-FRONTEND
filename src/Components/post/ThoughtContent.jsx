import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMyThoughts } from "../../services/postServices"
import { setThoughts, setHasMore, addThoughts, setPage } from "../../Utils/thoughtsSlice"
import ThoughtCard from "./ThoughtCard"

function ThoughtContent({ userData }) {

    const dispatch = useDispatch()

    const thoughts = useSelector(store => store.Thought?.thoughts || [])
    const hasMore = useSelector(store => store.Thought?.hasMore || false)
    const page = useSelector(store => store.Thought?.page || 1)

    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)

    useEffect(() => {

        if (thoughts.length > 0) {
            setLoading(false)
            return
        }

        const fetchThoughts = async () => {

            try {

                setLoading(true)

                const response = await getMyThoughts(1, 18)

                if (response.success) {

                    dispatch(setThoughts(response.data))
                    dispatch(setHasMore(response.hasMore))
                    dispatch(setPage(1))

                }

            } catch (error) {

                console.log(error)

            } finally {

                setLoading(false)

            }
        }

        fetchThoughts()

    }, [dispatch, thoughts.length])

    const handleScroll = async () => {

        if (loadingMore || !hasMore) return

        const scrollTop = document.documentElement.scrollTop
        const windowHeight = window.innerHeight
        const scrollHeight = document.documentElement.scrollHeight

        if (windowHeight + scrollTop + 1 >= scrollHeight) {

            try {

                setLoadingMore(true)

                const nextPage = page + 1

                const response = await getMyThoughts(nextPage, 18)

                if (response.success) {

                    dispatch(addThoughts(response.data))
                    dispatch(setHasMore(response.hasMore))
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

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }

    }, [page, hasMore, loadingMore])

    return (

        <div className="p-6">

            {loading ? (

                <div className="text-center py-10 text-[#8B6F61]">
                    Loading thoughts...
                </div>

            ) : thoughts.length === 0 ? (

                <div className="text-center py-10 text-[#8B6F61]">
                    No thoughts yet
                </div>

            ) : (

                <div className="space-y-4">

                    {thoughts.map(thought => (
                        <ThoughtCard
                            key={thought._id}
                            thought={thought}
                            userData={userData}
                        />
                    ))}

                </div>

            )}

            {loadingMore && (
                <div className="text-center py-6 text-[#8B6F61]">
                    Loading more thoughts...
                </div>
            )}

            {!hasMore && thoughts.length > 0 && (
                <div className="text-center py-6 text-[#8B6F61]">
                    No more thoughts
                </div>
            )}

        </div>
    )
}

export default ThoughtContent