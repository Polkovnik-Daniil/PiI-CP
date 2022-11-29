import React, { Component, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import authService from './api-authorization/AuthorizeService';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { Navigate } from 'react-router-dom';


export class Mans extends Component {
    static displayName = Mans.name;

    constructor(props) {
        super(props);
        this.state = {
            token: null,
            userName: "",
            data: [], loading: true, columns: [
                { dataField: "idm", text: "IDM", sort: true/*, filter: textFilter()*/ }, //add filter into BootstrapTable
                { dataField: "passport_number", text: "Passport Number", sort: true },
                { dataField: "name", text: "Name", sort: true },
                { dataField: "surname", text: "Surname", sort: true },
                { dataField: "sex", text: "Sex", sort: true }
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
    async getData(){
        const token = await authService.getAccessToken();

        const [user] = await Promise.all([authService.getUser()]);
        this.state.userName = user.name;

        // response = await fetch(`/api/userdata/isAdminAsync?username=${username}`, {
        //     headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        // });
        // const isAdministrator = await response.json();
        
        var response = await fetch(`api/mans/get?username=${user.name}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        
        if(response.status !== 204) {
            const dataMans = await response.json();
        }
    }
    async getUserRole(username) {
        const token = await authService.getAccessToken();
        const response = await fetch(`/api/userdata/isAdminAsync?username=${username}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        return data;
    }
    async renderMansTable(data, columns, pagination, username) {
        const [isAdministrator] = await Promise.all([this.getUserRole(username)]);
        if (isAdministrator) {
            return (
                <div>
                    <center><h1 id="tabelLabel" >Mans data</h1></center>
                    <BootstrapTable bootstrap4 keyField='idm' columns={columns} data={data} pagination={pagination} /*filter={filterFactory}*/ />
                </div>
            );
        }   
        return (<Navigate to="/notfound" />);
    }

    render() {
        let contents = this.state.loading  
            ? <p><em>Loading...</em></p>
            : Mans.renderMansTable(this.state.data, this.state.columns, this.state.pagination, this.state.userName);
        return (
            <div>
                {contents}
            </div>
        );
    }

    async getMans() {
        const token = await authService.getAccessToken();
        const [user] = await Promise.all([authService.getUser()]);
        this.state.userName = user.name;
        const response = await fetch(`api/mans/get?username=${user.name}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        return data;
    }
}

export default Mans;