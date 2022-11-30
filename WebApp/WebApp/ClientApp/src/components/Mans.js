import React, { Component, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import authService from './api-authorization/AuthorizeService';
import filterFactory, { selectFilter, textFilter } from 'react-bootstrap-table2-filter';
import { Navigate } from 'react-router-dom';
import { Modal, Button, ModalBody } from 'react-bootstrap';

//const[showModal, setShowModal] = useState([]);
//первый параметр в квадратных скобках говорит о том,
//что это переменная будет передаваться в название метода
//указанного вторым в квадратых скобках, значение которое
//будет хранить переменная указано в useState([]), 
//т.е. она хранит пустой массив 

export class Mans extends Component {

    static displayName = Mans.name;

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            modalInfo: [],
            showModal: false,
            successful: false,
            data: [], loading: true,
            columns: [
                { dataField: "idm", text: "IDM", sort: true, filter: textFilter() }, //add filter into BootstrapTable
                { dataField: "passport_number", text: "Passport Number", sort: true, filter: textFilter() },
                { dataField: "name", text: "Name", sort: true, filter: textFilter() },
                { dataField: "surname", text: "Surname", sort: true, filter: textFilter() },
                {
                    dataField: "sex", text: "Sex", sort: true,
                    filter: selectFilter({
                        options: {
                            false: 'false',
                            true: 'true'
                        }
                    })
                },
            ],
            //add pagination into BootstrapTable
            pagination: paginationFactory({
                page: 1,
                sizePerPage: 5,
                lastPageText: ">>",
                firstPageText: "<<",
                nextPageText: ">",
                prePageText: "<",
                showTotal: true,
                alwaysShowAllBtns: true,
                onPageChange: function (page, sizePerPage) {
                    console.log("page", page);
                    console.log("sizePerPage", sizePerPage);
                },
                onSizePerPageChange: function (page, sizePerPage) {
                    console.log("page", page);
                    console.log("sizePerPage", sizePerPage);
                }
            })
        };
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.getData());
        this.getData();
    }

    async getData() {
        const token = await authService.getAccessToken();

        const [user] = await Promise.all([authService.getUser()]);
        this.state.userName = user.name;

        var response = await fetch(`api/mans/get?username=${user.name}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });

        if (response.status !== 204) {
            const dataMans = await response.json();
            this.setState({ loading: false, data: dataMans, successful: true });
            return;
        }
        this.setState({ loading: false, successful: false });
    }

    renderMans() {
        if (this.state.successful) {
            //modalIndo = setModalInfo
            //showModal = setShowModal
            //show      = setShow
            //when user click on element table

            const handleShow = () => {
                this.state.show = true;
                // this.setState({ show: true });
            };

            const handleClose = () => {
                this.state.show = false;
                // this.setState({ show: false });
            };
            //can be error
            const toggleTrueFalse = () => {
                this.state.showModal = handleShow;
                // this.setState({ showModal: handleShow });
            };
            //rendering modal window
            const ModalContent = () => {
                return (
                    <Modal show={this.state.show} onHide={handleClose()}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.state.modalInfo.idm}</Modal.Title>
                        </Modal.Header>
                        <ModalBody>
                            {/* realise function add, delete, update */}
                        </ModalBody>
                        <Modal.Footer>
                            <Button variant='secondary' onClick={handleClose()}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                );
            };

            const rowEvent = {
                onClick: (e, row) => {
                    console.log(row);
                    this.state.modalInfo = row;
                    toggleTrueFalse();
                }
            };

            return (
                <div>
                    <center><h1 id="tabelLabel" >Mans data</h1></center>
                    {/* rendering table */}
                    <BootstrapTable bootstrap4 keyField='idm' columns={this.state.columns}
                        data={this.state.data} pagination={this.state.pagination} filter={(filterFactory())}
                        rowEvents={rowEvent} />
                    {/* rendering modal window */}
                    {this.state.show ? <ModalContent /> : null}
                </div>
            );
        }
        return (<Navigate to="/notfound" />);
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderMans();
        return (
            <div>
                {contents}
            </div>
        );
    }
}

export default Mans;