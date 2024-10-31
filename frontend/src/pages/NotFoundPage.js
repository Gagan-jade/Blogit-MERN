export default function PageNotFound() {
    return (
        <div className="text-center bg-red-700 p-10 rounded-lg shadow-2xl border border-red-900">
            <h1 className="text-5xl font-bold mb-6">Page Not Found :(</h1>
            <p className="text-2xl">
                The article you're looking for does not exist. Please go back and try again.
            </p>
        </div>
    )
}