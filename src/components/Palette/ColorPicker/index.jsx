import React from 'react';
import Slider from './Slider';
import './index.css';

export default function ColorPicker({colors, onChange}) {
    const sliders = Object.keys(colors).map(type => {
        return (
            <Slider 
                key={type}
                value={colors[type]}
                onChange={value => onChange(type, value)}
            />
        )
    });

    return (
        <div className="color-picker palette__color-picker">
            {sliders}
        </div>
    )
}