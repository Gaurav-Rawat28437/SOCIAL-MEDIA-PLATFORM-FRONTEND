import React, { useEffect, useState } from "react"
import { getUserPosts } from "../../../services/postServices"
import PostCard from "../PostCard"
import PostModal from "../PostModal"

function OtherUserPost({ userId, userData }) {

    const [posts, setPosts] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [selectedPostId, setSelectedPostId] = useState(null)

    const selectedPost = posts.find(
        post => post._id === selectedPostId
    )

    useEffect(() => {

        const fetchPosts = async () => {

            try {

                setLoading(true)

                const response = await getUserPosts(userId, 1, 18)

                if (response.success) {

                    setPosts(response.data || [])
                    setHasMore(response.hasMore)
                    setPage(1)

                }

            } catch (error) {

                console.log(error)

            } finally {

                setLoading(false)

            }
        }

        fetchPosts()

    }, [userId])

    const handleScroll = async () => {

        if (loadingMore || !hasMore) return

        const scrollTop = document.documentElement.scrollTop
        const windowHeight = window.innerHeight
        const scrollHeight = document.documentElement.scrollHeight

        if (windowHeight + scrollTop + 1 >= scrollHeight) {

            try {

                setLoadingMore(true)

                const nextPage = page + 1

                const response = await getUserPosts(
                    userId,
                    nextPage,
                    18
                )

                if (response.success) {

                    setPosts(prevPosts => [
                        ...prevPosts,
                        ...(response.data || [])
                    ])

                    setHasMore(response.hasMore)
                    setPage(nextPage)

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

    }, [userId, page, hasMore, loadingMore])

    useEffect(() => {

        window.scrollTo({
            top: 0,
            behavior: "instant"
        })

    }, [userId])

    const handleLikeUpdate = (
        postId,
        isLiked,
        likesCount
    ) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post._id === postId
                    ? {
                        ...post,
                        isLiked,
                        likesCount
                    }
                    : post
            )
        )
    }

    const handleCommentUpdate = (
        postId,
        commentsCount
    ) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post._id === postId
                    ? {
                        ...post,
                        commentsCount
                    }
                    : post
            )
        )
    }

    return (
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

            {selectedPost && (

                <PostModal
                    post={selectedPost}
                    userData={userData}
                    setSelectedPost={setSelectedPostId}
                    onLikeUpdate={handleLikeUpdate}
                    onCommentUpdate={handleCommentUpdate}
                />

            )}

        </div>
    )
}

export default OtherUserPost