import React from "react";
import {Schedule, IntelliWandWindow} from "../components";
import {Row, Col} from "react-bootstrap"

const Home = () => {
    return(
        <div className="my-2 h-[50rem]">
            <Row className="mx-4 h-[49rem]">
                <Col md={2}>
                    <IntelliWandWindow/>
                </Col>
                <Col md={10}>
                    <Schedule/>
                </Col>
            </Row>
        </div>
    )
    
}
export default Home;