import React, { Component } from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { Col, Container, Form, Input, Label, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import contact from "../assets/images/contact.png";
import { submitSchoolApplication } from '../service/apply';
import { getSchoolListFromNeis } from '../service/school';
import './Contact.css'; // Import the CSS file
import { Button } from "reactstrap";

interface ContactState {
  schoolName: string;
  schoolPhoneNumber: string;
  schoolAdminName: string;
  schoolAdminEmail: string;
  dropdownOpen: boolean;
  filteredSchools: { schoolName: string, sd_SCHUL_CODE: string }[];
  sd_SCHUL_CODE: string;
  isSubmitting: boolean; // Add this line

}

export default class Contact extends Component<{}, ContactState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      schoolName: '',
      schoolPhoneNumber: '',
      schoolAdminName: '',
      schoolAdminEmail: '',
      dropdownOpen: false,
      filteredSchools: [],
      sd_SCHUL_CODE: '',
      isSubmitting: false
    };
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };


  handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value } as unknown as Pick<ContactState, keyof ContactState>);

    if (name === "schoolName") {
      if (value) {
        try {
          const schools = await getSchoolListFromNeis(value);
          const filteredSchools = schools.map((school: any) => ({
            schoolName: `${school.schoolName} - ${school.schoolAddress}`,
            sd_SCHUL_CODE: school.sd_SCHUL_CODE
          }));
          this.setState({ filteredSchools, dropdownOpen: true });
        } catch (error) {
          console.error('Error fetching school list:', error);
        }
      } else {
        this.setState({ filteredSchools: [], dropdownOpen: false });
      }
    }
  };

  handleSelectSchool = (school: { schoolName: string, sd_SCHUL_CODE: string }) => {
    this.setState({ schoolName: school.schoolName, sd_SCHUL_CODE: school.sd_SCHUL_CODE, dropdownOpen: false });
  };

  handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { schoolName, schoolPhoneNumber, schoolAdminName, schoolAdminEmail } = this.state;

    if (!schoolName || !schoolPhoneNumber || !schoolAdminName || !schoolAdminEmail) {
      alert('모든 항목을 입력해 주세요.');
      return;
    }

    this.setState({ isSubmitting: true }); // Disable the button

    try {
      const applicationData = {
        schoolName,
        schoolPhoneNumber,
        schoolAdminName,
        schoolAdminEmail,
        serviceType: 0, // Assuming serviceType is 0, adjust as needed
        sd_SCHUL_CODE: this.state.sd_SCHUL_CODE
      };
      const response = await submitSchoolApplication(applicationData);
      console.log('Application submitted successfully:', response);
      alert('문의가 완료되었습니다.');
      this.setState({
        schoolName: '',
        schoolPhoneNumber: '',
        schoolAdminName: '',
        schoolAdminEmail: '',
        sd_SCHUL_CODE: '',
        filteredSchools: [],
        isSubmitting: false // Re-enable the button
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('문의 중 오류가 발생했습니다. 다시 시도해 주세요.');
      this.setState({ isSubmitting: false }); // Re-enable the button
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
                            onChange={(e) => {
                              const regex = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z\s]*$/;
                              if (regex.test(e.target.value)) {
                                this.handleChange(e);
                              }
                            }}
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
                            className="form-control mt-2"
                            id="schoolName"
                            name="schoolName"
                            placeholder="학교 이름을 검색해 주세요."
                            value={this.state.schoolName}
                            onChange={this.handleChange}
                          />
                          <div className="mb-2"></div>
                          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
                            <DropdownToggle caret className="form-control">
                              {this.state.schoolName || "학교를 검색하거나 선택해 주세요."}
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-scrollable">
                              {this.state.filteredSchools.map((school, index) => (
                                <DropdownItem key={index} onClick={() => this.handleSelectSchool(school)}>
                                  {school.schoolName}
                                </DropdownItem>
                              ))}
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                        <div className="mb-4 pb-2">
                          <Label htmlFor="schoolPhoneNumber" className="text-muted form-label">
                            전화번호
                          </Label>
                          <Input
                            name="schoolPhoneNumber"
                            id="schoolPhoneNumber"
                            type="text"
                            className="form-control"
                            placeholder="전화번호를 입력해 주세요"
                            value={this.state.schoolPhoneNumber}
                            onChange={(e) => {
                              let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기
                              if (value.length > 10) {
                                value = value.slice(0, 11); // 최대 11자리까지만 허용
                              }
                              if (value.length > 3 && value.length <= 7) {
                                value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
                              } else if (value.length > 7) {
                                value = value.replace(/(\d{3})(\d{3,4})(\d{1,4})/, '$1-$2-$3');
                              }
                              this.setState({ schoolPhoneNumber: value });
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12}>
                        <div className="d-grid">
                          <Button
                            type="submit"
                            color="primary"
                            className="btn"
                            disabled={this.state.isSubmitting} // Disable the button when submitting
                          >
                            {this.state.isSubmitting ? '문의 중...' : '문의하기'}
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
              <Col lg={6}>
                <div className="mt-4 mt-lg-0">
                  <img src={contact} alt="" className="img-fluid" />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}