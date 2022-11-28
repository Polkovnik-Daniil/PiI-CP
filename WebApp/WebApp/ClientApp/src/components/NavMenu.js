import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import authService from './api-authorization/AuthorizeService';
import Mans from './Mans';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            isAuthenticated: false,
            isAdministrator: false
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    async getUserRole() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);
        this.state.isAuthenticated = isAuthenticated;
        this.state.user = user;
        if (isAuthenticated) {
            const token = await authService.getAccessToken();
            const response = await fetch(`/api/userdata/get?username=${user.name}`, {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            this.setState({ isAdministrator: isAuthenticated });
        }
    }
    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }
    componentDidMount() {
        this._subscription = authService.subscribe(() => this.getUserRole());
        this.getUserRole();
    }
    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                    <NavbarBrand tag={Link} to="/">WebApp</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                            </NavItem>
                            {
                                this.state.isAdministrator ?
                                    < NavItem >
                                        <NavLink tag={Link} className="text-dark" to="/mans">Mans</NavLink>
                                    </NavItem> : null
                            }
                            <LoginMenu>
                            </LoginMenu>
                        </ul>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}
