import React from 'react';
import {Nav} from 'react-bootstrap';

import { userService } from '../_services';

class MyNotePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            notes: [],
            keyword: '',
        };
    }

    componentDidMount() {
        this.setState({ 
            user: JSON.parse(localStorage.getItem('user'))
        });
        userService.getNotesByUser(JSON.parse(localStorage.getItem('user')).id).then(notes => this.setState({ notes }));
    }

    renderTableData() {
        return this.state.notes.map((note, index) => {
           return (
              <tr key={note.id}>
                 <td>{index}</td>
                 <td>{note.title}</td>
                 <td>{note.description}</td>
                 <td>{note.date}</td>
              </tr>
           )
        })
    }

    render() {
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
                        <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search Notes"/>
                        <button className="btn btn-success my-2 my-sm-0" type="button">Search</button>
                        </form>
                    </div>
                </Nav>
                <div className="container">
                    <h2>My Notes</h2>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Description</th>
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

export { MyNotePage };