const Login = ({
    setIsLoginForm,
}: {
    setIsLoginForm: (isLoginForm: boolean) => void
}) => {
    return (
        <div className="w-[22rem] bg-white h-[22rem] rounded-lg flex flex-col justify-center items-center">
            <form
                onSubmit={() => {}}
                className="w-full h-full flex flex-col mt-[1rem] items-center justify-center gap-2"
            >
                <div className="flex flex-col gap-1 justify-center items-center">
                    <input
                        type="email"
                        placeholder="Email"
                        className="border px-1 text-sm w-[16rem] h-[1.5rem] rounded-sm"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border px-1 text-sm w-[16rem] h-[1.5rem] rounded-sm"
                    />
                </div>
                <button
                    disabled={true}
                    className="text-sm border w-[5rem] h-[2rem] disabled:cursor-not-allowed"
                >
                    Login
                </button>
            </form>
            <button
                onClick={() => setIsLoginForm(false)}
                className="text-xs my-4"
            >
                Haven't registered yet ?
            </button>
        </div>
    )
}

export default Login
