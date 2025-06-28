import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card";

export default function SkeletonCard(){
    return (
        <>
            <Card className="h-[250px] w-full p-0 m-0">
                <Skeleton className="h-full w-full"/>
            </Card>
        </>
    )
}