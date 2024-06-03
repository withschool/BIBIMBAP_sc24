import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import FeatherIcon from "feather-icons-react";

interface ServicesProps {}

class Services extends Component<ServicesProps> {
  render() {
    return (
      <React.Fragment>
        <section className="section" id="services">
          <Container>
            <Row className="justify-content-center mb-5">
              <Col lg={7} className="text-center">
                <h2 className="fw-bold">서비스 소개</h2>
                <p className="text-muted">
                  학교랑은 체계적인 온라인 교육을 돕는 커뮤니케이션에 특화된 서비스 입니다.
                  사용자들은 학교랑 서비스를 통하여 논리적인 커뮤니케이션이 가능합니다.
                </p>
              </Col>
            </Row>

            <Row>
              <Col lg={4}>
                <div className="service-box text-center px-4 py-5 position-relative mb-4">
                  <div className="service-box-content p-4">
                    <div className="icon-mono service-icon avatar-md mx-auto mb-4">
                      <i>
                        <FeatherIcon icon="box" />
                      </i>
                    </div>
                    <h4 className="mb-3 font-size-22">바쁜 업무를<br/>더욱 체계적으로</h4>
                    <p className="text-muted mb-0">
                      학생의 다양한 정보부터 학부모에게 전달할 수 있는 모든 내용을 체계적으로 전달해 보세요.
                    </p>
                  </div>
                </div>
              </Col>

              <Col lg={4}>
                <div className="service-box text-center px-4 py-5 position-relative mb-4 active">
                  <div className="service-box-content p-4">
                    <div className="icon-mono service-icon avatar-md mx-auto mb-4">
                      <i>
                        <FeatherIcon icon="layers" />
                      </i>
                    </div>
                    <h4 className="mb-3 font-size-22">손쉬운 정보의 확인과<br/>수업의 몰입</h4>
                    <p className="text-muted mb-0">
                      손쉽게 공지사항/성적/과목의 정보를 확인하고, 강의노트를 통하여 수업에 참여해 보세요.
                    </p>
                  </div>
                </div>
              </Col>

              <Col lg={4}>
                <div className="service-box text-center px-4 py-5 position-relative mb-4">
                  <div className="service-box-content p-4">
                    <div className="icon-mono service-icon avatar-md mx-auto mb-4">
                      <i>
                        <FeatherIcon icon="server" />
                      </i>
                    </div>
                    <h4 className="mb-3 font-size-22">자녀에 대한 모든것,<br/>더욱 안심할 수 있도록</h4>
                    <p className="text-muted mb-0">
                      자녀가 보는 공지사항 및 준비 사항들을 함께<br/>확인하며 선생님과 손쉽게 이야기 나누어 보세요.
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}

export default Services;