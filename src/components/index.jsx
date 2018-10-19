import React, {Component} from 'react';
import Palette from './Palette';
import Message from './Palette/Message';

const colors = {
    red: 95, green: 40, blue: 66
};

export default class Root extends Component {
    constructor() {
        super();
        this.state = { copy: false }
    }

    handleCopy = e => {
        e.preventDefault();

        const range = document.createRange();
        range.selectNode(e.target);
        window.getSelection().addRange(range);

        document.execCommand('copy');
        window.getSelection().removeAllRanges();

        this.setState({ copy: true });
    }

    handleHide = () => {
        this.setState({ copy: false })
    }

    render() {
        return (
            <>
                <Palette 
                    onHide={this.handleHide} 
                    copy={this.state.copy} 
                    onCopy={this.handleCopy}
                    colors={colors} 
                />
                {!this.state.copy ? null :
                    <Message onHide={this.handleHide}>   
                        Text have copied
                    </Message>
                }
            </>
        )
    }
}