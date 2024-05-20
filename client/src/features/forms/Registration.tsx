import Input from '@/components/Input'

const Registration = ({
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
                    <Input />
                    <Input />
                </div>
                <button
                    disabled={true}
                    className="text-sm border w-[5rem] h-[2rem] disabled:cursor-not-allowed"
                >
                    Register
                </button>
            </form>
            <button
                onClick={() => setIsLoginForm(true)}
                className="text-xs mb-4"
            >
                Already have an account ?
            </button>
        </div>
    )
}

export default Registration
