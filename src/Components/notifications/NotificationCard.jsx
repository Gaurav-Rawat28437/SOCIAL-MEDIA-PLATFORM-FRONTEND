import React from "react"

function NotificationCard({ notification }) {

    const isVideo =
        notification.post?.imgUrl?.includes("/video/upload/") ||
        /\.(mp4|webm|mov|m4v|avi|mkv)(\?|$)/i.test(
            notification.post?.imgUrl || ""
        )

    const isThought =
        (notification.type === "like" ||
            notification.type === "comment") &&
        notification.post &&
        !notification.post.imgUrl

    return (
        <div
            className="
                bg-[#D5CEA3]
                rounded-2xl
                border
                border-[#FFE5BF]
                p-4
                flex
                items-center
                gap-4
                shadow-[0_3px_12px_rgba(141,73,58,0.07)]
            "
        >

            <div
                className="
                    w-12
                    h-12
                    rounded-full
                    bg-[#FFE5BF]
                    flex
                    items-center
                    justify-center
                    shrink-0
                    overflow-hidden
                "
            >
                <img
                    src={
                        notification.sender?.displayPicture ||
                        "/muuv_pfp_dark.svg"
                    }
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex-1 min-w-0">

                <p className="text-[#1A120B]">

                    <span className="font-semibold">
                        {notification.sender?.firstName}{" "}
                        {notification.sender?.lastName}
                    </span>

                    {notification.type === "follow" && (
                        <span>
                            {" "}started following you.
                        </span>
                    )}

                    {notification.type === "like" && (
                        <span>
                            {isThought
                                ? " liked your thought."
                                : " liked your post."
                            }
                        </span>
                    )}

                    {notification.type === "comment" && (
                        <span>
                            {isThought
                                ? " commented on your thought."
                                : " commented on your post."
                            }
                        </span>
                    )}

                </p>

                {(notification.type === "like" ||
                    notification.type === "comment") &&
                    notification.post?.content && (
                        <p className="text-sm text-[#3C2A21] mt-1 line-clamp-2">
                            {notification.post.content}
                        </p>
                    )
                }

                <p className="text-sm text-[#8D493A] mt-1">
                    {new Date(
                        notification.createdAt
                    ).toLocaleString()}
                </p>

            </div>

            {notification.post && (
                <div className="w-20 h-14 shrink-0 rounded-lg overflow-hidden">

                    {notification.post.imgUrl ? (

                        isVideo ? (
                            <video
                                src={notification.post.imgUrl}
                                className="w-full h-full object-cover"
                                muted
                            />
                        ) : (
                            <img
                                src={notification.post.imgUrl}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        )

                    ) : (

                        <div className="w-full h-full bg-[#FFE5BF] flex items-center justify-center p-2">
                            <p className="text-xs text-[#3C2A21] line-clamp-3 text-center">
                                {notification.post.content}
                            </p>
                        </div>

                    )}

                </div>
            )}

        </div>
    )
}

export default NotificationCard

