import { useEffect, useState } from "react";
import { useContext } from "react";
import userContext from "../context/userContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import authContext from "../context/authContext"



export default function AddArticle() {
    const { userName, setUserName } = useContext(userContext)
    const [articleName, setArticleName] = useState('');
    const { isAuthorized, setIsAuthorized } = useContext(authContext)
    const [content, setContent] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState('');

    const Navigate = useNavigate();

    async function PostArticle() {
        await axios.post(`/api/articles/content/${articleName}`, { postedBy: userName, content: content, })
        setArticleName('');
        setContent('');
    }

    useEffect(() => {
        if (submitted)
            Navigate('/articles')
    }, [submitted])

    if (isAuthorized) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r bg-gray-900">
                <div className="w-[80%] p-8 bg-gray-800 rounded-lg shadow-lg mb-8">
                    <h2 className="text-5xl font-extrabold text-center text-white mb-6">Write an article</h2>
                    <div className="mb-8">
                        <label htmlFor="articleName" className="block text-3xl font-medium text-white mb-2">
                            Article Name
                        </label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 mb-8 rounded-lg border bg-gray-700 border-gray-300 text-3xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            onChange={(e) => {
                                setArticleName(e.target.value)
                                setMessage('')
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="articleContent" className="block font-medium text-white mb-2 text-3xl">
                            Article Content
                        </label>
                        <textarea
                            rows="6"
                            className="w-full px-4 py-3 rounded-lg border text-2xl bg-gray-700 border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            onChange={(e) => {
                                setContent(e.target.value)
                                setMessage('')
                            }}
                        />
                    </div>

                    <button
                        className="w-full py-3 mt-4 text-white mb-8 font-semibold bg-red-700 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                        onClick={async (e) => {
                            if (articleName !== '' && content !== '') {
                                PostArticle();
                                Navigate('/articles')
                            }
                            else {
                                setMessage("Fields cant be empty")
                            }
                        }}
                    >
                        Submit Article
                    </button>
                    {message.length !== '' ? <p className="text-2xl text-red-600">{message}</p> : <p></p>}
                </div>
            </div>
        );
    }
    else
        return Navigate('/login')
}