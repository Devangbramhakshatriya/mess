import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
  } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from "react-router-dom";
import {GiHamburgerMenu} from "react-icons/gi"

export function SideDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    let token = localStorage.getItem("user_token")
    const handleLogout = () => {
        localStorage.setItem("user_token", "")
    }
    return (
      <>
        <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
        <GiHamburgerMenu/>
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>
  
            <DrawerBody >
            <RouterLink to="/"><Button onClick={onClose}>Order</Button></RouterLink>
                <RouterLink to="/login" onClick={onClose}><Button display={!token ? "none" : ""} onClick={handleLogout}>Logout</Button></RouterLink>
                <RouterLink to="/profile"><Button onClick={onClose}>Profile</Button></RouterLink>
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

