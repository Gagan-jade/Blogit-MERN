import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState, useContext } from "react";
import userContext from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Articles() {
    const { userName, setUserName } = useContext(userContext);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [allArticles, setAllArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAllArticles() {
            try {
                const response = await axios.get('/api/articles/allArticles');
                setAllArticles(response.data);
                setFilteredArticles(response.data);
            } catch (error) {
                
            }
        }
        fetchAllArticles();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            setFilteredArticles(allArticles.filter(article =>
                article.articleName.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        } else {
            setFilteredArticles(allArticles);
        }
    }, [searchTerm, allArticles]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-800 shadow-lg rounded-lg mb-8">
                <div className="text-xl font-semibold font-mono mb-4 sm:mb-0">
                    {userName === "Guest" ? (
                        <p className="text-red-500">Viewing as Guest</p>
                    ) : (
                        <p>Welcome, <span className="text-red-500">{userName}</span></p>
                    )}
                </div>

                <button
                    className="bg-red-700 text-white text-xl py-2 px-4 rounded-lg hover:bg-red-500 transition duration-300 sm:text-2xl md:text-3xl w-full sm:w-auto"
                    onClick={() => {
                        if (userName === "Guest")
                            navigate("/login");
                        else {
                            setUserName("Guest");
                            navigate("/")
                        }
                    }}
                >
                    {userName === "Guest" ? <>Login</> : <>Logout</>}
                </button>
            </div>

            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-3 px-6 text-gray-900 text-xl sm:text-2xl rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-500"
                />
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {filteredArticles.length > 0 ? (
                    filteredArticles.slice().reverse().map((article) => (
                        <Link to={`/articles/${article.articleName}`} key={article.articleName}>
                            <div className="w-full h-[150px] bg-gray-800 rounded-lg p-4 shadow-lg hover:bg-gray-700 transition duration-300 ease-in-out cursor-pointer flex flex-col">
                                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white underline mb-2">
                                    {article.articleName}
                                </p>
                                <p className="text-gray-300 flex-grow text-base sm:text-xl md:text-2xl">
                                    {article.content.substring(0, 100)} ...
                                </p>
                                <p className="mt-2 font-semibold text-blue-400 text-sm">Read more</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-center text-gray-300 text-xl col-span-full">No articles found</p>
                )}
            </div>

            <button
                onClick={() => {
                    if (userName === "Guest") {
                        alert("Please login to write an article");
                        navigate('/login');
                    } else {
                        navigate('/articles/addArticle');
                    }
                }}
                className="fixed right-4 sm:right-8 bottom-4 sm:bottom-8 p-3 sm:p-4 md:p-6 bg-blue-600 text-white text-lg sm:text-xl md:text-2xl rounded-full hover:bg-blue-500 transition duration-300 shadow-lg"
            >
                Write an Article +
            </button>
        </div>
    );
}