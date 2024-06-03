import React, { Component, Suspense } from "react";
import Switch from "../../component/Switch";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import hero1 from "../../assets/images/hero-1-img.png";
import Background from "../../assets/images/hero-1-bg.png";
import herolight from "../../assets/images/hero-1-bottom-shape.png";
import herodark from "../../assets/images/hero-1-bottom-shape-dark.png";

import './App.css';
import '../../assets/scss/themes.scss';
import '../../assets/css/materialdesignicons.min.css';
import '../../assets/css/pe-icon-7.css';
// import '../../assets/scss/themes.scss';

import ModalVideo from "react-modal-video";
import "../../../node_modules/react-modal-video/scss/modal-video.scss";



const Navbar = React.lazy(() => import("../../component/Navbar/NavBar"));
const Services = React.lazy(() => import("../../component/Services"));
const Feature = React.lazy(() => import("../../component/Feature"));
const Pricing = React.lazy(() => import("../../component/Pricing"));
const Team = React.lazy(() => import("../../component/Team"));
const Blog = React.lazy(() => import("../../component/Blog"));
const Contact = React.lazy(() => import("../../component/Contact"));
const Footer = React.lazy(() => import("../../component/Footer/Footer"));

interface SectionState {
  isOpen: boolean;
  navClass: string;
  imglight: boolean;
}

class Landing extends Component<{}, SectionState> {


  state = {
    isOpen: false,
    navItems: [
      { id: 1, idnm: "home", navheading: "Home" },
      { id: 2, idnm: "services", navheading: "Services" },
      { id: 3, idnm: "features", navheading: "Features" },
      { id: 4, idnm: "pricing", navheading: "Pricing" },
      { id: 5, idnm: "team", navheading: "Team" },
      { id: 6, idnm: "blog", navheading: "Blog" },
      { id: 7, idnm: "contact", navheading: "Contact Us" },
    ],
    pos: document.documentElement.scrollTop,
    imglight: true,
    navClass: "",
  };

  componentDidMount() {
    window.addEventListener("scroll", this.scrollNavigation, true);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollNavigation, true);
  }

  constructor(props: {}) {
    super(props);
    this.state = {
      isOpen: false,
      navItems: [
        { id: 1, idnm: "home", navheading: "Home" },
        { id: 2, idnm: "services", navheading: "Services" },
        { id: 3, idnm: "features", navheading: "Features" },
        { id: 4, idnm: "pricing", navheading: "Pricing" },
        { id: 5, idnm: "team", navheading: "Team" },
        { id: 6, idnm: "blog", navheading: "Blog" },
        { id: 7, idnm: "contact", navheading: "Contact Us" },
      ],
      pos: document.documentElement.scrollTop,
      imglight: true,
      navClass: "",
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  scrollNavigation = () => {
    var scrollup = document.documentElement.scrollTop;
    if (scrollup > this.state.pos) {
      this.setState({ navClass: "nav-sticky", imglight: false });
    } else {
      this.setState({ navClass: "", imglight: true });
    }
  };

  PreLoader = () => {
    return (
      <div id="preloader">
        <div id="status">
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Suspense fallback={this.PreLoader()}>
          <Navbar
            navItems={this.state.navItems}
            navClass={this.state.navClass}
            imglight={this.state.imglight}
          />
          <section
            className="hero-1 bg-center bg-primary position-relative"
            style={{ background: `url(${Background})` }}
            id="home"
          >
            <Container>
              <Row className="align-items-center hero-content">
                <Col lg={5}>
                  <h1 className="text-white display-7 font-weight-semibold mb-4 hero-1-title">
                    온라인을 통해 교육의ㅤ미래를 열어보세요
                  </h1>
                  <p className="text-white-70 mb-4  mb-lg-5">
                    학교랑 서비스를 통하여 온라인을 통한 체계화된 관리 시스템을 경험하고, 학생/학부모/교사간의
                    커뮤니케이션을 원할하게 이끌어 낼 수 있습니다.
                  </p>
                  <Link to="/login" className="btn btn-lg btn-light rounded-pill me-2">
                    바로 접속하기
                  </Link>
                  {/* <div className="d-inline-block" onClick={this.openModal}>
                  <Link to="#" className="video-play-icon text-white">
                    <span className="play-icon-circle me-2">
                      <i>
                        <FeatherIcon icon="play" className="icon-sm icon" />{"ㅁㄴㅇㄹㄴㅁㅇㄹ"}
                      </i>
                    </span>
                    <span className="">Watch The Video!</span>
                  </Link>
                </div> */}
                </Col>
                <Col lg={6} sm={10} className="mx-auto ms-lg-auto me-lg-0">
                  <div className="mt-lg-0 mt-4">
                    <img src={hero1} alt="" className="img-md-responsive" />
                  </div>
                </Col>
              </Row>
            </Container>
            <ModalVideo
              channel="vimeo"
              isOpen={this.state.isOpen}
              videoId="12022651"
              onClose={() => this.setState({ isOpen: false })}
            />
            <div className="hero-bottom-shape shape-light">
              <img src={herolight} alt="" className="img-fluid d-block mx-auto" />
            </div>
            <div className="hero-bottom-shape shape-dark">
              <img src={herodark} alt="" className="img-fluid d-block mx-auto" />
            </div>
          </section>
          <Services />
          <Feature />
          <Pricing />
          <Team />
          <Blog />
          <Contact />
          <Footer />
          <Switch />
        </Suspense>
      </React.Fragment>
    );
  }
}

export default Landing;