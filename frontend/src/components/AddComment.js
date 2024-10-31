import { useState, useContext } from "react";
import axios from "axios";
import userContext from "../context/userContext";
import { useNavigate } from "react-router-dom";

export default function AddComment({ articleName }) {
    const { userName } = useContext(userContext);
    const [comment, setComment] = useState('');
    const [commentButton, setCommentButton] = useState(false);

    const navigate = useNavigate();

    async function updateComment() {
        await axios.put(`/api/articles/updateComments/${articleName}`, { userName: userName, text: comment });
    }

    const handleCommentSubmit = async () => {
        if (comment.trim() !== '') {
            if (userName === "Guest") {
                navigate('/login');
                alert("Please login to add a comment");
            } else {
                await updateComment();
                setComment('');
                setCommentButton(false);
            }
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center w-full space-y-2 sm:space-y-0 sm:space-x-2">
            <input
                type="text"
                placeholder="Add a public comment..."
                value={comment}
                className="w-full sm:flex-grow bg-gray-800 text-gray-300 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base sm:text-lg transition-all duration-200 ease-in-out"
                onChange={(e) => {
                    setComment(e.target.value);
                    setCommentButton(e.target.value !== '');
                }}
                onKeyPress={async (e) => {
                    if (e.key === "Enter") {
                        await handleCommentSubmit();
                    }
                }}
            />
            <button
                className={`w-full sm:w-[80px] bg-red-600 font-bold text-2xl text-white px-4 py-2 rounded-lg transition-all duration-200 ease-in-out ${commentButton ? 'opacity-100 hover:bg-red-700' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={handleCommentSubmit}
            >
                Comment
            </button>
        </div>
    );
}