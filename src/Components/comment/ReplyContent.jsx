import React, { useEffect, useState } from "react"
import { getMyComments } from "../../services/commentService"
import ReplyCard from "./ReplyCard"

function ReplyContent({ userData }) {

    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchComments = async () => {

            try {

                setLoading(true)

                const response = await getMyComments()

                if (response.success) {
                    setComments(response.data || [])
                }

            } catch (error) {

                console.log(error)

            } finally {

                setLoading(false)

            }
        }

        fetchComments()

    }, [])

    if (loading) {
        return (
            <div className="text-center py-10 text-[#1A120B]">
                Loading replies...
            </div>
        )
    }

    if (comments.length === 0) {
        return (
            <div className="text-center py-10 text-[#1A120B]">
                No replies yet
            </div>
        )
    }

    return (
        <div className="p-6">

            <div className="space-y-4">

                {comments.map(comment => (

                    <ReplyCard
                        key={comment._id}
                        comment={comment}
                        userData={userData}
                        type={
                            comment.post?.displayPicture
                                ? "post"
                                : "thought"
                        }
                    />

                ))}

            </div>

        </div>
    )
}

export default ReplyContent
