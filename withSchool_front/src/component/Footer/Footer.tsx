import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import FooterLink from "../Footer/Footer_link";

// Footer Image
import footer_image from "../../assets/images/footer-bg.png";
import logolight from "../../assets/images/logo-light.png";

// Define types for the state
interface LinkItem {
  title: string;
  link: string;
}

interface LinkGroup {
  id: number;
  title: string;
  child: LinkItem[];
}

interface FooterState {
  links: LinkGroup[];
}

class Footer extends Component<{}, FooterState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      links: [
        {
          id: 1,
          title: "Customer",
          child: [
            { title: "Works", link: "/" },
            { title: "Strategy", link: "/" },
            { title: "Releases", link: "/" },
            { title: "Press", link: "/" },
            { title: "Mission", link: "/" },
          ],
        },
        {
          id: 2,
          title: "Product",
          child: [
            { title: "Tranding", link: "/" },
            { title: "Popular", link: "/" },
            { title: "Customers", link: "/" },
            { title: "Features", link: "/" },
          ],
        },
        {
          id: 3,
          title: "Information",
          child: [
            { title: "Developers", link: "/" },
            { title: "Support", link: "/" },
            { title: "Customer Service", link: "/" },
            { title: "Get Started", link: "/" },
            { title: "Guide", link: "/" },
          ],
        },
        {
          id: 4,
          title: "Support",
          child: [
            { title: "FAQ", link: "/" },
            { title: "Contact", link: "/" },
            { title: "Disscusion", link: "/" },
          ],
        },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        {/* Footer Start */}
        <footer
          className="footer"
          style={{ backgroundImage: `url(${footer_image})` }}
        >
          <Container>
            <Row>
              <Col lg={4}>
                <div className="mb-4">
                  <Link to="#">
                    <img src={logolight} alt="" className="" height="30" />
                  </Link>
                  <p className="text-white-50 my-4">
                    학교랑 서비스를 통하여 온라인을 통한 체계화된 관리 시스템을 경험하고, 학생/학부모/교사간의
                    커뮤니케이션을 원할하게 이끌어 낼 수 있습니다.
                  </p>
                </div>
              </Col>
              <Col lg={7} className="ms-lg-auto">
                <Row>
                  {/* Render Footer Link */}
             
                </Row>
              </Col>
            </Row>
            {/* Render Footer Link End */}
            <FooterLink />
          </Container>
        </footer>
        {/* Footer End */}
      </React.Fragment>
    );
  }
}

export default Footer;