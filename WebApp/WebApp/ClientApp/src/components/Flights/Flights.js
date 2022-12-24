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

/**
 * Generates a GUID string.
 * @returns {string} The generated GUID.
 * @example af8a8416-6e18-a307-bd9c-f2c947bbb3aa
 * @author Slavik Meltser.
 * @link http://slavik.meltser.info/?p=142
 */
function GUID() {
    function _p8(s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

export class Flights extends Component {

    static displayName = Flights.name;

    constructor(props) {
        super(props);
        this.state = {
            toEdit: false,
            isAutentificated: false,
            data: null, loading: true,
            row: null,
            columns: [],
            canAccess: null,
            redtoauth: false,  //redirect to authorisation
            username: null,
            token: null,
            listElem: [
                [
                    { dataField: "fid", text: "ID рейса", sort: true, filter: textFilter() }, //add filter into BootstrapTable
                    { dataField: "ida", text: "ID самолета", sort: true, filter: textFilter() },
                    { dataField: "date_and_Time_of_Departure", text: "Время отбытия", sort: true, filter: textFilter() },
                    { dataField: "date_and_Time_of_Arrival", text: "Время прибытия", sort: true, filter: textFilter() },
                    { dataField: "departure_Point", text: "Точка отбытия", sort: true, filter: textFilter() },
                    { dataField: "departure_Airport", text: "Аэропорт отбытия", sort: true, filter: textFilter() },
                    { dataField: "point_of_Arrival", text: "Точка прибытия", sort: true, filter: textFilter() },
                    { dataField: "arrival_Airport", text: "Аэропорт прибытия", sort: true, filter: textFilter() },
                    { dataField: "status", text: "Статус", sort: true, filter: textFilter() },
                    { dataField: "number_Free_places", text: "Количество свободных мест", sort: true, filter: textFilter() }
                ],
                [
                    { dataField: "fid", text: "ID рейса", sort: true, filter: textFilter() }, //add filter into BootstrapTable
                    { dataField: "date_and_Time_of_Departure", text: "Время отбытия", sort: true, filter: textFilter() },
                    { dataField: "date_and_Time_of_Arrival", text: "Время прибытия", sort: true, filter: textFilter() },
                    { dataField: "departure_Point", text: "Точка отбытия", sort: true, filter: textFilter() },
                    { dataField: "departure_Airport", text: "Аэропорт отбытия", sort: true, filter: textFilter() },
                    { dataField: "point_of_Arrival", text: "Точка прибытия", sort: true, filter: textFilter() },
                    { dataField: "arrival_Airport", text: "Аэропорт прибытия", sort: true, filter: textFilter() },
                    { dataField: "status", text: "Статус", sort: true, filter: textFilter() },
                    { dataField: "number_Free_places", text: "Количество свободных мест", sort: true, filter: textFilter() }
                ]
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
        this.getAccess();
    }

    async getData() {
        
       
        //
        var response = await fetch(`api/flights/get`, {
            headers: { 'Content-Type': 'application/json' }
        });
        var dataM; 
        if (response.status !== 204) {
            dataM= await response.json();
            //set real id man in table, not number
            localStorage.setItem("DFS", JSON.stringify(dataM));
            //this.setState({ loading: false, data: dataMans });
            this.state.data = dataM;
             //remove!!
        }
        this.setState((state) => { return { loading: false, data: dataM } });
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
            this.state.isAutentificated = true;
            this.state.canAccess = canAccess_;
            //
            this.state.token=token;
            this.setState((state) => { return { loading: false } });
        } else {
            canAccess_ = false;
            this.setState((state) => { return { canAccess: false, loading: false } });
        }
        //if (canAccess_) {
        //    this.state.columns = [
        //        { dataField: "fid", text: "ID рейса", sort: true, filter: textFilter() }, //add filter into BootstrapTable
        //        { dataField: "ida", text: "ID самолета", sort: true, filter: textFilter() },
        //        { dataField: "date_and_Time_of_Departure", text: "Время отбытия", sort: true, filter: textFilter() },
        //        { dataField: "date_and_Time_of_Arrival", text: "Время прибытия", sort: true, filter: textFilter() },
        //        { dataField: "departure_Point", text: "Точка отбытия", sort: true, filter: textFilter() },
        //        { dataField: "departure_Airport", text: "Аэропорт отбытия", sort: true, filter: textFilter() },
        //        { dataField: "point_of_Arrival", text: "Точка прибытия", sort: true, filter: textFilter() },
        //        { dataField: "arrival_Airport", text: "Аэропорт прибытия", sort: true, filter: textFilter() },
        //        { dataField: "status", text: "Статус", sort: true, filter: textFilter() },
        //        { dataField: "number_Free_places", text: "Количество свободных мест", sort: true, filter: textFilter() }
        //    ];//this.state.listElem[0];
        //} else {
        //    this.state.columns = [
        //        { dataField: "fid", text: "ID рейса", sort: true, filter: textFilter() }, //add filter into BootstrapTable
        //        { dataField: "date_and_Time_of_Departure", text: "Время отбытия", sort: true, filter: textFilter() },
        //        { dataField: "date_and_Time_of_Arrival", text: "Время прибытия", sort: true, filter: textFilter() },
        //        { dataField: "departure_Point", text: "Точка отбытия", sort: true, filter: textFilter() },
        //        { dataField: "departure_Airport", text: "Аэропорт отбытия", sort: true, filter: textFilter() },
        //        { dataField: "point_of_Arrival", text: "Точка прибытия", sort: true, filter: textFilter() },
        //        { dataField: "arrival_Airport", text: "Аэропорт прибытия", sort: true, filter: textFilter() },
        //        { dataField: "status", text: "Статус", sort: true, filter: textFilter() },
        //        { dataField: "number_Free_places", text: "Количество свободных мест", sort: true, filter: textFilter() }
        //    ];//this.state.listElem[1];
        //}
    }

    renderMans() {
        const rowEvent = {
            onClick: async (e, row) => {
                console.log(row);
                if (this.state.canAccess) {
                    this.state.toEdit = true;
                    localStorage.setItem("DFSR", JSON.stringify(row));
                    this.setState({});
                } else {
                    var answer = window.confirm("Приобрести билет?");
                    if (answer) {
                        if (!this.state.isAutentificated) {
                            this.state.redtoauth = true;
                            this.setState({});
                            return;
                        }
                        if (this.state.isAutentificated && !this.state.canAccess) {
                            var response = await fetch(`api/tickets/create?username=${this.state.username}&id=${GUID()}&idf=${row.fid}&mid=null`, {
                                headers: !this.state.token ? {} : { 'Authorization': `Bearer ${this.state.token}` }
                            });
                            const data = await response.json();
                            alert(data ? "Успешно приопритен билет!" : "Покупка не была совершена, обновите страницу!");
                        }
                        this.getData();
                    }
                }
            }
        };

        const create = () => {
            this.setState({ toEdit: true });
            var isExist = localStorage.getItem("DFSR");
            if (isExist) {
                localStorage.removeItem("DFSR");
            }
        };

        if (this.state.redtoauth) {
            return (<Navigate to="/authentication/login" />);
        }

        if (this.state.toEdit) {
            return (<Navigate to="/flights/edit" />);
        }
        return (
            <div>
                <center><h1 id="tabelLabel" >Flights data</h1></center>
                <BootstrapTable bootstrap4 keyField='fid' columns={this.state.canAccess ? this.state.listElem[0] : this.state.listElem[1]}
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