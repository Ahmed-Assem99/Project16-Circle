
import {
  Navbar as HeroUiNavbar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarItem,
} from "@heroui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../contexts/authContext";

export default function Navbar() {

  const {isLoggedIn,setisLoggedIn,userData}=useContext(authContext)


  function logout(){
    localStorage.removeItem("token")
    setisLoggedIn(false)
    
  }
  return (
    <HeroUiNavbar className="bg-blue-300">
      <NavbarBrand>
        <Link to={"/"}>
          <p className="font-bold text-inherit">CIRCLE</p>
        </Link>
      </NavbarBrand>

      <NavbarContent  as="div" justify="end">
        {

          isLoggedIn?


       ( <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={"user name"}
              size="sm"
              src={userData?.photo}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem textValue="profile" key="profile">
              <Link className="h-14" to="/profile">
                <p className="font-semibold">Signed in as{userData?.name}</p>
                <p className="font-semibold">{userData?.email}</p>
              </Link>
            </DropdownItem>
            <DropdownItem textValue="logout" onPress={logout} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>)
:
       ( <>
          <NavbarItem>
            <Link to={"/signin"}>SignIn</Link>
          </NavbarItem>
          <NavbarItem>
            <Link to={"/signup"}>SignUp</Link>
          </NavbarItem>
        </>)
        }

      </NavbarContent>
    </HeroUiNavbar>
  );
}
