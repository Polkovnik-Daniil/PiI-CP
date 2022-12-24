import React, { Component, createRef } from 'react';
import { Navigate } from 'react-router-dom';
import './EditAirplanes.css';
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
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}

export class EditAirplanes extends Component {
    static displayName = EditAirplanes.name;

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            loading: true,
            canAccess: false,
            operation: -1,
            ida: null,
            name_airplane: null,
            number_places: null,
            creator: null,
            buttonName: null
        };

        const data = JSON.parse(localStorage.getItem("REA"));
        if (data !== null && data !== []) {
            this.state.ida = data.ida;
            this.state.name_airplane = data.name_Airplanes;
            this.state.number_places = data.number_places;
            this.state.surname = data.surname;
            this.state.creator = data.creator;
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
        var response = await fetch(`api/airplanes/canaccess?username=${user.name}`, {
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
                this.state.ida = "";
                this.state.name_airplane = "";
                this.state.number_places = "";
                this.state.creator = "";
                this.setState({});
            };
            //when click 
            const toServer = async () => {
                const username = localStorage.getItem("username");
                var path = "";
                switch (this.state.operation) {
                    case operation.create:
                        path = `create?username=${username}&ida=${this.state.ida}&name_airplane=${this.state.name_airplane}&number_places=${this.state.number_places}&creator=${this.state.creator}`;
                        break;
                    case operation.delete:
                        path = `delete?username=${username}&ida=${this.state.ida}`;
                        break;
                    case operation.update:
                        path = `update?username=${username}&ida=${this.state.ida}&name_airplane=${this.state.name_airplane}&number_places=${this.state.number_places}&creator=${this.state.creator}`;
                        break;
                }
                const token = await authService.getAccessToken();
                var response = await fetch(`api/airplanes/${path}`, {
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

            const idaOC = (event) => {     //onChange
                this.setState({ ida: event.target.value });
            };

            const name_aiplaneOC = (event) => {     //onChange
                this.setState({});
                this.state.name_airplane = event.target.value;
            };

            const number_placesOC = (event) => {     //onChange
                var as = event.target.value !== '';
                if (event.target.value.length < 4 && event.target.value!='') {
                    this.setState({ number_places: event.target.value });
                }
            };

            const creatorOC = (event) => {     //onChange
                this.setState({ creator: event.target.value });
            };

            const GUIDOC = () => {          
                this.setState({ ida: GUID() });
            };

            return (
                <div id="main">
                    <div>
                        <p>
                            <b>ID самолета</b>
                            <br></br>
                            <input type="text" size="40" placeholder="ID самолета" onChange={idaOC} value={this.state.ida} readOnly />
                            <input type="submit" size="20" value="Генерировать" onClick={GUIDOC} />
                        </p>
                        <p>
                            <b>Название самолета</b>
                            <br></br>
                            <input type="text" size="40" placeholder="Название самолета" onChange={name_aiplaneOC} value={this.state.name_airplane} />
                        </p>
                        <p>
                            <b>Количество мест</b>
                            <br></br>
                            <input type="number" min="1" max="600" maxlength="5" id="dva" size="60" placeholder="Количество мест" onChange={number_placesOC} value={this.state.number_places} />
                        </p>
                        <p>
                            <b>Производитель</b>
                            <br></br>
                            <input type="text" size="40" placeholder="Производитель" onChange={creatorOC} value={this.state.creator} />
                        </p>
                        <div id="butt">
                            <input type="submit" value={this.state.buttonName} onClick={CreateOrUpdate}></input>
                            <input type="submit" value="Сбросить" onClick={Reset}></input>
                            {
                                this.state.buttonName !== 'Добавить' ?
                                    <input type="submit" value="Удалить" onClick={Delete}></input>
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
            localStorage.removeItem("REA");
        }
        return (
            <div>
                {contents}
            </div>
        );
    }
}


export default EditAirplanes;