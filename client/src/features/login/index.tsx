import Input from '@/components/Input'
import { useState } from 'react'

const Login = () => {
    const [isLoginForm, setIsLoginForm] = useState<boolean>(true)

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target

        switch (name) {
            case 'email':
                break
            case 'username':
                break
            case 'password':
                break
            case 'repeatPassword':
                break
        }
    }

    function onSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(1)
    }

    return (
        <div className="w-[20rem] bg-white h-[15rem] rounded-lg flex flex-col justify-center items-center">
            <h1 className="mt-1">{isLoginForm ? 'Login' : 'Register'}</h1>
            <form
                onSubmit={onSubmit}
                className="w-full h-full flex flex-col items-center justify-center"
            >
                <div className="flex flex-col gap-2 h-[65%]">
                    {!isLoginForm && (
                        <Input
                            onChange={onChange}
                            placeholder="email"
                            id="email"
                            type="email"
                        />
                    )}
                    <Input
                        onChange={onChange}
                        placeholder="name"
                        id="name"
                        type="text"
                    />
                    <Input
                        onChange={onChange}
                        placeholder="password"
                        id="password"
                        type="password"
                    />
                    {!isLoginForm && (
                        <Input
                            onChange={onChange}
                            placeholder="repeat password"
                            id="repeatPassword"
                            type="password"
                        />
                    )}
                </div>
                <div className="flex flex-col gap-1 h-[20%]">
                    <button
                        onClick={() => setIsLoginForm(!isLoginForm)}
                        className="text-xs"
                    >
                        {isLoginForm
                            ? "Haven't registered yet ?"
                            : 'Already have an account ?'}
                    </button>
                    <button>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login
