import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, ButtonToolbar, Button, ButtonGroup, Alert } from 'react-bootstrap';
import { fetchShipments, removeShipment, shipmentsDataChangedNotificationShown } from '../../actions/shipmentActions';
import Pagination from 'react-bootstrap/Pagination';
import { Weights, Status, Type } from '../../models/shipment'
import FiltersPopup from './FiltersPopup'

class Shipment extends Component {
    state = {
        itemPerPage: 10,
        activePage: 0,
        filters: {
            type: Object.keys(Type).map((_, i) => i),
            status: Object.keys(Status).map((_, i) => i),
            weight: Object.keys(Weights).map((_, i) => i),
            location: []
        },
        showFiltersPopup: false
    }

    componentDidMount() {
        if (this.props.shipmentsDataChanged) {
            setTimeout(() => this.props.shipmentsDataChangedNotificationShown(), 1000);
        } else {
            this.props.fetchShipments();
        }

        this.setState({
            filters: {
                ...this.state.filters,
                location: this.props.offices.map(o => o.id)
            }
        })
    }

    onAddClick = () => {
        this.props.history.push({
            pathname: "shipment/add",
            state: {
                mode: 'add',
                shipment: {
                    office: this.props.offices[0],
                    type: 0,
                    status: 0,
                    weight: 0
                }
            }
        });
    }

    onToggleFilters = () => {
        this.setState({ showFiltersPopup: !this.state.showFiltersPopup })
    }

    onApplyFilters = (filters) => {
        this.setState({ filters });
        this.onToggleFilters();
    }

    onEditClick = (shipment) => {
        this.props.history.push({
            pathname: "shipment/edit",
            state: { mode: 'edit', shipment }
        });
    }

    onRemoveClick = (shipment) => {
        this.props.removeShipment(shipment.id);
    }

    onPaginationClick = (idx) => {
        this.setState({ activePage: idx });
    }

    isDataRecentlyModified = () => {
        return this.props.shipmentAdded || this.props.shipmentEdited;
    }

    render() {
        console.log(this.state.filters);
        let shipments = this.props.shipments
            .filter(shipment => this.state.filters.type.indexOf(shipment.type) !== -1)
            .filter(shipment => this.state.filters.status.indexOf(shipment.status) !== -1)
            .filter(shipment => this.state.filters.weight.indexOf(shipment.weight) !== -1)
            .filter(shipment => this.state.filters.location.indexOf(shipment.office.id) !== -1);

        return (
            <div className="container-inner">
                <Alert variant="success" show={this.props.shipmentsDataChanged} style={{ opacity: 1 }}>
                    Shipments Successfuly {this.props.shipmentAdded ? 'Created' : 'Edited'}
                </Alert>

                <div>
                    <div>
                        <ButtonGroup aria-label="Basic example" className="add-button">
                            <Button href="#" onClick={(e) => this.onToggleFilters()}>
                                Filters
                            </Button>

                            <div style={{ display: "inline-block", width: 5 }}></div>

                            <Button href="#" onClick={(e) => this.onAddClick()}>
                                Add Shipment
                            </Button>
                        </ButtonGroup>
                    </div>

                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Office</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th>Weight</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                shipments
                                    .filter((_, i) => i >= this.state.itemPerPage * this.state.activePage && i < this.state.itemPerPage * (this.state.activePage + 1))
                                    .map((shipment, i) =>
                                        <tr key={this.state.itemPerPage * this.state.activePage + i}>
                                            <td>{shipment.id}</td>
                                            <td>{shipment.office.name}</td>
                                            <td>{Type[Object.keys(Type)[shipment.type]]}</td>
                                            <td>{Status[Object.keys(Status)[shipment.status]]}</td>
                                            <td>{Weights[Object.keys(Weights)[shipment.weight]]}</td>
                                            <td width="120px">
                                                <ButtonToolbar>
                                                    <Button variant="warning" onClick={(e) => this.onEditClick(shipment)} disabled={this.props.shipmentsDataChanged} >
                                                        <i className="fas fa-edit"></i>
                                                    </Button>
                                                    <div style={{ display: "inline-block", width: 5 }}></div>
                                                    <Button variant="danger" onClick={(e) => this.onRemoveClick(shipment)} disabled={this.props.shipmentsDataChanged}>
                                                        <i className="fas fa-trash"></i>
                                                    </Button>
                                                </ButtonToolbar>
                                            </td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </Table>
                    <FiltersPopup show={this.state.showFiltersPopup} filters={this.state.filters} offices={this.props.offices} handleApplyClick={this.onApplyFilters} handleCloseClick={this.onToggleFilters} />
                </div>

                <Pagination style={{ display: 'flex', justifyContent: 'center' }}>
                    {
                        shipments
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
        shipments: state.shipments.shipments,
        shipmentsDataChanged: state.shipments.shipmentsDataChanged,
        offices: state.offices.offices,
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchShipments: () => dispatch(fetchShipments()),
        removeShipment: (id) => dispatch(removeShipment(id)),
        shipmentsDataChangedNotificationShown: () => dispatch(shipmentsDataChangedNotificationShown()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shipment);