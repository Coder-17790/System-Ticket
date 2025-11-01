import UserList from "./userList";

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Xin chào, bạn đã đăng nhập!</h1>
      <UserList />
    </div>
  )
}
