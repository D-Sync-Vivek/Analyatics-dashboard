export default function Loading() {
    return (
        <div className="flex flex-col gap-5 w-full">

            {/* 1. Metric Cards Skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-24 rounded-xl bg-gray-800 animate-pulse" />
                ))}
            </div>

            {/* 2. Chart & Table Skeleton */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                {/* Chart Skeleton */}
                <div className="col-span-4 h-100 rounded-xl bg-gray-800 animate-pulse" />

                {/* Table Skeleton */}
                <div className="col-span-3 h-100 rounded-xl bg-gray-800 animate-pulse" />

            </div>
        </div>
    )
}