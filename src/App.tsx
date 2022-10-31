import React from 'react';
import './App.css';
import { Employees } from './Employees/Employees';
import { Plan } from './Plan/Plan';

export class App extends React.Component {
    render(): JSX.Element {
        return (
            <div className="App">
                <Employees />
                <Plan />
            </div>
        );
    }
}
