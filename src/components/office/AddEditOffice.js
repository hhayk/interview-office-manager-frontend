import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { addOffice, editOffice } from '../../actions/officeActions';

class AddEditOffice extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.location.state;

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.officeDataChanged !== prevProps.officeDataChanged) {
            this.props.history.push("/office");
        }
    }

    handleChange(event) {
        let value = event.target.value;
        let name = event.target.name;

        this.setState({
            office: {
                ...this.state.office,
                [name]: Number(value) || value
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.isEditMode()) {
            this.props.editOffice(this.state.office);
        } else {
            this.props.addOffice(this.state.office);
        }
    }

    isEditMode = () => {
        return this.state.mode === 'edit';
    }

    render() {
        return (
            <>
                <h2>{this.isEditMode() ? 'Edit Office' : 'Add Office'}</h2>

                <div className="form-outer-border">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formOfficeName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter office name" name="name" value={this.state.office.name} onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formZipcode">
                            <Form.Label>Zipcode</Form.Label>
                            <Form.Control type="number" placeholder="Enter office zipcode" name="zipCode" value={this.state.office.zipCode} onChange={this.handleChange} />
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
        officeDataChanged: state.offices.officeDataChanged
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        addOffice: (data) => dispatch(addOffice(data)),
        editOffice: (data) => dispatch(editOffice(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditOffice);