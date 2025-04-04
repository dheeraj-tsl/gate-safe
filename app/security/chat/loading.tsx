import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-40" />

      <div className="bg-white rounded-xl overflow-hidden shadow-sm border">
        <div className="flex flex-col h-[75vh]">
          <div className="p-3 border-b">
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            <div className="border-r">
              <div className="p-2 border-b">
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2 p-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center space-x-3 p-2">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-1 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="col-span-2 flex flex-col h-full">
              <div className="border-b p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-4 space-y-4">
                <div className="flex justify-start">
                  <div className="flex items-start">
                    <Skeleton className="h-8 w-8 rounded-full mr-2" />
                    <Skeleton className="h-20 w-48 rounded-lg" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Skeleton className="h-16 w-48 rounded-lg" />
                </div>
                <div className="flex justify-start">
                  <div className="flex items-start">
                    <Skeleton className="h-8 w-8 rounded-full mr-2" />
                    <Skeleton className="h-24 w-56 rounded-lg" />
                  </div>
                </div>
              </div>

              <div className="border-t p-3 flex items-center gap-2">
                <Skeleton className="h-10 flex-1 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

