import React from 'react';
import {Nav} from 'react-bootstrap';

import { userService } from '../_services';

class NotePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            notes: [],
            keyword: '',
            loading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        this.setState({ 
            user: JSON.parse(localStorage.getItem('user'))
        });
        userService.getNotes().then(notes => this.setState({ notes }));
    }

    handleSearch(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { keyword } = this.state;

        // stop here if form is invalid
        if (!keyword) {
            return;
        }

        this.setState({ loading: true });
        userService.search(keyword).then(notes => this.setState({ notes, loading: false }), error => this.setState({ error, loading: false }));
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    renderTableData() {
        return this.state.notes.map((note, index) => {
           return (
              <tr key={note.id}>
                 <td>{index}</td>
                 <td>{note.title}</td>
                 <td>{note.description}</td>
                 <td>{note.user.name}</td>
                 <td>{note.date}</td>
              </tr>
           )
        })
    }

    render() {
        const { keyword, loading } = this.state;
        return (
            <div>
                <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">Home</a>

                    <div className="collapse navbar-collapse" id="navb">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/notes">All Notes</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/mynotes">My Notes</a>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSearch}>
                            {loading &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                            }
                        <input className="form-control mr-sm-2" type="text" placeholder="Search Notes" name="keyword" value={keyword} onChange={this.handleChange}/>
                        <button className="btn btn-success my-2 my-sm-0" disabled={loading}>Search</button>
                        </form>
                    </div>
                </Nav>
                <div className="container">
                    <h2>All Notes</h2>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Author</th>
                                    <th>Date Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableData()}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        );
    }
}

export { NotePage };