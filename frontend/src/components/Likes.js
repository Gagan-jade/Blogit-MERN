import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Likes({ articleName, articleInfo, userName }) {
    const [liked, setLiked] = useState(false)
    const [check, setCheck] = useState(false)
    const [isLoading, setIsLoading] = useState(false)  // New loading state

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAllArticlesInfo() {
            const response = await axios.get(`/api/articles/articleInfo/${articleName}`)
            if (response.data.likedBy) {
                if (response.data.likedBy.find(e => e === userName))
                    setLiked(true)
                else
                    setLiked(false)
            }
        }
        fetchAllArticlesInfo();
    }, [check, articleInfo, articleName, userName])

    async function incrementUpvotes() {
        await axios.put(`/api/articlesUpvote/${articleInfo.articleName}`, { likedBy: userName })
    }
    async function decrementUpVotes() {
        await axios.put('/api/articles/reduceLikeCount', { articleName: articleName, likedBy: userName })
    }

    const handleLikeClick = async () => {
        if (userName !== "Guest") {
            setIsLoading(true);  // Start loading animation
            setTimeout(() => setIsLoading(false), 5000);  // Stop loading after 5 seconds

            if (liked === true) {
                decrementUpVotes();
                setCheck(false);
            } else {
                incrementUpvotes();
                setCheck(true);
            }
        } else {
            alert("Please login to like or comment")
            navigate('/login')
        }
    };

    return (
        <button
            className={`flex items-center space-x-2 transition-colors duration-200 ${isLoading ? 'cursor-not-allowed' : ''}`}
            onClick={handleLikeClick}
            disabled={isLoading}  // Disable button when loading
        >
            <span className="relative">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="loader border-4 border-gray-200 border-t-red-500 rounded-full w-10 h-10 animate-spin"></div>
                    </div>
                )}
                <span className={`text-3xl sm:text-5xl transition-colors duration-200 ${isLoading ? 'opacity-0' : ''}`}>
                    <div className={`${liked ? 'text-red-500' : 'text-white'} font-bold transform -rotate-90`}>
                        &lt;3
                    </div>
                </span>
            </span>

            <span className={`text-orange-600 text-lg sm:text-xl font-semibold ${isLoading ? 'opacity-0' : ''}`}>
                {articleInfo.upvotes}
            </span>
        </button>
    )
}
