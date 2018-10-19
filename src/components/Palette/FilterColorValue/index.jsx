import React from 'react';
import {rgbToHex, rgbToHsl} from './converters/index.js';
import './index.css';


export default function FilterColorValue({colors, colorUnit, onChangeColor, onCopy}) {
    const [red, green, blue] = colors;

    let colorValue = '';
    switch (colorUnit) {
        case 'hex':
            colorValue = rgbToHex(colors);
            break;
        case 'hsl':
            colorValue = rgbToHsl(colors);
            break;
        default:
            colorValue = `rgb(${red}, ${green}, ${blue})`;
    }

    return (
        <div className="filter-color-value palette__filter-color-value">
            <div className="filters filter-color-value__filters filter-color-value__item">
                <button 
                    onClick={() => onChangeColor('rgb')}
                    disabled={colorUnit === 'rgb'} 
                    className="filters__rgb filters__btn">
                    rgb
                </button>
                <button 
                    onClick={() => onChangeColor('hex')}
                    disabled={colorUnit === 'hex'} 
                    className="filters__hex filters__btn">
                    hex
                </button>
                <button
                    onClick={() => onChangeColor('hsl')}
                    disabled={colorUnit === 'hsl'}
                    className="filters__hsl filters__btn"
                >
                    hsl
                </button>
            </div>
            <div className="colors-unit filter-color-value__colors-unit filter-color-value__item">
                <div 
                    onMouseDown={onCopy}
                    className="colors-unit__values">
                    {colorValue}
                </div>
                <div className="colors-unit__previews">
                    <div 
                        style={{backgroundColor: `rgb(${red}, 0, 0)`}}
                        className="colors-unit__preview">
                    </div>
                    <div
                        style={{ backgroundColor: `rgb(0, ${green}, 0)` }}
                        className="colors-unit__preview">
                    </div>
                    <div
                        style={{ backgroundColor: `rgb(0, 0, ${blue})` }}
                        className="colors-unit__preview">
                    </div>
                </div>
            </div>
        </div>
    )
}