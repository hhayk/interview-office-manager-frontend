import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { addShipment, editShipment } from '../../actions/shipmentActions';
import { Weights, Status, Type } from '../../models/shipment'

class AddEditShipment extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.location.state;

        this.handleOfficeChange = this.handleOfficeChange.bind(this);
        this.handleToggleChange = this.handleToggleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.shipmentsDataChanged !== prevProps.shipmentsDataChanged) {
            this.props.history.push("/shipment");
        }
    }

    handleOfficeChange(event) {
        let id = event.target.value;
        let office = this.props.offices.filter(o => o.id === Number(id)).shift();

        this.setState({
            shipment: {
                ...this.state.shipment,
                office
            }
        });
    }

    handleToggleChange(event) {
        let id = event.target.id;
        let name = event.target.name;
        this.setState({
            shipment: {
                ...this.state.shipment,
                [name]: Number(id.slice(-1))
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.isEditMode()) {
            this.props.editShipment(this.state.shipment);
        } else {
            this.props.addShipment(this.state.shipment);
        }
    }

    isEditMode = () => {
        return this.state.mode === 'edit';
    }

    render() {
        return (
            <>
                <h2>{this.isEditMode() ? 'Edit Shipment' : 'Add Shipment'}</h2>

                <div className="form-outer-border">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formOffice" as={Row}>
                            <Form.Label column sm={2}>Post Office</Form.Label>
                            <Col sm={10}>
                                <Form.Control as="select" name="office" onChange={this.handleOfficeChange} defaultValue={this.state.shipment.office.id}>
                                    {
                                        this.props.offices.map((office, i) =>
                                            <option value={office.id} key={i}>{office.name}</option>
                                        )
                                    }
                                </Form.Control>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formType">
                            <Form.Label column sm={2}>
                                Type
                            </Form.Label>
                            <Col sm={10}>
                                {
                                    Object.keys(Type).map((type, i) =>
                                        <Form.Check
                                            type="radio"
                                            id={'typeRadios' + i}
                                            key={i}
                                            label={Type[type]}
                                            defaultChecked={this.state.shipment.type === i}
                                            name="type"
                                            onChange={this.handleToggleChange}
                                        />
                                    )
                                }
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formStatus">
                            <Form.Label column sm={2}>
                                Status
                            </Form.Label>
                            <Col sm={10}>
                                {
                                    Object.keys(Status).map((status, i) =>
                                        <Form.Check
                                            type="radio"
                                            id={'statusRadios' + i}
                                            key={i}
                                            label={Status[status]}
                                            defaultChecked={this.state.shipment.status === i}
                                            name="status"
                                            onChange={this.handleToggleChange}
                                        />
                                    )
                                }
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formWeight">
                            <Form.Label column sm={2}>
                                Weight
                            </Form.Label>
                            <Col sm={10}>
                                {
                                    Object.keys(Weights).map((weight, i) =>
                                        <Form.Check
                                            type="radio"
                                            id={'weightRadios' + i}
                                            key={i}
                                            label={Weights[weight]}
                                            defaultChecked={this.state.shipment.weight === i}
                                            name="weight"
                                            onChange={this.handleToggleChange}
                                        />
                                    )
                                }
                            </Col>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        offices: state.offices.offices,
        shipmentsDataChanged: state.shipments.shipmentsDataChanged
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        addShipment: (data) => dispatch(addShipment(data)),
        editShipment: (data) => dispatch(editShipment(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditShipment);