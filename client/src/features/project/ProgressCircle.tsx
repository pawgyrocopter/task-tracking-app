const ProgressCircle = ({ progress }: { progress: number }) => {
    const getColor = () => {
        if (progress >= 75) return 'bg-green-500'
        if (progress >= 50) return 'bg-yellow-500'
        return 'bg-red-500'
    }

    return (
        <div className="relative z-[0] h-8 w-8">
            <div className="absolute inset-0 overflow-hidden rounded-full bg-gray-300">
                <div
                    className={`absolute bottom-0 left-0 z-[0] w-full ${getColor()}`}
                    style={{ height: `${Math.min(progress, 100)}%` }}
                ></div>
            </div>
        </div>
    )
}

export default ProgressCircle
