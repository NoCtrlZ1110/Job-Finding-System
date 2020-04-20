import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
export const FindJob: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card style={{ height: "40em" }}>
            <Card.Header>
              <strong>
                <h5>TÌM KIẾM VIỆC LÀM</h5>
              </strong>
            </Card.Header>
            <Card.Body>
              This is some text within a card
              body.asfduyisdhfiaskdjfhasukdfhadsuifkashdfkuasjdfhauskdjfhasdfuk
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
