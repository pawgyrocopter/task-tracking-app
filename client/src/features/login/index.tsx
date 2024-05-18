import Input from '@/components/Input'
import { useEffect, useState } from 'react'
import { LoginCredentials, RegistrationCredentials } from './types'

const Login = () => {
    const [isLoginForm, setIsLoginForm] = useState<boolean>(true)
    const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
        name: '',
        password: '',
    })
    const [registrationCredentials, setRegistrationCredentials] =
        useState<RegistrationCredentials>({
            email: '',
            name: '',
            password: '',
            repeatPassword: '',
        })

    useEffect(() => {
        resetCredentials()
    }, [isLoginForm])

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        if (isLoginForm) {
            switch (name) {
                case 'name':
                    setLoginCredentials({
                        ...loginCredentials,
                        name: value,
                    })
                    break
                case 'password':
                    setLoginCredentials({
                        ...loginCredentials,
                        password: value,
                    })
                    break
            }
        } else {
            switch (name) {
                case 'email':
                    setRegistrationCredentials({
                        ...registrationCredentials,
                        email: value,
                    })
                    break
                case 'name':
                    setRegistrationCredentials({
                        ...registrationCredentials,
                        name: value,
                    })
                    break
                case 'password':
                    setRegistrationCredentials({
                        ...registrationCredentials,
                        password: value,
                    })
                    break
                case 'repeatPassword':
                    setRegistrationCredentials({
                        ...registrationCredentials,
                        repeatPassword: value,
                    })
                    break
            }
        }
    }

    function onSubmit(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
    }

    function resetCredentials(): void {
        setLoginCredentials({ name: '', password: '' })
        setRegistrationCredentials({
            email: '',
            name: '',
            password: '',
            repeatPassword: '',
        })
    }

    console.log('loginCredentials: ', loginCredentials)
    console.log('registrationCredentials: ', registrationCredentials)

    return (
        <div className="w-[20rem] bg-white h-[17rem] rounded-lg flex flex-col justify-center items-center">
            <h1 className="mt-1">{isLoginForm ? 'Login' : 'Register'}</h1>
            <form
                onSubmit={onSubmit}
                className="w-full h-full flex flex-col mt-[1rem] items-center justify-center"
            >
                <div className="flex flex-col gap-2 h-[70%]">
                    {isLoginForm ? (
                        <>
                            <Input
                                value={loginCredentials.name}
                                onChange={onChange}
                                placeholder="name"
                                name="name"
                                type="text"
                            />
                            <Input
                                value={loginCredentials.password}
                                onChange={onChange}
                                placeholder="password"
                                name="password"
                                type="password"
                            />
                        </>
                    ) : (
                        <>
                            <Input
                                value={registrationCredentials.email}
                                onChange={onChange}
                                placeholder="email"
                                name="email"
                                type="email"
                            />
                            <Input
                                value={registrationCredentials.name}
                                onChange={onChange}
                                placeholder="name"
                                name="name"
                                type="text"
                            />
                            <Input
                                value={registrationCredentials.password}
                                onChange={onChange}
                                placeholder="password"
                                name="password"
                                type="password"
                            />

                            <Input
                                value={registrationCredentials.repeatPassword}
                                onChange={onChange}
                                placeholder="repeat password"
                                name="repeatPassword"
                                type="password"
                            />
                        </>
                    )}
                </div>
                <button className="h-[30%]">Submit</button>
            </form>
            <button
                onClick={() => setIsLoginForm(!isLoginForm)}
                className="text-xs border p-2 mb-4"
            >
                {isLoginForm
                    ? "Haven't registered yet ?"
                    : 'Already have an account ?'}
            </button>
        </div>
    )
}

export default Login
