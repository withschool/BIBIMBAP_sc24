import React, { Component } from "react";
import { Link } from "react-router-dom";

//import images
import team1 from "../assets/images/team/1.jpg";
import team2 from "../assets/images/team/2.jpg";
import team3 from "../assets/images/team/3.jpg";
import team4 from "../assets/images/team/4.jpg";

//import icon 
import FeatherIcon from "feather-icons-react";
import { Col, Container, Row } from "reactstrap";

interface TeamMember {
  profile: string;
  name: string;
  designation: string;
}

interface TeamState {
  teamData: TeamMember[];
}

export default class Team extends Component<{}, TeamState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      teamData: [
        {
          profile: "https://w7.pngwing.com/pngs/710/71/png-transparent-profle-person-profile-user-circle-icons-icon-thumbnail.png",
          name: "이권민",
          designation: "서버 총괄 담당",
        },
        {
          profile: "https://w7.pngwing.com/pngs/710/71/png-transparent-profle-person-profile-user-circle-icons-icon-thumbnail.png",
          name: "남창현",
          designation: "마케팅 총괄 담당",
        },
        {
          profile: "https://w7.pngwing.com/pngs/710/71/png-transparent-profle-person-profile-user-circle-icons-icon-thumbnail.png",
          name: "최현수",
          designation: "프론트 총괄 담당",
        },
        {
          profile: "https://w7.pngwing.com/pngs/710/71/png-transparent-profle-person-profile-user-circle-icons-icon-thumbnail.png",
          name: "박찬빈",
          designation: "CS 총괄 담당",
        },
      ],
    };
  }

  render() {
    return (
      <React.Fragment>
        <section className="section bg-light" id="team">
          <Container>
            <Row className="justify-content-center mb-4">
              <Col lg={7} className="text-center">
                <h2 className="fw-bold">학교랑의 전문가</h2>
                <p className="text-muted">
                  최고의 전문가들로 이루어져 있는 팀에게 전문적으로 지원받아 보세요.
                </p>
              </Col>
            </Row>

            <Row>
              {this.state.teamData.map((team, key) => (
                <Col lg={3} sm={6} key={key}>
                  <div className="team-box mt-4 position-relative overflow-hidden rounded text-center shadow">
                    <div className="position-relative overflow-hidden">
                      <img
                        src={team.profile}
                        alt=""
                        className="img-fluid d-block mx-auto"
                      />
                      {/* <ul className="list-inline p-3 mb-0 team-social-item">
                        <li className="list-inline-item mx-3">
                          <Link to="#" className="team-social-icon h-primary">
                            <i>
                              <FeatherIcon
                                icon="facebook"
                                className="icon-sm"
                              />
                            </i>
                          </Link>
                        </li>
                        <li className="list-inline-item mx-3">
                          <Link to="#" className="team-social-icon h-info">
                            <i>
                              <FeatherIcon icon="twitter" className="icon-sm" />
                            </i>
                          </Link>
                        </li>
                        <li className="list-inline-item mx-3">
                          <Link to="#" className="team-social-icon h-danger">
                            <i>
                              <FeatherIcon
                                icon="instagram"
                                className="icon-sm"
                              />
                            </i>
                          </Link>
                        </li>
                      </ul> */}
                    </div>
                    <div className="p-4">
                      <h5 className="font-size-19 mb-1">{team.name}</h5>
                      <p className="text-muted text-uppercase font-size-14 mb-0">
                        {team.designation}
                      </p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
  }
}