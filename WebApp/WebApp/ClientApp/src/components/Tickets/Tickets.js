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

export class Tickets extends Component {

    static displayName = Tickets.name;

    constructor(props) {
        super(props);
        this.state = {
            toEdit: false,
            isAutentificated: false,
            data: [],
            idf: null,
            mid: null,
            email: null,
            id: null,
            loading: true,
            row: null,
            columns: null,
            username: null,
            canAccess: null,
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
        this.getAccess();
        this.getData('tickets');
    }

    async getAccess() {
        const token = await authService.getAccessToken();
        const [user] = await Promise.all([authService.getUser()]);
        let canAccess_;
        if (user !== null) {
            this.state.username = user.name;
            const response = await fetch(`api/tickets/canaccess?username=${user.name}`, {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            canAccess_ = await response.json();
            this.state.isAutentificated = true;
            this.state.canAccess = canAccess_;
            //для обновления состояния используем одну переменную
            this.setState((state) => { return { loading: false } });
        } else {
            canAccess_ = false;
            this.setState((state) => { return { canAccess: false, loading: false, isAutentificated: false } });
        }
        if (canAccess_) {
            this.state.columns = [
                { dataField: "id", text: "ID", sort: true, filter: textFilter() }, //add filter into BootstrapTable
                { dataField: "idf", text: "ID рейса", sort: true, filter: textFilter() },
                { dataField: "mid", text: "ID человека", sort: true, filter: textFilter() },
                { dataField: "email", text: "почта", sort: true, filter: textFilter() },
            ];
        } else {
            this.state.columns = [
                { dataField: "idf", text: "ID рейса", sort: true, filter: textFilter() }
            ];
        }
    }


    async getData(path) {
        const token = await authService.getAccessToken();
        const [user] = await Promise.all([authService.getUser()]);
        if (user !== null) {
            this.state.userName = user.name;
            localStorage.setItem("username", user.name);
            var response = await fetch(`api/${path}/get?username=${user.name}`, {
                method: 'GET',
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });

            if (response.status !== 204) {
                const dataTickets = await response.json();
                localStorage.setItem("DTS", JSON.stringify(dataTickets));
                this.state.data = dataTickets;
                this.state.isAutentificated = true;
                //для обновления состояния используем одну переменную
                this.setState((state) => { return { loading: false } });
            }
        }
        else {
            this.state.isAutentificated = false;
            this.setState((state) => { return { loading: false } });
        }
    }

    renderTickets() {
        if (this.state.isAutentificated && !this.state.toEdit) {
            const rowEvent = {
                onClick: async (e, row) => {
                    console.log(row);
                    if (this.state.canAccess) {
                        const row_ = row;
                        this.setState({ toEdit: true, row: row_ });
                        localStorage.setItem("DT", JSON.stringify(row));
                    } else {
                        var answer = window.confirm("Отменить билет?");
                        if (answer) {
                            const token = await authService.getAccessToken();
                            var response = await fetch(`api/tickets/delete`, {
                                method: 'DELETE',
                                headers: !token ? {} : { 'Authorization': `Bearer ${this.state.token}`, 'Content-Type': 'application/json' },
                                body: JSON.stringify({ ID: row.id, IDF: row.idf, MID: row.mid, email: row.email })
                            });
                            const data = await response.json();
                            alert(data ? "Успешно отменен билет!" : "Отмена билета не была совершина!");
                        }
                    }
                }
            };

            const create = () => {
                this.setState({ toEdit: true });
                localStorage.removeItem("DT");
            };

            return (
                <div>
                    <center><h1 id="tabelLabel" >Tickets data</h1></center>
                    {/* rendering table */}
                    <BootstrapTable bootstrap4 keyField='idf' columns={this.state.columns}
                        data={this.state.data} pagination={this.state.pagination} filter={(filterFactory())}
                        rowEvents={rowEvent} />
                    {
                        this.state.canAccess ?
                            < input type="submit" value="Добавить" onClick={create} ></input>
                            : null
                    }
                </div>
            );
        }
        if (this.state.toEdit) {
            return (<Navigate to="/tickets/edit" />);
        }
        return (<Navigate to="/notfound" />);
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderTickets();
        return (
            <div>
                {contents}
            </div>
        );
    }
}

export default Tickets;