import React from 'react';
import './index.css';

export default function DisplayColor({colors: [red, green, blue]}) {
    const color = `rgb(
        ${red}, ${green}, ${blue}
    )`;

    return (
        <div 
            style={{backgroundColor: color}}
            className="display-color palette__display-color"
        >
        </div>
    )
}