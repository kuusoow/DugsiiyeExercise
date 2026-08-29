import UserList from './UserList'

export default function App(){

  return(
  <>


     <table border={1}>
            <tr>
            <th>Name:</th>
            <th>Email</th>
            <th>Number</th>
            </tr>
            <tbody>
  <UserList user={{
    id: 1 ,
    name:"Abdullahi",
    email:'abdulahi@gmail.com',
    number:25261090897
   } }
   />
  
  <UserList user={{
    id: 1 ,
    name:"Ali",
    email:'abdulahi@gmail.com',
    number:25261090897
   } }
   />


  <UserList user={{
    id: 1 ,
    name:"Abdi",
    email:'abdi@gmail.com',
    number:25261090897
   } }
   />

    <UserList user={{
    id: 1 ,
    name:"hassan",
    email:'hassan@gmail.com',
    number:25261090897
   } }
   />


</tbody>
</table>
  </>)
}