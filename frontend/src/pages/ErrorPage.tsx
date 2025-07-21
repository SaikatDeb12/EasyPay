export default function ErrorPage() {
    return (
        <div className="min-h-screen bg-white w-full flex justify-center items-center">
            <div className="text-center">
                <img
                    className="h-[20vh] sm:h-[50vh] w-full "
                    src="/page_not_found.png"
                    alt="page not found"
                />
                <p className="font-semibold">Page Eaten!</p>
            </div>
        </div>
    );
}
