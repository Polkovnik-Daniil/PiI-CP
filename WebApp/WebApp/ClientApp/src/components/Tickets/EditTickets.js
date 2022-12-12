import React, { Component, createRef } from 'react';
import { Navigate } from 'react-router-dom';
import './EditTickets.css';
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

export class EditTickets extends Component {
    static displayName = EditTickets.name;

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            loading: true,
            canAccess: false,
            operation: -1,
            idf: null,
            mid: null,
            email: null,
            id: null,
            buttonName: null
        };

        const data = JSON.parse(localStorage.getItem("DT"));
        if (data !== null) {
            this.state.id = data.id;
            this.state.idf = data.idf;
            this.state.mid = data.mid;
            this.state.email = data.email;
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
                this.state.id = "";
                this.state.idf = "";
                this.state.mid = "";
                this.state.email = "";
                this.setState({});
            };
            //when click 
            const toServer = async () => {
                const username = localStorage.getItem("username");
                var path = "";
                switch (this.state.operation) {
                    case operation.create:
                        path = `create?username=${username}&id=${this.state.id}&idf=${this.state.idf}&mid=${this.state.mid}&email=${this.state.email}`;
                        break;
                    case operation.delete:
                        path = `delete?username=${username}&id=${this.state.id}`;
                        break;
                    case operation.update:
                        path = `update?username=${username}&id=${this.state.id}&idf=${this.state.idf}&mid=${this.state.mid}&email=${this.state.email}`;
                        break;
                    //case operation.createv2:
                    //    path = 'createv2';
                    //    break;
                }
                const token = await authService.getAccessToken();
                //везде где есть // надо удалить если не планируешь перейти на эту технологию
                var method = this.state.operation === operation.create ? 'POST' : this.state.operation === operation.delete ? 'DELETE' : 'PUT';
                var response = await fetch(`api/tickets/${path}`, {
                    //method: method, //
                    headers: !token ? {} : {
                        'Authorization': `Bearer ${token}`//,
                        //'Content-Type': 'application/json',//
                    },
                    //body: JSON.stringify({ ID: this.state.id, IDF: this.state.idf, MID: this.state.mid, email: this.state.email })//
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

            const idOC = (event) => {     //onChange
                this.setState({ id: event.target.value });
            };

            const idfOC = (event) => {     //onChange
                this.setState({});
                this.state.idf = event.target.value;
            };

            const midOC = (event) => {     //onChange
                var as = event.target.value !== '';
                if (event.target.value.length < 4 && event.target.value!='') {
                    this.setState({ mid: event.target.value });
                }
            };

            const emailOC = (event) => {     //onChange
                this.setState({ email: event.target.value });
            };

            const GUIDOC = () => {          
                this.setState({ id: GUID() });
            };

            return (
                <div id="main">
                    <div>
                        <p>
                            <b>ID билета</b>
                            <br></br>
                            <input type="text" size="40" placeholder="ID билета" onChange={idOC} value={this.state.id} readOnly />
                            <input type="submit" size="20" value="Генерировать" onClick={GUIDOC} />
                        </p>
                        <p>
                            <b>ID рейса</b>
                            <br></br>
                            <input type="text" size="40" placeholder="ID рейса" onChange={idfOC} value={this.state.idf} />
                        </p>
                        <p>
                            <b>ID человека</b>
                            <br></br>
                            <input type="text" size="40" placeholder="ID человека" onChange={midOC} value={this.state.mid} />
                        </p>
                        <p>
                            <b>Почта</b>
                            <br></br>
                            <input type="text" size="40" placeholder="Почта" onChange={emailOC} value={this.state.email} />
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
        return (
            <div>
                {contents}
            </div>
        );
    }
}


export default EditTickets;