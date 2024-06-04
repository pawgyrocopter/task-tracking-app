import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginFormFields } from './types'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { validateEmail, validatePassword } from '@/utils/validation'
import { loginUser } from '@/services/AuthService'

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
        <div className="w-[22rem] bg-gray-500 h-[22rem] rounded-lg flex flex-col justify-center items-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full h-full flex flex-col mt-[1rem] items-center justify-center gap-2"
            >
                <div className="flex flex-col gap-1 justify-center items-center">
                    <div className="w-[16rem]">
                        <input
                            {...register('email', {
                                required: 'Email is required',
                                validate: validateEmail,
                            })}
                            type="email"
                            placeholder="Email"
                            className="border px-1 text-sm w-[16rem] h-[1.5rem] rounded-sm"
                        />
                        <p className="text-red-500 text-xs">
                            {errors.email?.message}
                        </p>
                    </div>
                    <div className="w-[16rem]">
                        <input
                            {...register('password', {
                                required: 'Password is required',
                                validate: validatePassword,
                            })}
                            type="password"
                            placeholder="Password"
                            className="border px-1 text-sm w-[16rem] h-[1.5rem] rounded-sm"
                        />
                        <p className="text-red-500 text-xs">
                            {errors.password?.message}
                        </p>
                    </div>
                </div>
                <button
                    disabled={isSubmitting}
                    className="text-sm bg-gray-300 rounded-lg hover:bg-white duration-300 w-[5rem] h-[2rem] disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Loading...' : 'Login'}
                </button>
                <p className="text-red-500 text-xs h-4">
                    {errors.root?.message}
                </p>
            </form>
            <button
                onClick={() => setIsLoginForm(false)}
                className="text-sm my-4"
            >
                Haven't registered yet ?
            </button>
        </div>
    )
}

export default Login
