import Button from '@/components/ui/Button'

const ProfilePage = () => {
    return (
        <div className="flex h-full w-full flex-col items-center gap-4 p-4">
            <img src="account-avatar.svg" className="w-[100px] md:w-[150px]" />
            <form
                onSubmit={(e) => e.preventDefault()}
                className="flex h-full w-full flex-col items-center gap-2 md:max-w-[40rem]"
            >
                <input
                    placeholder="Name"
                    type="text"
                    className="h-[2.25rem] w-full rounded-lg border px-2 text-lg shadow-lg placeholder:text-gray-700"
                />
                <input
                    placeholder="Email"
                    type="text"
                    className="h-[2.25rem] w-full rounded-lg border px-2 text-lg shadow-lg placeholder:text-gray-700"
                />
                <input
                    placeholder="Phone number"
                    type="text"
                    className="h-[2.25rem] w-full rounded-lg border px-2 text-lg shadow-lg placeholder:text-gray-700"
                />
                <input
                    placeholder="Password"
                    type="password"
                    className="h-[2.25rem] w-full rounded-lg border px-2 text-lg shadow-lg placeholder:text-gray-700"
                />

                <Button className="mt-[2rem] w-[10rem]">Submit</Button>
            </form>
        </div>
    )
}

export default ProfilePage
