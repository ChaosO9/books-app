import Form from './Form';

export default function page() {
    return (
        <>
            <>
                <div className="md:flex md:flex-wrap min-h-screen md:w-full content-center justify-center bg-gray-200 md:py-10 sm:py-0">
                    {/* Login component */}
                    <div className="flex flex-wrap flex-col content-center justify-center w-screen p-0 m-0 md:flex-row">
                        {/* Login form */}
                        <div className="flex flex-wrap content-center justify-center rounded-r-md md:w-24rem md:h-40rem sm:order-1 md:order-none shadow-md">
                            <img
                                className="h-80 w-full rounded-t-sm object-cover object-top md:w-full md:h-full bg-center bg-no-repeat bg-cover md:rounded-l-md"
                                src="./signin-image.webp"
                            />
                        </div>
                        <Form />
                        {/* Login banner */}
                    </div>
                </div>
            </>
        </>
    );
}
