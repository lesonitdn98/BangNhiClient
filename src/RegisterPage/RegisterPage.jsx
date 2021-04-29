import React from 'react';

import { userService } from '../_services';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        userService.logout();

        this.state = {
            email: '',
            name: '',
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { name, email, username, password } = this.state;

        // stop here if form is invalid
        if (!(username && password && name && email)) {
            return;
        }

        this.setState({ loading: true });
        userService.register(username, password, email, name)
            .then(
                data => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
    }

    render() {
        const { name, email, username, password, submitted, loading, error } = this.state;
        return (
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4 col-md-offset-3 jumbotron">
                    <h2>Register</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                            {submitted && !username &&
                                <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                            {submitted && !password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="fullname">FullName</label>
                            <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange} />
                            {submitted && !name &&
                                <div className="help-block">FullName is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" name="email" value={email} onChange={this.handleChange} />
                            {submitted && !email &&
                                <div className="help-block">Email is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" disabled={loading}>Register</button>
                            {loading &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
                            }
                        </div>
                        {error &&
                            <div className={'alert alert-danger'}>{error.name}</div>
                        }
                        <a href="/login">Login</a>
                    </form>
                </div>
                <div className="col-md-4"></div>
            </div>
        );
    }
}

export { RegisterPage };