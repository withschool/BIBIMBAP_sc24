import React, { Component } from "react";
import { Link } from "react-router-dom";

//import icon
import FeatherIcon from "feather-icons-react";
import { Col, Container, Form, Input, Label, Row } from "reactstrap";

//import images
import contact from "../assets/images/contact.png";

import { submitSchoolApplication } from '../service/school';


interface ContactState {
  schoolName: string;
  schoolPhoneNumber: string;
  schoolAdminName: string;
  schoolAdminEmail: string;
}

export default class Contact extends Component<{}, ContactState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      schoolName: '',
      schoolPhoneNumber: '',
      schoolAdminName: '',
      schoolAdminEmail: ''
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<ContactState, keyof ContactState>);
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await submitSchoolApplication(this.state);
      console.log('Application submitted successfully:', response);
      // Handle the response as needed, e.g., show a success message or redirect
    } catch (error) {
      console.error('Error submitting application:', error);
      // Handle the error as needed, e.g., show an error message
    }
  };
  render() {
    return (
      <React.Fragment>
        <section className="section" id="contact">
          <Container>
            <Row>
              <Col lg={6}>
                <h2 className="fw-bold mb-4">문의하기</h2>
                <p className="text-muted mb-5">
                  학교랑 서비스를 이용하고 싶으신가요? 문의 폼을 통해서 간편하게 문의해 보세요
                </p>
                <div>
                  <Form method="post" name="myForm" onSubmit={this.handleSubmit}>
                    <p id="error-msg"></p>
                    <div id="simple-msg"></div>
                    <Row>
                      <Col lg={6}>
                        <div className="mb-4">
                          <Label htmlFor="schoolAdminName" className="text-muted form-label">
                            이름
                          </Label>
                          <Input
                            name="schoolAdminName"
                            id="schoolAdminName"
                            type="text"
                            className="form-control"
                            placeholder="성함을 입력해 주세요"
                            value={this.state.schoolAdminName}
                            onChange={this.handleChange}
                          />
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="mb-4">
                          <Label htmlFor="schoolAdminEmail" className="text-muted form-label">
                            이메일
                          </Label>
                          <Input
                            name="schoolAdminEmail"
                            id="schoolAdminEmail"
                            type="email"
                            className="form-control"
                            placeholder="이메일을 입력해 주세요"
                            value={this.state.schoolAdminEmail}
                            onChange={this.handleChange}
                          />
                        </div>
                      </Col>
                      <Col md={12}>
                        <div className="mb-4">
                          <Label htmlFor="schoolName" className="text-muted form-label">
                            학교 이름
                          </Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="schoolName"
                            name="schoolName"
                            placeholder="학교 이름을 입력해 주세요"
                            value={this.state.schoolName}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="mb-4 pb-2">
                          <Label htmlFor="schoolPhoneNumber" className="text-muted form-label">
                            전화번호
                          </Label>
                          <textarea
                            name="schoolPhoneNumber"
                            id="schoolPhoneNumber"
                            className="form-control"
                            placeholder="전화번호를 입력해 주세요"
                            value={this.state.schoolPhoneNumber}
                            onChange={this.handleChange}
                          ></textarea>
                        </div>
                        <button type="submit" name="send" className="btn btn-primary">
                          지금 바로 문의하기
                        </button>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
              <Col lg={5} className="ms-lg-auto">
                <div className="mt-5 mt-lg-0">
                  <img src={contact} alt="" className="img-fluid d-block" />
                  <p className="text-muted mt-5 mb-3">
                    <i>
                      <FeatherIcon icon="mail" className="me-2 text-muted icon icon-xs" />
                    </i>{" "}
                    withSchool.service@gmail.com
                  </p>
                  <p className="text-muted mb-3">
                    <i>
                      <FeatherIcon icon="phone" className="me-2 text-muted icon icon-xs" />
                    </i>{" "}
                    010-1234-5678
                  </p>
                  <p className="text-muted mb-3">
                    <i>
                      <FeatherIcon icon="map-pin" className="me-2 text-muted icon icon-xs" />
                    </i>{" "}
                    경기도 수원시 영통구 월드컵로 206
                  </p>
                  <ul className="list-inline pt-4">
                    <li className="list-inline-item me-3">
                      <Link to="#" className="social-icon icon-mono avatar-xs rounded-circle">
                        <i>
                          <FeatherIcon icon="facebook" className="icon-xs" />
                        </i>{" "}
                      </Link>
                    </li>
                    <li className="list-inline-item me-3">
                      <Link to="#" className="social-icon icon-mono avatar-xs rounded-circle">
                        <i>
                          <FeatherIcon icon="twitter" className="icon-xs" />
                        </i>{" "}
                      </Link>
                    </li>
                    <li className="list-inline-item me-3">
                      <Link to="#" className="social-icon icon-mono avatar-xs rounded-circle">
                        <i>
                          <FeatherIcon icon="instagram" className="icon-xs" />
                        </i>{" "}
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}