import { useIsFetching, useIsMutating } from "@tanstack/react-query"

export const GlobalLoader = () => {
    const isFetching = useIsFetching();
    const isMutating = useIsMutating();
    if (!isFetching && !isMutating) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    )
}