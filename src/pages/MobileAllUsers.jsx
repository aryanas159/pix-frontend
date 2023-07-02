import AllUsersWidget from "../components/AllUsersWidget";
import Navbar from "../components/Navbar";
const MobileAllUsers = () => {
    return (
        <>
            <Navbar/>
            <div style={{
                display: 'flex',
                justifyContent: 'center'
            }}>
            <AllUsersWidget/>
            </div>
        </>
    )
}
export default MobileAllUsers;