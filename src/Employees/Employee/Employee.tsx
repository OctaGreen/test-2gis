import React from 'react';
import { Person } from '../Employees';
import './Employee.css';

export class Employee extends React.Component<{ employee: Person }> {
    constructor(props: { employee: Person }) {
        super(props);
    }
    render(): JSX.Element {
        return (
            <div className="employee">
                <img src={this.props.employee.image_ref} className="image" />
                <div className="fullname">
                    {this.props.employee.name} {this.props.employee.midname} {this.props.employee.surname}
                </div>
            </div>
        );
    }
}
