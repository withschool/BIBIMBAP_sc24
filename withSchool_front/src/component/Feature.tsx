import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

// Import FeatherIcon
import FeatherIcon from "feather-icons-react";

// Import Feature Image
import Background from "../assets/images/demos.png";
import features_img1 from "../assets/images/features-1.jpg";
import dot_img from "../assets/images/dot-img.png";
import features_img2 from "../assets/images/features-2.jpg";

class Feature extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="section bg-light" id="features">
          <Container>
            <Row className="justify-content-center mb-5">
              <Col lg={7} className="text-center">
                <h2 className="fw-bold">주요 기능</h2>
                <p className="text-muted">
                  학교랑은 체계적인 온라인 시스템을 제공하여, 누구나 손쉽게 이용 및 관리하실 수 있습니다.
                </p>
              </Col>
            </Row>

            <Row className="align-items-center mb-5">
              <Col md={5} className="order-2 order-md-1 mt-md-0 mt-5">
                <h2 className="mb-4">어드민 시스템을 통한 통합 관리</h2>
                <p className="text-muted mb-5">
                  어드민 시스템을 통하며 반 및 과목을 관리하고, CSV 파일 업로드를 통해 손쉽게 구성원 관리를 진행하실 수 있습니다.
                </p>
                <Link to="/login" className="btn btn-primary">
                  어드민 접속하기{" "}
                  {/* <i>
                    <FeatherIcon icon="arrow-right" className="icon-xs ms-2" />
                  </i> */}
                </Link>
              </Col>
              <Col md={6} className="ms-md-auto order-1 order-md-2">
                <div className="position-relative">
                  <div className="ms-5 features-img">
                    <img
                      src={features_img1}
                      alt=""
                      className="img-fluid d-block mx-auto rounded shadow"
                    />
                  </div>
                  <img src={dot_img} alt="" className="dot-img-left" />
                </div>
              </Col>
            </Row>
            <Row className="align-items-center section pb-0">
              <Col md={6}>
                <div className="position-relative mb-md-0 mb-5">
                  <div className="me-5 features-img">
                    <img
                      src={features_img2}
                      alt=""
                      className="img-fluid d-block mx-auto rounded shadow"
                    />
                  </div>
                  <img src={dot_img} alt="" className="dot-img-right" />
                </div>
              </Col>
              <Col md={5} className="ms-md-auto">
                <h2 className="mb-4">
                  남녀 노소 누구나,<br/>손쉬운 서비스 이용
                </h2>
                <p className="text-muted mb-5">
                  학생/학부모/교사간의 간편한 커뮤니케이션을 돕기 위하여,<br/>강력하고 손쉬운 UI 및 핵심 기능을 제공합니다.
                </p>
                <Link to="/login" className="btn btn-primary">
                  사용자 접속하기{" "}
                  {/* <i>
                    <FeatherIcon icon="arrow-right" className="icon-xs ms-2" />
                  </i> */}
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
        <section className="section bg-gradient-primary">
          <div
            className="bg-overlay-img"
            style={{ background: `url(${Background})` }}
          ></div>
          <Container>
            <Row className="justify-content-center">
              <Col lg={8}>
                <div className="text-center">
                  <h1 className="text-white mb-4">
                    지금 당장 학교랑을 도입해 보세요.
                  </h1>
                  <p className="text-white mb-5 font-size-16">
                    종이로 이루어진 가정통신문, 불편한 오프라인 소통에서 벗어나 보세요.<br/>
                    학교랑을 통해 온라인 교육의 미래를 경험해 보세요.
                  </p>
                  <Link to="/login" className="btn btn-lg btn-light">
                    서비스 이용하기{" "}
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default Feature;