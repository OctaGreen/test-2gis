import React from 'react';
import './AppSearch.css';

export class AppSearch extends React.Component<{ onChange: (event: any) => void }> {
    render(): JSX.Element {
        return (
            <input
                type="text"
                name="search"
                placeholder="Search.."
                className="input"
                onChange={(e) => this.props.onChange(e.target.value)}
            ></input>
        );
    }
}
