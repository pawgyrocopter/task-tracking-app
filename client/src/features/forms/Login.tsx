import Input from '@/components/Input'

const Login = ({
    setIsLoginForm,
}: {
    setIsLoginForm: (isLoginForm: boolean) => void
}) => {
    return (
        <div className="w-[20rem] bg-white h-[17rem] rounded-lg flex flex-col justify-center items-center">
            <form
                onSubmit={() => {}}
                className="w-full h-full flex flex-col mt-[1rem] items-center justify-center"
            >
                <div className="flex flex-col gap-2 h-[70%]">
                    <Input />
                    <Input />
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
                className="text-xs mb-4"
            >
                Haven't registered yet ?
            </button>
        </div>
    )
}

export default Login
