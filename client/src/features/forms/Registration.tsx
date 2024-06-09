import { SubmitHandler, useForm } from 'react-hook-form'
import { RegistrationFormFields } from './types'
import {
    validateEmail,
    validateName,
    validatePassword,
    validatePhoneNumber,
} from '@/utils/validation'
import { registerUser } from '@/services/AuthService'

const Registration = ({
    setIsLoginForm,
}: {
    setIsLoginForm: (isLoginForm: boolean) => void
}) => {
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RegistrationFormFields>()

    const onSubmit: SubmitHandler<RegistrationFormFields> = async (data) => {
        try {
            await registerUser(data)
            setIsLoginForm(true)
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
                            {...register('name', {
                                required: 'Name is required',
                                validate: validateName,
                            })}
                            type="text"
                            placeholder="Name"
                            className="h-[1.5rem] w-[16rem] rounded-sm border px-1 text-sm"
                        />
                        <p className="text-xs text-red-500">
                            {errors.name?.message}
                        </p>
                    </div>
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
                            {...register('phoneNumber', {
                                required: 'Phone number is required',
                                validate: validatePhoneNumber,
                            })}
                            type="telephone"
                            placeholder="Phone number"
                            className="h-[1.5rem] w-[16rem] rounded-sm border px-1 text-sm"
                        />
                        <p className="text-xs text-red-500">
                            {errors.phoneNumber?.message}
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
                            className="h-[1.5rem] w-[16rem] rounded-sm border px-1 text-sm"
                        />
                        <p className="text-xs text-red-500">
                            {errors.password?.message}
                        </p>
                    </div>
                    <div className="w-[16rem]">
                        <input
                            {...register('repeatPassword', {
                                required: 'Password is required',
                                validate: (value: string) => {
                                    return value === getValues('password')
                                        ? true
                                        : 'Passwords should be the same'
                                },
                            })}
                            type="password"
                            placeholder="Repeat password"
                            className="h-[1.5rem] w-[16rem] rounded-sm border px-1 text-sm"
                        />
                        <p className="text-xs text-red-500">
                            {errors.repeatPassword?.message}
                        </p>
                    </div>
                </div>
                <button
                    disabled={isSubmitting}
                    className="h-[2rem] w-[5rem] rounded-lg bg-gray-300 text-sm duration-300 hover:bg-white disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Loading...' : 'Register'}
                </button>
                <p className="h-4 text-xs text-red-500">
                    {errors.root?.message}
                </p>
            </form>
            <button
                onClick={() => setIsLoginForm(true)}
                className="my-4 text-sm"
            >
                Already have an account ?
            </button>
        </div>
    )
}

export default Registration
