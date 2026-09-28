import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMyPosts } from "../../services/postServices"
import { setPosts, setHasMore, addPosts, setPage } from "../../Utils/postsSlice"
import PostCard from "./PostCard"
import PostModal from "./PostModal"
import ThoughtContent from "./ThoughtContent"
import ReplyContent from "./ReplyContent"
import MyLikesContent from "./MyLikesContent"

function PostContent({ userData }) {

    const dispatch = useDispatch()

    const posts = useSelector(store => store.Post?.posts || [])
    const hasMore = useSelector(store => store.Post?.hasMore || false)
    const page = useSelector(store => store.Post?.page || 1)
    const loaded = useSelector(store => store.Post?.loaded || false)

    const [activeTab, setActiveTab] = useState("posts")
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [selectedPostId, setSelectedPostId] = useState(null)

    const selectedPost = posts.find(
        post => post._id === selectedPostId
    )

    const loadingMoreRef = useRef(false)

    useEffect(() => {

        if (activeTab !== "posts") return

        if (loaded) {
            setLoading(false)
            return
        }

        const fetchPosts = async () => {

            try {

                setLoading(true)

                const response = await getMyPosts(1, 18)

                if (response.success) {
                    dispatch(setPosts(response.data))
                    dispatch(setHasMore(response.hasMore))
                    dispatch(setPage(1))
                }

            } catch (error) {

                console.log(error)

            } finally {

                setLoading(false)

            }
        }

        fetchPosts()

    }, [activeTab, dispatch, loaded])

    const handleScroll = async () => {

        if (activeTab !== "posts") return
        if (loadingMoreRef.current || !hasMore) return

        const scrollTop = document.documentElement.scrollTop
        const windowHeight = window.innerHeight
        const scrollHeight = document.documentElement.scrollHeight

        if (windowHeight + scrollTop + 1 >= scrollHeight) {

            try {

                loadingMoreRef.current = true
                setLoadingMore(true)

                const nextPage = page + 1

                const response = await getMyPosts(
                    nextPage,
                    18
                )

                if (response.success) {

                    dispatch(
                        addPosts(response.data || [])
                    )

                    dispatch(
                        setHasMore(response.hasMore)
                    )

                    dispatch(
                        setPage(nextPage)
                    )
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

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }

    }, [activeTab, page, hasMore, loadingMore])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        })
    }, [activeTab])

    return (
        <div className="border-t border-[#D0B8A8]">

            <div className="overflow-x-auto border-b border-[#D0B8A8] sticky top-16 z-10 bg-white [&::-webkit-scrollbar]:h-0 [scrollbar-width:none]">

                <div className="flex w-full">

                    <button
                        type="button"
                        onClick={() => setActiveTab("posts")}
                        className={`flex-1 px-2 sm:px-6 py-3 sm:py-4 text-sm font-semibold text-center whitespace-nowrap ${activeTab === "posts"
                            ? "text-[#1A120B] border-b-2 border-[#8D493A]"
                            : "text-[#8D493A]"
                            }`}
                    >
                        Posts
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("thoughts")}
                        className={`flex-1 px-2 sm:px-6 py-3 sm:py-4 text-sm font-semibold text-center whitespace-nowrap ${activeTab === "thoughts"
                            ? "text-[#1A120B] border-b-2 border-[#8D493A]"
                            : "text-[#8D493A]"
                            }`}
                    >
                        Thoughts
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("replies")}
                        className={`flex-1 px-2 sm:px-6 py-3 sm:py-4 text-sm font-semibold text-center whitespace-nowrap ${activeTab === "replies"
                            ? "text-[#1A120B] border-b-2 border-[#8D493A]"
                            : "text-[#8D493A]"
                            }`}
                    >
                        Replies
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("likes")}
                        className={`flex-1 px-2 sm:px-6 py-3 sm:py-4 text-sm font-semibold text-center whitespace-nowrap ${activeTab === "likes"
                            ? "text-[#1A120B] border-b-2 border-[#8D493A]"
                            : "text-[#8D493A]"
                            }`}
                    >
                        Likes
                    </button>

                </div>

            </div>

            {activeTab === "posts" && (

                <div className="p-3 sm:p-6">

                    {loading ? (

                        <div className="text-center py-10 text-[#1A120B]">
                            Loading posts...
                        </div>

                    ) : posts.length === 0 ? (

                        <div className="text-center py-10 text-[#1A120B]">
                            No posts yet
                        </div>

                    ) : (

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">

                            {posts.map(post => (

                                <PostCard
                                    key={post._id}
                                    post={post}
                                    userData={userData}
                                    setSelectedPost={setSelectedPostId}
                                />

                            ))}

                        </div>

                    )}

                    {loadingMore && (

                        <div className="text-center py-6 text-[#1A120B]">
                            Loading more posts...
                        </div>

                    )}

                    {!hasMore && posts.length > 0 && (

                        <div className="text-center py-6 text-[#1A120B]">
                            No more posts
                        </div>

                    )}

                </div>

            )}

            {activeTab === "thoughts" && (
                <ThoughtContent userData={userData} />
            )}

            {activeTab === "replies" && (
                <ReplyContent
                    userData={userData}
                    setSelectedPost={setSelectedPostId}
                />
            )}

            {activeTab === "likes" && (
                <MyLikesContent
                    userData={userData}
                />
            )}

            {selectedPost && (

                <PostModal
                    post={selectedPost}
                    userData={userData}
                    setSelectedPost={setSelectedPostId}
                />

            )}

        </div>
    )
}

export default PostContent