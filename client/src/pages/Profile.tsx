import Button from '@/components/ui/Button'

const ProfilePage = () => {
    return (
        <div className="w-full items-center h-full flex flex-col p-4 gap-4">
            <img src="account-avatar.svg" className="w-[100px] md:w-[150px]" />
            <form
                onSubmit={(e) => e.preventDefault()}
                className="md:max-w-[40rem] w-full h-full flex flex-col items-center gap-2"
            >
                <input
                    placeholder="Name"
                    type="text"
                    className="border px-2 placeholder:text-gray-700 text-lg w-full h-[2.25rem] rounded-lg shadow-lg"
                />
                <input
                    placeholder="Email"
                    type="text"
                    className="border px-2 placeholder:text-gray-700 text-lg w-full h-[2.25rem] rounded-lg shadow-lg"
                />
                <input
                    placeholder="Phone number"
                    type="text"
                    className="border px-2 placeholder:text-gray-700 text-lg w-full h-[2.25rem] rounded-lg shadow-lg"
                />
                <input
                    placeholder="Password"
                    type="password"
                    className="border px-2 placeholder:text-gray-700 text-lg w-full h-[2.25rem] rounded-lg shadow-lg"
                />

                <Button className="w-[10rem] mt-[2rem]">Submit</Button>
            </form>
        </div>
    )
}

export default ProfilePage
