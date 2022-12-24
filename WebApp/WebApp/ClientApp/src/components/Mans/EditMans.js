import React, { Component, createRef } from 'react';
import { Navigate } from 'react-router-dom';
import './EditMans.css';
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

export class EditMans extends Component {
    static displayName = EditMans.name;

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            loading: true,
            canAccess: false,
            operation: -1,
            idm: null,
            passport_number: null,
            name: null,
            surname: null,
            sex: false,
            buttonName: null
        };

        const data = JSON.parse(localStorage.getItem("row"));
        if (data !== null && data !== []) {
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
        var response = await fetch(`api/mans/canaccess?username=${user.name}`, {
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
                this.state.idm = "";
                this.state.passport_number = "";
                this.state.name = "";
                this.state.surname = "";
                this.state.sex = null;
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

            const idmOC = (event) => {     //onChange
                this.setState({});
                this.state.idm = event.target.value;
            };

            const passport_numberOC = (event) => {     //onChange
                this.setState({});
                this.state.passport_number = event.target.value;
            };

            const nameOC = (event) => {     //onChange
                this.setState({});
                this.state.name = event.target.value;
            };

            const surnameOC = (event) => {     //onChange
                this.setState({});
                this.state.surname = event.target.value;
            };

            const sexOC = (event) => {
                this.setState({});
                this.state.sex = event.target.defaultValue === 'Man' ? true : false;
            };

            const GUIDOC = () => {
                this.setState({ idm: GUID() });
            };

            return (
                <div id="main">
                    <div>

                        <p>
                            <b>ID человека</b>
                            <br></br>
                            <input type="text" size="40" placeholder="ID человека" onChange={idmOC} value={this.state.idm === null ? "" : this.state.idm} readOnly />
                            <input type="submit" size="20" value="Генерировать" onClick={GUIDOC}/>
                        </p>

                        <p>
                            <b>Номер паспорта</b>
                            <br></br>
                            <input type="text" size="40" placeholder="Номер паспорта" onChange={passport_numberOC} value={this.state.passport_number === null ? "" : this.state.passport_number} />
                        </p>
                        <p>
                            <b>Имя</b>
                            <br></br>
                            <input type="text" size="40" placeholder="Имя" onChange={nameOC} value={this.state.name === null ? "" : this.state.name} />
                        </p>
                        <p>
                            <b>Фамилия</b>
                            <br></br>
                            <input type="text" size="40" placeholder="Фамилия" onChange={surnameOC} value={this.state.surname === null ? "" : this.state.surname} />
                        </p>
                        <p>
                            <b>Пол</b>
                            <br></br>
                            <input type="radio" name="sex" value="Man" checked={this.state.sex !== null ? (this.state.sex ? true : false) : null} onChange={sexOC} />Мужской<br />
                            <input type="radio" name="sex" value="Woman" checked={this.state.sex !== null ? (!this.state.sex ? true : false) : null} onChange={sexOC} />Женский<br />
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


export default EditMans;