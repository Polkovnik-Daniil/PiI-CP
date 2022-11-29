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


export class Mans extends Component {
    static displayName = Mans.name;

    constructor(props) {
        super(props);
        this.state = {
            successful: false,
            data: [], loading: true, columns: [
                { dataField: "idm", text: "IDM", sort: true, filter: textFilter() }, //add filter into BootstrapTable
                { dataField: "passport_number", text: "Passport Number", sort: true, filter: textFilter()},
                { dataField: "name", text: "Name", sort: true, filter: textFilter() },
                { dataField: "surname", text: "Surname", sort: true, filter: textFilter() },
                { dataField: "sex", text: "Sex", sort: true, filter: selectFilter({ options: {
                    2: 'true',
                    1: 'false'
                } }) },
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
       
        var response = await fetch(`api/mans/get?username=${user.name}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });

        if(response.status !== 204) {
            const dataMans = await response.json();
            this.setState({loading: false, data: dataMans, successful: true});
            return;
        }
        this.setState({loading: false, successful: false });
    }

    renderMansTable() {
        if (this.state.successful) {
            return (
                <div>
                    <center><h1 id="tabelLabel" >Mans data</h1></center>
                    <BootstrapTable bootstrap4 keyField='idm' columns={this.state.columns} data={this.state.data} pagination={this.state.pagination} filter={(filterFactory())} />
                </div>
            );
        }   
        return (<Navigate to="/notfound" />);
    }
    
    render() {
        let contents = this.state.loading  
        ? <p><em>Loading...</em></p>
            : this.renderMansTable();
        return (
            <div>
                {contents}
            </div>
        );
    }

    // async getUserRole(username) {
    //     const token = await authService.getAccessToken();
    //     const response = await fetch(`/api/userdata/isAdminAsync?username=${username}`, {
    //         headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    //     });
    //     const data = await response.json();
    //     return data;
    // }

    // async getMans() {
    //     const token = await authService.getAccessToken();
    //     const [user] = await Promise.all([authService.getUser()]);
    //     this.state.userName = user.name;
    //     const response = await fetch(`api/mans/get?username=${user.name}`, {
    //         headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    //     });
    //     const data = await response.json();
    //     return data;
    // }
}

export default Mans;