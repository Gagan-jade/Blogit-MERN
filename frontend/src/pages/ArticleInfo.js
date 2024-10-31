import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useContext } from "react";
import PageNotFound from "./NotFoundPage";
import AddComment from "../components/AddComment";
import userContext from "../context/userContext";
import Likes from "../components/Likes";

export default function ArticleInfo() {
    const { userName, setUserName } = useContext(userContext)
    const [liked, setLiked] = useState(false)
    const [articleInfo, setArticleInfo] = useState([])
    const [articleContent, setArticleContent] = useState([])
    const [updateUpvotes, setUpdateUpvotes] = useState(false)
    const { articleName } = useParams()



    async function fetchAllArticlesInfo() {
        const response = await axios.get(`/api/articles/articleInfo/${articleName}`)

        setArticleInfo(response.data)
    }




    async function fetchArticleContent() {
        const response = await axios.get(`/api/articles/content/${articleName}`)
        setArticleContent(response.data)
    }




    fetchAllArticlesInfo();
    fetchArticleContent();

    if (!articleInfo || !articleContent)
        return <PageNotFound />



    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 md:p-8">
            <div className=" mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 md:p-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">{articleInfo.articleName}</h1>
                    <div className="flex items-center justify-end text-sm text-gray-400 mb-6">
                        <span className="font-mono text-lg sm:text-xl md:text-2xl font-semibold">Posted by {articleContent.postedBy}</span>
                    </div>
                    <div className="text-3xl sm:text-xl md:text-2xl font-medium leading-relaxed">
                        {articleContent.content}
                    </div>
                </div>

                <div className="border-t border-gray-700 px-6 py-4 flex justify-end items-center">
                    <Likes articleName={articleName} articleInfo={articleInfo} userName={userName} />
                </div>

                <div className="border-t border-gray-700 px-6 py-6 md:px-8 md:py-8">
                    <h2 className="text-2xl font-semibold text-gray-100 mb-6">Comments</h2>

                    <div className=" items-center justify-center mb-8">
                        <AddComment articleName={articleName} />
                    </div>

                    <div className="space-y-5">
                        {articleInfo.comment ? (
                            articleInfo.comment.slice().reverse().map((comment, index) => (

                                <div key={index} className="flex space-x-4 items-start">
                                    <div className="w-10 h-10 bg-gray-600 rounded-full flex-shrink-0"></div>
                                    <div className="flex-1">
                                        <div className="flex items-start space-x-2 mb-1">
                                            <span className="font-semibold text-gray-200 text-2xl">{comment.userName}</span>
                                        </div>
                                        <div className="flex items-start">
                                            <p className="text-gray-300 text-xl sm:text-lg leading-relaxed ml-1 mb-0 mt-1 whitespace-normal break-words">
                                                {comment.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>


                            ))
                        ) : (
                            <div className="py-4">
                                <p className="text-gray-400 text-lg">Loading comments...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}