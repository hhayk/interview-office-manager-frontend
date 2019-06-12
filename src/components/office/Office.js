import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, ButtonToolbar, Button, Alert } from 'react-bootstrap';
import { fetchOffices, removeOffice, officeDataChangedNotificationShown } from '../../actions/officeActions';
import Pagination from 'react-bootstrap/Pagination';

class Office extends Component {
    state = {
        itemPerPage: 5,
        activePage: 0
    }

    componentDidMount() {
        if (this.props.officeDataChanged) {
            setTimeout(() => this.props.officeDataChangedNotificationShown(), 1000);
        } else {
            this.props.fetchOffices();
        }
    }

    onAddClick = () => {
        this.props.history.push({
            pathname: "office/add",
            state: {
                mode: 'add',
                office: {
                    name: '',
                    zipCode: 0,
                }
            }
        });
    }

    onEditClick = (office) => {
        this.props.history.push({
            pathname: "office/edit",
            state: { mode: 'edit', office }
        });
    }

    onRemoveClick = (office) => {
        this.props.removeOffice(office.id);
    }

    onPaginationClick = (idx) => {
        this.setState({ activePage: idx });
    }

    render() {
        return (
            <div className="container-inner">
                <Alert variant="success" show={this.props.officeDataChanged} style={{ opacity: 1 }}>
                    Offce Data Updated Successfuly
                </Alert>

                <div>
                    <Button href="#" className="add-button" onClick={(e) => this.onAddClick()} disabled={this.props.officeDataChanged}>
                        Add Office
                    </Button>

                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>ZipCode</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.offices
                                    .filter((_, i) => i >= this.state.itemPerPage * this.state.activePage && i < this.state.itemPerPage * (this.state.activePage + 1))
                                    .map((office, i) =>
                                        <tr key={this.state.itemPerPage * this.state.activePage + i}>
                                            <td>{office.id}</td>
                                            <td>{office.name}</td>
                                            <td>{office.zipCode}</td>
                                            <td width="120px">
                                                <ButtonToolbar>
                                                    <Button variant="warning" onClick={(e) => this.onEditClick(office)} disabled={this.props.officeDataChanged} >
                                                        <i className="fas fa-edit"></i>
                                                    </Button>
                                                    <div style={{display: "inline-block", width: 5}}></div>
                                                    <Button variant="danger" onClick={(e) => this.onRemoveClick(office)} disabled={this.props.officeDataChanged}>
                                                        <i className="fas fa-trash"></i>
                                                    </Button>
                                                </ButtonToolbar>
                                            </td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </Table>
                </div>

                <Pagination style={{ display: 'flex', justifyContent: 'center' }}>
                    {
                        this.props.offices
                            .filter((_, i) => i % this.state.itemPerPage === 0)
                            .map((_, i) =>
                                <Pagination.Item key={i} active={i === this.state.activePage} onClick={(e) => this.onPaginationClick(i)}>
                                    {i + 1}
                                </Pagination.Item>
                            )
                    }
                </Pagination>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        offices: state.offices.offices,
        officeDataChanged: state.offices.officeDataChanged,
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchOffices: () => dispatch(fetchOffices()),
        removeOffice: (id) => dispatch(removeOffice(id)),
        officeDataChangedNotificationShown: () => dispatch(officeDataChangedNotificationShown()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Office);