export default function UserList({user}){
    return(
        <>
       
            <tr>
                 <td>{user.name}</td>
                 <td>{user.email}</td>
                 <td>{user.number}</td>

            </tr>
            
        
        </>
    )
}