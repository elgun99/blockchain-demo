import React from 'react';
import {Input, Col, Container, CardBody, Card, Button} from 'mdbreact';

function AddBlock(props) {
  return (
    <Container>
        <div className="row pa2 ma2 justify-content-center">
          <Col md="4">
            <Card>
              <CardBody>
                <form>
                  <div className="tc">
                    <input type="text" placeHolder="block data" onChange={props.onChange} value={props.data}/>

                  </div>
                  <div className="tc">
                    <Button onClick={props.onClick} color="blue">Add new Block<i className="fa fa-plus-square-o ml-2"></i></Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </div>
    </Container>
  );
}

export default AddBlock;
