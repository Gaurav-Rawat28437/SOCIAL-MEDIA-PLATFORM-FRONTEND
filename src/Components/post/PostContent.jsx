import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMyPosts } from "../../services/postServices"
import { setPosts, setHasMore, addPosts, setPage } from "../../Utils/postsSlice"
import PostCard from "./PostCard"
import PostModal from "./PostModal"
import ThoughtContent from "./ThoughtContent"
import ReplyContent from "../comment/ReplyContent"

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
        if (loadingMore || !hasMore) return

        const scrollTop = document.documentElement.scrollTop
        const windowHeight = window.innerHeight
        const scrollHeight = document.documentElement.scrollHeight

        if (windowHeight + scrollTop + 1 >= scrollHeight) {

            try {

                setLoadingMore(true)

                const nextPage = page + 1

                const response = await getMyPosts(nextPage, 18)

                if (response.success) {

                    dispatch(addPosts(response.data))
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

    }, [activeTab, page, hasMore, loadingMore])

    return (
        <div className="border-t border-[#D0B8A8]">

            <div className="flex border-b border-[#D0B8A8]">

                <button
                    type="button"
                    onClick={() => setActiveTab("posts")}
                    className={`px-6 py-4 text-sm font-semibold ${activeTab === "posts"
                        ? "text-[#1A120B] border-b-2 border-[#8D493A]"
                        : "text-[#8D493A]"
                        }`}
                >
                    Posts
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("thoughts")}
                    className={`px-6 py-4 text-sm font-semibold ${activeTab === "thoughts"
                        ? "text-[#1A120B] border-b-2 border-[#8D493A]"
                        : "text-[#8D493A]"
                        }`}
                >
                    Thoughts
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("replies")}
                    className={`px-6 py-4 text-sm font-semibold ${activeTab === "replies"
                        ? "text-[#1A120B] border-b-2 border-[#8D493A]"
                        : "text-[#8D493A]"
                        }`}
                >
                    Replies
                </button>

                <button
                    type="button"
                    className="px-6 py-4 text-sm font-semibold text-[#8D493A]"
                >
                    Likes
                </button>

            </div>

            {activeTab === "posts" && (

                <div className="p-6">

                    {loading ? (

                        <div className="text-center py-10 text-[#1A120B]">
                            Loading posts...
                        </div>

                    ) : posts.length === 0 ? (

                        <div className="text-center py-10 text-[#1A120B]">
                            No posts yet
                        </div>

                    ) : (

                        <div className="grid grid-cols-3 gap-4">

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