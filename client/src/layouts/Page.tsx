import useIsMobile from '@/hooks/useIsMobile'

const Page = ({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) => {
    const isMobile = useIsMobile()

    const titleExceptions = ['Projects'] // do not show projects title, since it's rendered differently

    return (
        <div className="flex h-full w-full flex-col items-center gap-4 rounded-lg bg-gray-300 p-4">
            {title && !isMobile && !titleExceptions.includes(title) && (
                <h1 className="text-2xl">{title}</h1>
            )}
            {children}
        </div>
    )
}

export default Page
