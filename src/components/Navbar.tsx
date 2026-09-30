
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
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
const isUserLoggedIn: boolean = !!localStorage.getItem("token")
  const navigate= useNavigate()
  function logout(){
    localStorage.removeItem("token")
    navigate("/signin")
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

          isUserLoggedIn?


       ( <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name={"user name"}
              size="sm"
              src={"photo"}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile">
              <Link className="h-14" to="/profile">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">test@test.test</p>
              </Link>
            </DropdownItem>
            <DropdownItem onPress={logout} key="logout" color="danger">
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
