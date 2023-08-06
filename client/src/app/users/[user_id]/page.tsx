


export default function UserPage({params}: {params:{user_id: string}}) {
    return (
        <div>
            <h1>Users</h1>
            <h1>{params.user_id}</h1>
        </div>
    )
}