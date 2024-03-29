﻿import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import authService from '../api-authorization/AuthorizeService';
import filterFactory, { selectFilter, textFilter } from 'react-bootstrap-table2-filter';
import { Navigate } from 'react-router-dom';


//const[showModal, setShowModal] = useState([]);
//первый параметр в квадратных скобках говорит о том,
//что это переменная будет передаваться в название метода
//указанного вторым в квадратых скобках, значение которое
//будет хранить переменная указано в useState([]), 
//т.е. она хранит пустой массив 

export class Airplanes extends Component {

    static displayName = Airplanes.name;

    constructor(props) {
        super(props);
        this.state = {
            toEdit: false,
            isAutentificated: false,
            data: [], loading: true,
            row: null,
            columns: [
                { dataField: "ida", text: "IDA", sort: true, filter: textFilter() }, //add filter into BootstrapTable
                { dataField: "name_Airplanes", text: "Name airplane", sort: true, filter: textFilter() },
                { dataField: "number_places", text: "Number places", sort: true, filter: textFilter() },
                { dataField: "creator", text: "Creator", sort: true, filter: textFilter() },
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
        localStorage.setItem("username", user.name);
        var response = await fetch(`api/airplanes/get?username=${user.name}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });

        if (response.status !== 204) {
            const dataAirplanes = await response.json();
            //set real id man in table, not number
            localStorage.setItem("REA", JSON.stringify(dataAirplanes));
            this.setState({ loading: false, data: dataAirplanes, isAutentificated: true });
            //remove!!
            return;
        }
        this.setState({ loading: false, isAutentificated: false });
    }

    renderAirplanes() {
        if (this.state.isAutentificated && !this.state.toEdit) { 
            const rowEvent = {
                onClick: (e, row) => {
                    console.log(row);
                    const row_ = row
                    this.setState({ toEdit: true, row: row_ });
                    localStorage.setItem("REA", JSON.stringify(row));
                }
            };

            const create = () =>{
                this.setState({ toEdit: true });
                this.state.toEdit = true;
                localStorage.removeItem("REA");
            };

            return (
                <div>
                    <center><h1 id="tabelLabel" >Airplanes data</h1></center>
                    {/* rendering table */}
                    <BootstrapTable bootstrap4 keyField='ida' columns={this.state.columns}
                        data={this.state.data} pagination={this.state.pagination} filter={(filterFactory())}
                        rowEvents={rowEvent} />
                        <input type="submit" value="Добавить" onClick={create} ></input>
                </div>
            );
        }
        if (this.state.toEdit) {
            return (<Navigate to="/airplanes/edit" />);
        }
        return (<Navigate to="/notfound" />);
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderAirplanes();
        return (
            <div>
                {contents}
            </div>
        );
    }
}

export default Airplanes;