import React from "react";
import { Row, Col } from 'reactstrap';

interface FooterLinkProps {}

const FooterLink: React.FC<FooterLinkProps> = () => {
  return (
    // Footer Link start
    <Row>
      <Col lg={12}>
        <div className="text-center mt-5">
          <p className="text-white-50 f-15 mb-0">
            © 2024. Withschool All rights reserved.
          </p>
        </div>
      </Col>
    </Row>
    // Footer Link End
  );
}

export default FooterLink;