import React, { Component, createRef } from 'react';
import { Navigate } from 'react-router-dom';
import './EditFlights.css';
import authService from '../api-authorization/AuthorizeService';

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
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

export class EditFlights extends Component {
    static displayName = EditFlights.name;

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            loading: true,
            canAccess: false,
            operation: -1,
            fid: null,
            ida: null,
            date_and_Time_of_Departure: null,
            date_and_Time_of_Arrival: null,
            departure_Point: null,
            departure_Airport : null,
            point_of_Arrival : null,
            arrival_Airport : null,
            status : null,
            number_Free_places : null, 
            buttonName: null
        };

        const data = JSON.parse(localStorage.getItem("row"));
        if (data !== null) {
            this.state.idm = data.idm;
            this.state.passport_number = data.passport_number;
            this.state.name = data.name;
            this.state.surname = data.surname;
            this.state.sex = data.sex;
            this.state.buttonName = "Сохранить";
            return;
        }
        this.state.buttonName = "Добавить";
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.getAccess());
        this.getAccess();
    }

    async getAccess() {
        const token = await authService.getAccessToken();
        const [user] = await Promise.all([authService.getUser()]);
        this.state.username = user.name;
        var response = await fetch(`api/flights/canaccess?username=${user.name}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const canAccess_ = await response.json();
        this.setState({ canAccess: canAccess_, loading: false });
    }

    renderEditMans() {
        if (this.state.canAccess && !this.state.loading) {
            //Operation for server
            const operation = {
                create: 0,
                delete: 1,
                update: 2
            }
            //On click button reset
            const Reset = () => {
                this.setState({});
                this.state.fid = "";
                this.state.ida = "";
                this.state.date_and_Time_of_Departure = "";
                this.state.date_and_Time_of_Arrival = "";
                this.state.departure_Point = "";
                this.state.departure_Airport = "";
                this.state.point_of_Arrival = "";
                this.state.arrival_Airport = "";
                this.state.status = "";
                this.state.number_Free_places = "";                
            };
            //when click 
            const toServer = async () => {
                const username = localStorage.getItem("username");
                var path = "";
                switch (this.state.operation) {
                    case operation.create:
                        path = `create?username=${username}&idm=${this.state.idm}&passport_number=${this.state.passport_number}&name=${this.state.name}&surname=${this.state.surname}&sex=${this.state.sex}`;
                        break;
                    case operation.delete:
                        path = `delete?username=${username}&idm=${this.state.idm}`;
                        break;
                    case operation.update:
                        path = `update?username=${username}&idm=${this.state.idm}&passport_number=${this.state.passport_number}&name=${this.state.name}&surname=${this.state.surname}&sex=${this.state.sex}`;
                        break;
                }
                const token = await authService.getAccessToken();
                var response = await fetch(`api/mans/${path}`, {
                    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                });
                var text;
                if (response.status === 200) {
                    text = "success!";
                }
                else {
                    text = "fail!";
                }
                alert(text);
            };

            const Delete = () => {
                this.state.operation = operation.delete;
                toServer();
            };

            const CreateOrUpdate = () => {
                this.state.buttonName === 'Добавить' ? this.state.operation = operation.create : this.state.operation = operation.update;
                toServer();
            };

            const fidOC = (event) => {     //onChange
                this.setState({});
                this.state.fid = event.target.value;
            };

            const idaOC = (event) => {     //onChange
                this.setState({});
                this.state.ida = event.target.value;
            };

            const date_and_Time_of_DepartureOC = (event) => {     //onChange
                this.setState({});
                this.state.date_and_Time_of_Departure = event.target.value;
            };

            const date_and_Time_of_ArrivalOC = (event) => {     //onChange
                this.setState({});
                this.state.date_and_Time_of_Arrival = event.target.value;
            };

            const departure_PointOC = (event) => {
                this.setState({});
                this.state.departure_Point = event.target.defaultValue;
            };

            const departure_AirportOC = (event) => {
                this.setState({});
                this.state.departure_Airport = event.target.defaultValue;
            };

            const point_of_ArrivalOC = (event) => {
                this.setState({});
                this.state.point_of_Arrival = event.target.defaultValue;
            };

            const arrival_AirportOC = (event) => {
                this.setState({});
                this.state.arrival_Airport = event.target.defaultValue;
            };

            const statusOC = (event) => {
                this.setState({});
                this.state.status = event.target.defaultValue;
            };

            const number_Free_placesOC = (event) => {
                this.setState({});
                this.state.number_Free_places = event.target.defaultValue;
            };



            const GUIDOC = () => {
                this.setState({ fid: GUID() });
            };

            return (
                <div id="main">
                    <div>

                        <p>
                            <b>ID рейса</b>
                            <br></br>
                            <input type="text" size="40" placeholder="ID рейса" onChange={fidOC} value={this.state.fid} readOnly />
                            <input type="submit" size="20" value="Генерировать" onClick={GUIDOC}/>
                        </p>

                        <p>
                            <b>ID самолета</b>
                            <br></br>
                            <input type="text" size="40" placeholder="ID самолета" onChange={idaOC} value={this.state.ida} />
                        </p>
                        <p>
                            <b>Время отбытия</b>
                            <br></br>
                            <input type="text" size="40" placeholder="Время отбытия" onChange={date_and_Time_of_DepartureOC} value={this.state.date_and_Time_of_Departure} />
                        </p>
                        <p>
                            <b>Время прибытия</b>
                            <br></br>
                            <input type="text" size="40" placeholder="Время прибытия" onChange={date_and_Time_of_ArrivalOC} value={this.state.date_and_Time_of_Arrival} />
                        </p>
                        <p>
                            <b>Точка отбытия</b>
                            <br></br>
                            <input type="text" size="40" placeholder="Точка отбытия" onChange={departure_PointOC} value={this.state.departure_Point} />
                        </p>
                        <p>
                            <b>Время отбытия</b>
                            <br></br>
                            <input type="text" size="40" placeholder="Время отбытия" onChange={departure_AirportOC} value={this.state.departure_Airport} />
                        </p>
                        <p>
                            <b>Точка прибытия</b>
                            <br></br>
                            <input type="text" size="40" placeholder="Точка прибытия" onChange={point_of_ArrivalOC} value={this.state.point_of_Arrival} />
                        </p>
                        <p>
                            <b>Аэропорт прибытия</b>
                            <br></br>
                            <input type="text" size="40" placeholder="Аэропорт прибытия" onChange={arrival_AirportOC} value={this.state.arrival_Airport} />
                        </p>
                        <p>
                            <b>Статус</b>
                            <br></br>
                            <input type="text" size="40" placeholder="status" onChange={statusOC} value={this.state.status} />
                        </p>
                        <p>
                            <b>Количество свободных мест</b>
                            <br></br>
                            <input type="text" size="40" placeholder="status" onChange={number_Free_placesOC} value={this.state.number_Free_places} />
                        </p>
                        <div id="butt">
                            <input type="submit" size="20" value={this.state.buttonName} onClick={CreateOrUpdate}></input>
                            <input type="submit" size="20" value="Сбросить" onClick={Reset}></input>
                            {
                                this.state.buttonName !== 'Добавить' ?
                                    <input type="submit" size="20" value="Удалить" onClick={Delete}></input>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            );
        }
        return (<Navigate to="/notfound" />);
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderEditMans();
        if (!this.state.loading) {
            localStorage.removeItem("row");
        }
        return (
            <div>
                {contents}
            </div>
        );
    }
}


export default EditFlights;