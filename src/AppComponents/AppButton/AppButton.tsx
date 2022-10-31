import React from 'react';
import './AppButton.css';

export class AppButton extends React.Component<{ content: JSX.Element; onClick: (event: any) => void }> {
    render(): JSX.Element {
        return (
            <button className="button" onClick={this.props.onClick}>
                {this.props.content}
            </button>
        );
    }
}
