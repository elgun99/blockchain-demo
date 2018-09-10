import React from 'react';
import { Container, Col, Input, Button, Fa, Card, CardBody, Badge} from 'mdbreact';

function Block(props) {
  return (
    <Container>
        <div className="row pa2 ma2 justify-content-center">
          <Col md="6">
            <Card>
              <div className={props.background}>
              <CardBody>
                <form>
                  <p className="h2 text-center">Block #{props.index}</p>
                  <div>
                    <Input onChange={props.onChange} size="sm" icon="pencil" hint={props.data}/>
                    <h6><Fa className="fa fa-book" /> <Badge color="indigo">Previous Hash:</Badge> <div className="f6 ba br2  b--dashed grey-text"> {props.pHash} </div></h6>
                    <h6><Fa className="fa fa-book" /> <Badge color="indigo">Hash:</Badge> <div className={props.hashOptions}> {props.hash} </div></h6>

                  </div>
                  <div className="tr">
                    <h6><Fa className="fa fa-cog" /> <Badge color="default">Nonce:</Badge>  <Badge color="grey" pill>{props.nonce}</Badge> </h6>
                  </div>
                  <div className="tc">
                    <Button onClick={props.onClick} color={props.buttonColor}>Mine<i className="fa fa-refresh ml-2"></i></Button>
                  </div>
                </form>
              </CardBody>
            </div>
            </Card>
          </Col>
        </div>
    </Container>
  );
}
export default Block;
