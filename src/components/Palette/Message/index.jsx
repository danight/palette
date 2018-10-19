import React, {Component} from 'react';
import './index.css';

export default class Message extends Component {
    componentDidMount() {
        this.timerId = setTimeout(() => {
            this.props.onHide();
        }, 1e3);
    }

    handleClose = () => {
        clearTimeout(this.timerId);
        this.props.onHide();
    }

    render() {
        const {children} = this.props;
        return (
            <div className="palette__message message">
                <div
                    onClick={this.handleClose} 
                    className="message__close">
                </div>
                {children}
            </div>
        )
    }
}