import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  NavItem as ReactstrapNavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

// import images
import price2 from "../assets/images/pricing/2.png";
import price1 from "../assets/images/pricing/1.png";
import price3 from "../assets/images/pricing/3.png";
import { Link } from "react-router-dom";

interface PricingData {
  image: string;
  title: string;
  space: string;
  support: string;
  price: string;
  isPopular: boolean;
  isPrimary?: boolean;
}

interface PricingState {
  activeTab: string;
  monthlyPricingData: PricingData[];
  yearlyPricingData: PricingData[];
}

export default class Pricing extends Component<{}, PricingState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      activeTab: "1",
      monthlyPricingData: [
        {
          image: price1,
          title: "기본형",
          space: "100명",
          support: "미제공",
          price: "2.0만원",
          isPopular: false,
        },
        {
          image: price2,
          title: "고급형",
          space: "300명",
          support: "미제공",
          price: "2.2만원",
          isPopular: true,
          isPrimary: true,
        },
        {
          image: price3,
          title: "맞춤형",
          space: "무제한",
          support: "제공",
          price: "2.4만원",
          isPopular: false,
        },
      ],
      yearlyPricingData: [
        {
          image: price1,
          title: "기본형",
          space: "100명",
          support: "미제공",
          price: "1.8만원",
          isPopular: false,
        },
        {
          image: price2,
          title: "고급형",
          space: "300명",
          support: "미제공",
          price: "2.0만원",
          isPopular: false,
        },
        {
          image: price3,
          title: "맞춤형",
          space: "무제한",
          support: "제공",
          price: "2.2만원",
          isPopular: true,
          isPrimary: true,
        },
      ],
    };
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(tab: string) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <section className="section" id="pricing">
          <Container>
            <Row className="justify-content-center mb-5">
              <Col lg={7} className="text-center">
                <h2 className="fw-bold">서비스 가격</h2>
                <p className="text-muted">
                  학교랑은 최적의 가격으로 학교내의 모든 온라인 체계를 지원합니다.
                </p>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className="text-center mb-4 pricing-tab">
                  <ul
                    className="nav nav-pills rounded-pill justify-content-center d-inline-block shadow-sm"
                    id="pricingpills-tab"
                    role="tablist"
                  >
                    <ReactstrapNavItem className="d-inline-block">
                      <NavLink
                        to="#"
                        className={classnames(
                          { active: this.state.activeTab === "1" },
                          "rounded-pill"
                        )}
                        onClick={() => {
                          this.toggleTab("1");
                        }}
                      >
                        월 간
                      </NavLink>
                    </ReactstrapNavItem>
                    <ReactstrapNavItem className="d-inline-block">
                      <NavLink
                        to="#"
                        className={classnames(
                          { active: this.state.activeTab === "2" },
                          "rounded-pill"
                        )}
                        onClick={() => {
                          this.toggleTab("2");
                        }}
                      >
                        년 간
                      </NavLink>
                    </ReactstrapNavItem>
                  </ul>
                </div>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane className="fade show" tabId="1">
                    <Row>
                      {this.state.monthlyPricingData.map((monthly, key) => (
                        <Col lg={4} key={key}>
                          <Card className="plan-card mt-4 rounded text-center border-0 shadow overflow-hidden">
                            <CardBody className="px-4 py-5">
                              {monthly.isPopular && (
                                <span className="badge badge-primary pricing-badge shadow-lg">
                                  최고 인기 플랜ㅤㅤ
                                </span>
                              )}
                              <div className="icon-mono avatar-md bg-soft-primary rounded mx-auto mb-5 p-3">
                                <img
                                  src={monthly.image}
                                  alt=""
                                  className="img-fluid d-block mx-auto"
                                />
                              </div>
                              <h4 className="text-uppercase mb-4 pb-1">
                                {monthly.title}
                              </h4>
                              <p className="text-muted">
                                최대 사용자 수:{" "}
                                <span className="fw-bold">{monthly.space}</span>
                              </p>
                              <p className="text-muted">
                                맞춤형 기능:{" "}
                                <span className="fw-bold">
                                  {monthly.support}
                                </span>
                              </p>
                              <p className="text-muted mb-4 pb-1">학교 맞춤형 기능 추가 제공</p>
                              <p className="text-muted font-size-14 mb-1">
                                24시간 온라인 지원 활성화
                              </p>
                              <p className="text-dark font-size-16 font-weight-semibold mb-4">
                                {monthly.price} / 명 (사용자 수)
                              </p>
                              {monthly.isPrimary ? (
                                <Link to="#" className="btn btn-primary">
                                  문의 하기
                                </Link>
                              ) : (
                                <Link to="#" className="btn btn-soft-primary">
                                  문의 하기
                                </Link>
                              )}
                            </CardBody>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </TabPane>

                  <TabPane className="fade show" tabId="2">
                    <Row>
                      {this.state.yearlyPricingData.map((yearly, key) => (
                        <Col lg={4} key={key}>
                          <Card className="plan-card mt-4 rounded text-center border-0 shadow overflow-hidden">
                            <CardBody className="px-4 py-5">
                              {yearly.isPopular && (
                                <span className="badge badge-primary pricing-badge shadow-lg">
                                  최고 인기 플랜ㅤㅤ
                                </span>
                              )}
                              <div className="icon-mono avatar-md bg-soft-primary rounded mx-auto mb-5 p-3">
                                <img
                                  src={yearly.image}
                                  alt=""
                                  className="img-fluid d-block mx-auto"
                                />
                              </div>
                              <h4 className="text-uppercase mb-4 pb-1">
                                {yearly.title}
                              </h4>
                              <p className="text-muted">
                                최대 사용자 수:{" "}
                                <span className="fw-bold">{yearly.space}</span>
                              </p>
                              <p className="text-muted">
                                맞춤형 기능:{" "}
                                <span className="fw-bold">
                                  {yearly.support}
                                </span>
                              </p>
                              <p className="text-muted mb-4 pb-1">학교 맞춤형 기능 추가 제공</p>
                              <p className="text-muted font-size-14 mb-1">
                                24시간 온라인 지원 활성화
                              </p>
                              <p className="text-dark font-size-16 font-weight-semibold mb-4">
                                {yearly.price} / 명 (사용자 수)
                              </p>
                              {yearly.isPrimary ? (
                                <Link to="#" className="btn btn-primary">
                                  문의 하기
                                </Link>
                              ) : (
                                <Link to="#" className="btn btn-soft-primary">
                                  문의 하기
                                </Link>
                              )}
                            </CardBody>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </TabPane>
                </TabContent>
              </Col>
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}