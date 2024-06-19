import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginFormFields } from './types'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { validateEmail } from '@/utils/validation'
import { loginUser } from '@/services/auth/AuthService'

const Login = ({
    setIsLoginForm,
}: {
    setIsLoginForm: (isLoginForm: boolean) => void
}) => {
    const navigate = useNavigate()
    const { login } = useAuth()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormFields>()

    const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
        try {
            const tokens = await loginUser(data)
            login(tokens)
            navigate('/projects')
        } catch (error) {
            if (error instanceof Error) {
                setError('root', {
                    message: error.message,
                })
            }
        }
    }

    return (
        <div className="flex h-[22rem] w-[22rem] flex-col items-center justify-center rounded-lg bg-gray-500">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-[1rem] flex h-full w-full flex-col items-center justify-center gap-2"
            >
                <div className="flex flex-col items-center justify-center gap-1">
                    <div className="w-[16rem]">
                        <input
                            {...register('email', {
                                required: 'Email is required',
                                validate: validateEmail,
                            })}
                            type="email"
                            placeholder="Email"
                            className="h-[1.5rem] w-[16rem] rounded-sm border px-1 text-sm"
                        />
                        <p className="text-xs text-red-500">
                            {errors.email?.message}
                        </p>
                    </div>
                    <div className="w-[16rem]">
                        <input
                            {...register('password', {
                                required: 'Password is required',
                            })}
                            type="password"
                            placeholder="Password"
                            className="h-[1.5rem] w-[16rem] rounded-sm border px-1 text-sm"
                        />
                        <p className="text-xs text-red-500">
                            {errors.password?.message}
                        </p>
                    </div>
                </div>
                <button
                    disabled={isSubmitting}
                    className="h-[2rem] w-[5rem] rounded-lg bg-gray-300 text-sm duration-300 hover:bg-white disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Loading...' : 'Login'}
                </button>
                <p className="h-4 text-xs text-red-500">
                    {errors.root?.message}
                </p>
            </form>
            <button
                onClick={() => setIsLoginForm(false)}
                className="my-4 text-sm"
            >
                Haven't registered yet ?
            </button>
        </div>
    )
}

export default Login
