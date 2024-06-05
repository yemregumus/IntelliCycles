import React from "react";
import {Schedule, IntelliWandWindow} from "../components";
import {Row, Col} from "react-bootstrap"

const Reminders = () => {
    return(
        <div className="items-center">
            <Row className="mx-4 h-full">
                <Col md={2}>
                    <IntelliWandWindow/>
                </Col>
                <Col md={10}>
                    <Schedule type="reminder"/>
                </Col>
            </Row>
        </div>
    )
    
}
export default Reminders;