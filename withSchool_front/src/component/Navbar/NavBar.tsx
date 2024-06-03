import React, { Component } from "react";
import {
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem as ReactstrapNavItem,
  NavLink,
  Container,
  Collapse,
} from "reactstrap";
import { Link } from "react-router-dom";
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import FeatherIcon from "feather-icons-react";
import ScrollspyNav from "./Scrollspy";

interface NavbarPageProps {
  navItems: { id: number; idnm: string; navheading: string }[];
  navClass: string;
  imglight: boolean;
}

interface NavbarPageState {
  isOpenMenu: boolean;
}

class NavbarPage extends Component<NavbarPageProps, NavbarPageState> {
  constructor(props: NavbarPageProps) {
    super(props);
    this.state = {
      isOpenMenu: false,
    };
  }

  toggle = () => {
    this.setState({ isOpenMenu: !this.state.isOpenMenu });
  };

  render() {
    const targetId = this.props.navItems.map((item) => item.idnm);
    return (
      <React.Fragment>
        <nav
          className={`navbar navbar-expand-lg fixed-top navbar-custom ${this.props.navClass}`}
          id="navbar"
        >
          <Container>
            <NavbarBrand className="logo" href="/">
              {this.props.imglight ? (
                <img src={logolight} alt="" height="28" />
              ) : (
                <img src={logodark} alt="" height="28" />
              )}
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle}>
              <i>
                <FeatherIcon icon="menu" />
              </i>
            </NavbarToggler>
            <Collapse isOpen={this.state.isOpenMenu} className="navbar-collapse">
              <ScrollspyNav
                scrollTargetIds={targetId}
                scrollDuration={800}
                headerBackground="true"
                activeNavClass="active"
                className="navbar-collapse"
              >
                <Nav navbar className="ms-auto navbar-center" id="mySidenav">
                  {this.props.navItems.map((item, key) => (
                    <ReactstrapNavItem
                      key={key}
                      className={item.navheading === "Home" ? "active" : ""}
                    >
                      <NavLink
                        className={item.navheading === "Home" ? "active" : ""}
                        href={`#${item.idnm}`}
                      >
                        {item.navheading}
                      </NavLink>
                    </ReactstrapNavItem>
                  ))}
                </Nav>
                <Link to="" className="btn btn-sm rounded-pill nav-btn ms-lg-3">
                  Buy Now
                </Link>
              </ScrollspyNav>
            </Collapse>
          </Container>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavbarPage;