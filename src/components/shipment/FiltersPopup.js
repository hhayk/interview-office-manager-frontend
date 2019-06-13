
import React, { Component } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { Weights, Status, Type } from '../../models/shipment'

class FiltersPopup extends Component {
    componentDidMount() {
        this.setState({ filters: this.props.filters });
    }

    handleToggleChange = (event) => {
        let name = event.target.name;
        let id = Number(event.target.id.slice(-1));
        this.setState({
            filters: {
                ...this.state.filters,
                [name]: event.target.checked ? [...this.state.filters[name], id] : this.state.filters[name].filter(f => f !== id)
            }
        });
    }

    handleOfficeChange = (event) => {
        let ids = [...event.target.selectedOptions].map(node => Number(node.value));
        this.setState({
            filters: {
                ...this.state.filters,
                location: ids
            }
        });
    }

    render() {
        return <Modal show={this.props.show} onHide={this.props.handleCloseClick} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div key={`inline-checkbox`} className="mb-3">
                    <Form.Group controlId="formOffice" as={Row}>
                        <Form.Label column sm={2}>Post Office</Form.Label>
                        <Col sm={10}>
                            <Form.Control as="select" name="office" onChange={this.handleOfficeChange} multiple defaultValue={this.props.filters.location}>
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
                                        type="checkbox"
                                        id={'typeRadios' + i}
                                        key={i}
                                        label={Type[type]}
                                        name="type"
                                        defaultChecked={this.props.filters.type.indexOf(i) > -1}
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
                                        type="checkbox"
                                        id={'statusRadios' + i}
                                        key={i}
                                        label={Status[status]}
                                        name="status"
                                        defaultChecked={this.props.filters.status.indexOf(i) > -1}
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
                                        type="checkbox"
                                        id={'weightRadios' + i}
                                        key={i}
                                        label={Weights[weight]}
                                        defaultChecked={this.props.filters.weight.indexOf(i) > -1}
                                        name="weight"
                                        onChange={this.handleToggleChange}
                                    />
                                )
                            }
                        </Col>
                    </Form.Group>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={e => this.props.handleApplyClick(this.state.filters)}>
                    Save Changes
          </Button>
            </Modal.Footer>
        </Modal >
    }
}

export default FiltersPopup;