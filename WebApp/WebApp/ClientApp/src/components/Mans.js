import React, { Component, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import authService from './api-authorization/AuthorizeService';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

export class Mans extends Component {
    static displayName = Mans.name;

    constructor(props) {
        super(props);
        this.state = {
            data: [], loading: true, columns: [
                { dataField: "idm", text: "IDM", sort: true/*, filter: textFilter()*/ }, //add filter into BootstrapTable
                { dataField: "passport_number", text: "Passport Number", sort: true },
                { dataField: "name", text: "Name", sort: true },
                { dataField: "surname", text: "Surname", sort: true },
                { dataField: "sex", text: "Sex", sort: true }
            ]
            //add pagination into BootstrapTable
            //,
            //pagination: paginationFactory({
            //    page: 1,
            //    sizePerPage: 5,
            //    lastPageText: ">>",
            //    firstPageText: "<<",
            //    nextPageText: ">",
            //    prePageText: "<",
            //    showTotal: true,
            //    alwaysShowAllBtns: true,
            //    onPageChange: function (page, sizePerPage) {
            //        console.log("page", page);
            //        console.log("sizePerPage", sizePerPage);
            //    },
            //    onSizePerPageChange: function (page, sizePerPage) {
            //        console.log("page", page);
            //        console.log("sizePerPage", sizePerPage);
            //    }
            //})
        };
    }
    componentDidMount() {
        this.populateMans();
    }
    
    static renderMansTable(data, columns/*, pagination*/) {
        return (
            <BootstrapTable bootstrap4 keyField='idm' columns={columns} data={data} /*pagination={pagination} filter={filterFactory}*/ />
        //if you don`t will use include library you should back to standart
        //    <center>
        //        <table className='table table-striped' aria-labelledby="tabelLabel" id="myTable">
        //            <thead>
        //                <tr>
        //                    <th>IDM</th>
        //                    <th>Passport Number</th>
        //                    <th>Name</th>
        //                    <th>Surname</th>
        //                    <th>Sex</th>
        //                </tr>
        //            </thead>
        //            <tbody>
        //                {data.map(info => <tr key={info.idm}>
        //                    <td>{info.idm}</td>
        //                    <td>{info.passport_number}</td>
        //                    <td>{info.name}</td>
        //                    <td>{info.surname}</td>
        //                    <td>{info.sex === true ? 'Man' : 'Woman'}</td>
        //                </tr>
        //                )}
        //            </tbody>
        //        </table>
        //    </center>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Mans.renderMansTable(this.state.data, this.state.columns/*, this.state.pagination*/); // add pagination into BootstrapTable
        return (
            <div>
                <center><h1 id="tabelLabel" >Mans data</h1></center>
                {contents}
            </div>
        );
    }

    async populateMans() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/mans/get', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ data: data, loading: false });
    }
}

export default Mans;