import { getWebinarsAction } from "@/actions/webinar-action"

export default async function WebinarsPage() {
    const { webinars, error } = await getWebinarsAction()
    if (error) {
        return <div>{error}</div>
    }
    return (
        <div>
            <h1>{JSON.stringify(webinars)}</h1>
        </div>
    )
}