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
        <div className="w-[22rem] bg-gray-500 h-[22rem] rounded-lg flex flex-col justify-center items-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full h-full flex flex-col mt-[1rem] items-center justify-center gap-2"
            >
                <div className="flex flex-col gap-1 justify-center items-center">
                    <div className="w-[16rem]">
                        <input
                            {...register('name', {
                                required: 'Name is required',
                                validate: validateName,
                            })}
                            type="text"
                            placeholder="Name"
                            className="border px-1 text-sm w-[16rem] h-[1.5rem] rounded-sm"
                        />
                        <p className="text-red-500 text-xs">
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
                            className="border px-1 text-sm w-[16rem] h-[1.5rem] rounded-sm"
                        />
                        <p className="text-red-500 text-xs">
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
                            className="border px-1 text-sm w-[16rem] h-[1.5rem] rounded-sm"
                        />
                        <p className="text-red-500 text-xs">
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
                            className="border px-1 text-sm w-[16rem] h-[1.5rem] rounded-sm"
                        />
                        <p className="text-red-500 text-xs">
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
                            className="border px-1 text-sm w-[16rem] h-[1.5rem] rounded-sm"
                        />
                        <p className="text-red-500 text-xs">
                            {errors.repeatPassword?.message}
                        </p>
                    </div>
                </div>
                <button
                    disabled={isSubmitting}
                    className="text-sm bg-gray-300 rounded-lg hover:bg-white duration-300 w-[5rem] h-[2rem] disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Loading...' : 'Register'}
                </button>
                <p className="text-red-500 text-xs h-4">
                    {errors.root?.message}
                </p>
            </form>
            <button
                onClick={() => setIsLoginForm(true)}
                className="text-sm my-4"
            >
                Already have an account ?
            </button>
        </div>
    )
}

export default Registration
