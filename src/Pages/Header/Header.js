import React from 'react';
import './Header.css'
import bg from '../../images/header-bg.png';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import logo from '../../images/logo.png'

const Header = () => {
    const [user, loading, error] = useAuthState(auth)
    return (
        <div>
            <div className='bgHeader'>
                <img src={bg} alt="" />
                <img src={bg} alt="" />
            </div>
            <div>
                <Navbar className='headerTop' expand="lg">

                    <Navbar.Brand as={Link} to="/#"><img  src={logo} alt="" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px', color: 'white' }}
                            navbarScroll
                        >
                            <Nav.Link as={Link} className='text-light h5' to="/home">Home</Nav.Link>
                            <Nav.Link as={Link} className='text-light h5' to="/blogs">Blogs</Nav.Link>
                            {
                                user?'':<Nav.Link as={Link} className='text-light h5' to="/login">Login</Nav.Link>
                            }

                            {
                                user &&
                                <>
                                    <Nav.Link as={Link} className='text-light h5' to="/manage-inventories">Manage Item</Nav.Link>
                                    <Nav.Link as={Link} className='text-light h5' to="/add-item">Add Item</Nav.Link>
                                    <Nav.Link as={Link} className='text-light h5' to="/my-items">My Items</Nav.Link>
                                    <Nav.Link as={Link} className='text-light h5' to="#" onClick={()=>signOut(auth)}>Sign out</Nav.Link>
                                </>
                            }
                            {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">
                                        Something else here
                                    </NavDropdown.Item>
                                </NavDropdown> */}

                        </Nav>
                        {/* <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form> */}
                    </Navbar.Collapse>

                </Navbar>
            </div>
        </div>
    );
};

export default Header;