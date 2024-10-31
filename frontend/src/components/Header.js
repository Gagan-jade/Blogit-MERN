import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div>
            <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-neutral-900 ">
                <div className="All-Buttons flex space-x-4">
                    <Link className="links" to="/">
                        <button className="bg-transparent text-white hover:bg-gray-200 hover:text-black px-4 py-2 rounded-lg transition duration-200">
                            Home
                        </button>
                    </Link>
                    <Link className="links" to="/articles">
                        <button className="bg-transparent text-white hover:bg-gray-200 hover:text-black px-4 py-2 rounded-lg transition duration-200">
                            Articles
                        </button>
                    </Link>
                    <Link className="links" to="/about">
                        <button className="bg-transparent text-white hover:bg-gray-200 hover:text-black px-4 py-2 rounded-lg transition duration-200">
                            About
                        </button>
                    </Link>
                </div>
                <div className="All-Buttons-2 flex space-x-4 mt-4 md:mt-0">
                    <Link className="links" to="/login">
                        <button className="bg-transparent text-white hover:bg-gray-200 hover:text-black px-4 py-2 rounded-lg transition duration-200">
                            Login
                        </button>
                    </Link>
                    <Link className="links" to="/signup">
                        <button className="bg-transparent text-white hover:bg-gray-200 hover:text-black px-4 py-2 rounded-lg transition duration-200">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </header>
            <div className="main text-center font-bold text-white p-8">
                <div className="mb-2 text-5xl">Welcome to</div>
                <div className="mb-2">Blogit</div>
            </div>

        </div>
    );
}

export default Header;
