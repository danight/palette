import React, {Component} from 'react';
import ColorPicker from './ColorPicker';
import FilterColorValue from './FilterColorValue';
import DisplayColor from './DisplayColor';
import './index.css';

export default class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: props.colors,
            colorUnit: 'rgb'
        }
    }

    calculateColor(value) {
        return Math.round(255 / 100 * value);
    }

    handleRandomColor = () => {
        let updColors = Object.assign({}, this.state.colors);

        for (let type in updColors) {
            updColors[type] = Math.floor(Math.random() * 100);
        }
        
        this.setState({ colors: updColors });
    }

    handleChangeColorUnit = (type) => {
        this.setState({
            colorUnit: type
        })
    }

    handleChangeColor = (type, value) => {
        this.setState({
            colors: Object.assign({}, this.state.colors, {
                [type]: value
            })
        });
    }

    render() {
        const {colors, colorUnit, copy} = this.state,
            {red, green, blue} = colors;

        const computedColors = [
            this.calculateColor(red),
            this.calculateColor(green),
            this.calculateColor(blue)
        ];

        return (
            <div className="palette root__palette">
                <div className="palette__item">
                    <ColorPicker 
                        colors={colors} 
                        onChange={(type, value) => this.handleChangeColor(type, value)}
                    />
                    <button 
                        onClick={this.handleRandomColor}
                        className="random-color palette__random-color"
                    >
                        random
                    </button>
                </div>
                <div className="palette__item">
                    <FilterColorValue 
                        onChangeColor={this.handleChangeColorUnit}
                        onCopy={this.props.onCopy}
                        colorUnit={colorUnit}                        
                        colors={computedColors}
                    />
                    <DisplayColor 
                        colors={computedColors}
                    />
                </div> 
            </div>
        )
    }
}