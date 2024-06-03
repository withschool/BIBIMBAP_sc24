import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

//import images
import user1 from "../assets/images/user/img-2.jpg";
import user2 from "../assets/images/user/img-3.jpg";
import user3 from "../assets/images/user/img-1.jpg";
import Background from "../assets/images/cta-bg.png";
import demo from "../assets/images/demos.png";

interface BlogProps { }

interface BlogState { }

export default class Blog extends Component<BlogProps, BlogState> {
  render() {
    return (
      <React.Fragment>
        <section className="section" id="blog">
          <Container>
            <Row className="justify-content-center mb-4">
              <Col lg={7} className="text-center">
                <h2 className="fw-bold">학교랑 소식</h2>
                <p className="text-muted">
                  학교랑의 여러 소식을 최신으로 받아보세요.
                </p>
              </Col>
            </Row>
            <Row>
              <Col lg={4}>
                <Card className="mt-4 border-0 shadow">
                  <CardBody className="p-4">
                    <span className="badge badge-soft-primary">
                      서비스 업데이트
                    </span>
                    <h4 className="font-size-22 my-4">
                      <Link to="#">
                        학교랑 서비스가 1.1버전으로<br />업데이트 되었습니다.
                      </Link>
                    </h4>
                    <p className="text-muted">
                      학교랑 서비스가 1.1버전으로 업데이트 되었습니다.<br />기존의 프로필 설정 기능이 개선되었습니다.
                    </p>
                    <div className="d-flex align-items-center mt-4 pt-2">
                      <img
                        src="https://w7.pngwing.com/pngs/710/71/png-transparent-profle-person-profile-user-circle-icons-icon-thumbnail.png"
                        className="rounded-circle avatar-sm me-3"
                        alt="..."
                      />
                      <div className="flex-body">
                        <h5 className="font-size-17 mb-0">박찬빈</h5>
                        <p className="text-muted mb-0 font-size-14">
                          CS 총괄 담당
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col lg={4}>
                <Card className="mt-4 border-0 shadow">
                  <CardBody className="p-4">
                    <span className="badge badge-soft-primary">긴급 안내</span>
                    <h4 className="font-size-22 my-4">
                      <Link to="#">
                        서비스 이용에 불편을 드려서 죄송합니다.
                      </Link>
                    </h4>
                    <p className="text-muted">
                      서비스가 2024-06-03 09:30에 약 30분간 다운되었습니다. 불편을 드려서 죄송합니다.
                    </p>
                    <div className="d-flex align-items-center mt-4 pt-2">
                      <img
                        src="https://w7.pngwing.com/pngs/710/71/png-transparent-profle-person-profile-user-circle-icons-icon-thumbnail.png"
                        className="rounded-circle avatar-sm me-3"
                        alt="..."
                      />
                      <div className="flex-body">
                        <h5 className="font-size-17 mb-0">이권민</h5>
                        <p className="text-muted mb-0 font-size-14">
                          서버 총괄 담당
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col lg={4}>
                <Card className="mt-4 border-0 shadow">
                  <CardBody className="p-4">
                    <span className="badge badge-soft-primary">이벤트 안내</span>
                    <h4 className="font-size-22 my-4">
                      <Link to="#">
                        학교랑 서비스를 SNS에<br />홍보해주세요!
                      </Link>
                    </h4>
                    <p className="text-muted">
                      학교랑 서비스를 이용하신 후 SNS를 통해 공유해주신 분들께 추첨을 통해 치킨 기프티콘을 드립니다.
                    </p>
                    <div className="d-flex align-items-center mt-4 pt-2">
                      <img
                        src="https://w7.pngwing.com/pngs/710/71/png-transparent-profle-person-profile-user-circle-icons-icon-thumbnail.png"
                        className="rounded-circle avatar-sm me-3"
                        alt="..."
                      />
                      <div className="flex-body">
                        <h5 className="font-size-17 mb-0">남창현</h5>
                        <p className="text-muted mb-0 font-size-14">
                          마케팅 총괄 담당
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
        <section
          className="section bg-center w-100 bg-light"
          style={{ background: `url(${Background})` }}
        >
          <Container>
            <Row>
              <Col lg={12}>
                <Card className="bg-gradient-primary text-center border-0">
                  <div
                    className="bg-overlay-img"
                    style={{ background: `url(${demo})` }}
                  ></div>
                  <CardBody className="mx-auto p-sm-5 p-4">
                    <Row className="justify-content-center">
                      <Col lg={10}>
                        <div className="p-3">
                          <h2 className="text-white mb-4">
                            학교랑 서비스의 지속적인 지원을 받아 보세요
                          </h2>
                          <p className="text-white-70 font-size-16 mb-4 pb-3">
                            학교랑 서비스 이용 중에 불편한 점이 있으신가요?<br/>아래 이메일을 통해 언제든지 문의해 보세요</p>
                          <Link to="mailto:withschool.service@gmail.com" className="btn btn-light rounded-pill">
                            문의하기
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}