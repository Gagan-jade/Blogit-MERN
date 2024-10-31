import { Link } from "react-router-dom";

const Main = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-6 mt-[50px]">
            <section className="intro text-center mb-10">
                <h2 className="text-4xl font-semibold text-white"><div className="mb-6">Create Your Own</div><div className="mb-3">Blog!</div> </h2>
                <p className="text-lg text-white mt-2">
                    Start sharing your thoughts and ideas with the world. It's easy and fun!
                </p>
            </section>

            <section className="actions text-center mb-10">
                <h3 className="text-3xl font-semibold text-white mb-5">Get Started</h3>
                <div className="flex justify-center space-x-4">
                    <Link to="/signup">
                        <a
                            className="bg-transparent text-white text-2xl px-8 py-4 rounded-lg hover:bg-white hover:text-black transition duration-200"
                        >
                            Sign Up
                        </a>
                    </Link>
                    <Link to="/login">
                        <a
                            className="bg-transparent text-white text-2xl px-8 py-4 rounded-lg hover:bg-white hover:text-black transition duration-200"
                        >
                            Log In
                        </a>
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Main;
