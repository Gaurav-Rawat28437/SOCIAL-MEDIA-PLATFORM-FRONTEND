import React, { useEffect, useState } from "react"
import ThoughtCard from "../ThoughtCard"
import { getUserThoughts } from "../../../services/postServices"

function OtherUserThought({ userId, userData }) {
    const [thoughts, setThoughts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchThoughts = async () => {
            try {
                setLoading(true)

                const response = await getUserThoughts(userId, 1, 18)

                if (response.success) {
                    setThoughts(response.data || [])
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchThoughts()
    }, [userId])

    if (loading) {
        return (
            <div className="text-center py-10 text-[#1A120B]">
                Loading thoughts...
            </div>
        )
    }

    if (thoughts.length === 0) {
        return (
            <div className="text-center py-10 text-[#1A120B]">
                No thoughts yet
            </div>
        )
    }

    const handleLikeUpdate = (
        thoughtId,
        isLiked,
        likesCount
    ) => {
        setThoughts(prevThoughts =>
            prevThoughts.map(thought =>
                thought._id === thoughtId
                    ? {
                        ...thought,
                        isLiked,
                        likesCount
                    }
                    : thought
            )
        )
    }

    const handleCommentUpdate = (
        thoughtId,
        commentsCount
    ) => {
        setThoughts(prevThoughts =>
            prevThoughts.map(thought =>
                thought._id === thoughtId
                    ? {
                        ...thought,
                        commentsCount
                    }
                    : thought
            )
        )
    }

    return (
        <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
                {thoughts.map((thought) => (
                    <ThoughtCard
                        key={thought._id}
                        thought={thought}
                        userData={userData}
                        onLikeUpdate={handleLikeUpdate}
                        onCommentUpdate={handleCommentUpdate}
                    />
                ))}
            </div>
        </div>
    )
}

export default OtherUserThought