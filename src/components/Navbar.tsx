
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
  /* STYLING NOTES — Navbar
     - Removed `bg-blue-300`: HeroUI's Navbar is already "blurred glass"
       by default (semi-transparent background + backdrop-blur), so the
       feed scrolls nicely underneath it. `isBordered` adds a thin bottom
       line to separate it from the page.
     - maxWidth="lg" keeps the logo/avatar from flying to the far edges on
       very wide screens.
     - Brand color (primary) is used only for the logo and the main
       call-to-action ("Sign Up"), so the eye goes there first. */
  return (
    <HeroUiNavbar isBordered maxWidth="lg">
      <NavbarBrand>
        {/* flex + gap-2 → logo ring and text side by side */}
        <Link to={"/"} className="flex items-center gap-2">
          {/* The logo: an empty circle made with a thick primary border */}
          <span className="size-7 rounded-full border-[5px] border-primary" />
          {/* font-extrabold + tracking-tight → bold, compact wordmark */}
          <p className="text-xl font-extrabold tracking-tight text-foreground">Circle</p>
        </Link>
      </NavbarBrand>

      {/* gap-3 → even spacing between the right-side items */}
      <NavbarContent  as="div" justify="end" className="gap-3">
        {

          isLoggedIn?


       ( <Dropdown placement="bottom-end">
          <DropdownTrigger>
            {/* color="primary" → the avatar ring uses the brand color
                hover:scale-105 → small "pop" on hover to show it's clickable */}
            <Avatar
              isBordered
              as="button"
              className="transition-transform hover:scale-105"
              color="primary"
              name={userData?.name}
              size="sm"
              src={userData?.photo}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            {/* h-auto py-2 → let the item grow to fit 3 lines of text */}
            <DropdownItem textValue="profile" key="profile" className="h-auto py-2">
              <Link className="block" to="/profile">
                {/* Hierarchy: small muted label → bold name → muted email */}
                <p className="text-xs text-default-500">Signed in as</p>
                <p className="font-semibold">{userData?.name}</p>
                <p className="text-xs text-default-500">{userData?.email}</p>
              </Link>
            </DropdownItem>
            <DropdownItem textValue="logout" onPress={logout} key="logout" color="danger" className="text-danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>)
:
       ( <>
          <NavbarItem>
            {/* Secondary action: plain text link, turns primary on hover */}
            <Link to={"/signin"} className="text-sm font-medium text-default-600 transition-colors hover:text-primary">
              Sign In
            </Link>
          </NavbarItem>
          <NavbarItem>
            {/* Primary action: filled pill button
                rounded-full → pill shape | bg-primary + text-primary-foreground → brand colors
                hover:opacity-90 + transition-opacity → soft hover feedback */}
            <Link to={"/signup"} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              Sign Up
            </Link>
          </NavbarItem>
        </>)
        }

      </NavbarContent>
    </HeroUiNavbar>
  );
}
