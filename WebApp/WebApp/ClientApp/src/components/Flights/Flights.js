import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import authService from '../api-authorization/AuthorizeService';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Navigate } from 'react-router-dom';


//const[showModal, setShowModal] = useState([]);
//первый параметр в квадратных скобках говорит о том,
//что это переменная будет передаваться в название метода
//указанного вторым в квадратых скобках, значение которое
//будет хранить переменная указано в useState([]), 
//т.е. она хранит пустой массив 

export class Flights extends Component {

    static displayName = Flights.name;

    constructor(props) {
        super(props);
        this.state = {
            toEdit: false,
            isAutentificated: false,
            data: [], loading: true,
            row: null,
            columns: null,
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
        this.getData();
    }

    async getData() {
        var response = await fetch(`api/flights/get`, {
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.status !== 204) {
            const dataMans = await response.json();
            //set real id man in table, not number
            localStorage.setItem("DFS", JSON.stringify(dataMans));
            this.setState({ loading: false, data: dataMans });
            this.state.data = dataMans;
            this.state.loading = false;
            this.setState({});
            //remove!!
            return;
        }
        this.setState({ loading: false });
    }

    async getAccess() {
        const token = await authService.getAccessToken();
        const [user] = await Promise.all([authService.getUser()]);
        let canAccess_;
        if (user !== null) {
            this.state.username = user.name;
            var response = await fetch(`api/flights/canaccess?username=${user.name}`, {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            canAccess_ = await response.json();
            this.state.canAccess = canAccess_;
            this.state.loading = false;
            this.setState({ canAccess: canAccess_, loading: false });
        } else {
            this.setState({ canAccess: false, loading: false });
            canAccess_ = false;
        }
        if (canAccess_) {
            this.state.columns = [
                { dataField: "fid", text: "ID рейса", sort: true, filter: textFilter() }, //add filter into BootstrapTable
                { dataField: "ida", text: "ID самолета", sort: true, filter: textFilter() },
                { dataField: "date_and_Time_of_Departure", text: "Время отбытия", sort: true, filter: textFilter() },
                { dataField: "date_and_Time_of_Arrival", text: "Время прибытия", sort: true, filter: textFilter() },
                { dataField: "departure_Point", text: "Точка отбытия", sort: true, filter: textFilter() },
                { dataField: "departure_Airport", text: "Время отбытия", sort: true, filter: textFilter() },
                { dataField: "point_of_Arrival", text: "Точка прибытия", sort: true, filter: textFilter() },
                { dataField: "arrival_Airport", text: "Аэропорт прибытия", sort: true, filter: textFilter() },
                { dataField: "status", text: "Статус", sort: true, filter: textFilter() },
                { dataField: "number_Free_places", text: "Количество свободных мест", sort: true, filter: textFilter() }
            ];
        } else {
            this.state.columns = [
                { dataField: "fid", text: "ID рейса", sort: true, filter: textFilter() }, //add filter into BootstrapTable
                { dataField: "date_and_Time_of_Departure", text: "Время отбытия", sort: true, filter: textFilter() },
                { dataField: "date_and_Time_of_Arrival", text: "Время прибытия", sort: true, filter: textFilter() },
                { dataField: "departure_Point", text: "Точка отбытия", sort: true, filter: textFilter() },
                { dataField: "departure_Airport", text: "Время отбытия", sort: true, filter: textFilter() },
                { dataField: "point_of_Arrival", text: "Точка прибытия", sort: true, filter: textFilter() },
                { dataField: "arrival_Airport", text: "Аэропорт прибытия", sort: true, filter: textFilter() },
                { dataField: "status", text: "Статус", sort: true, filter: textFilter() },
                { dataField: "number_Free_places", text: "Количество свободных мест", sort: true, filter: textFilter() }
            ];
        }
        this.setState();
    }


    renderMans() {
        const rowEvent = {
            onClick: (e, row) => {
                console.log(row);
                const row_ = row;
            }
        };

        const create = () => {
            this.setState({ toEdit: true });
        };


        if (this.state.toEdit) {
            return (<Navigate to="/flights/edit" />);
        }
        return (
            <div>
                <center><h1 id="tabelLabel" >Flights data</h1></center>
                <BootstrapTable bootstrap4 keyField='fid' columns={this.state.columns}
                    data={this.state.data} pagination={this.state.pagination} filter={(filterFactory())}
                    rowEvents={rowEvent} />
                {
                    this.state.canAccess ?
                        <input type="submit" value="Добавить" onClick={create} ></input>
                        : null
                }
            </div>
        );
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


export default Flights;