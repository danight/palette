import React, {Component} from 'react';
import './index.css';

function getCoords(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.pageXOffset,
        bottom: rect.bottom + window.pageYOffset
    }

}
export default class Slider extends Component {
    componentDidMount() {
        this.thumb.ondragstart = () => false;
        this.thumb.style.bottom =
            (this.slider.clientHeight - this.thumb.clientHeight) / 100
            * this.props.value + 'px';
    }

    componentDidUpdate() {
        this.thumb.style.bottom = 
            (this.slider.clientHeight - this.thumb.clientHeight) / 100
                * this.props.value + 'px';
    }

    componentWillUnmount() {
        this.thumb.ondragstart = null;
    }

    moveTo(e) {
        let offset = getCoords(this.thumb.slider).bottom - e.pageY - this.thumb.shiftY,
            rightEdge = this.thumb.slider.clientHeight - this.thumb.clientHeight;

        if (offset < 0) offset = 0;
        if (offset > rightEdge) offset = rightEdge;
        
        const percent = offset * 100 / 
            (this.thumb.slider.clientHeight - this.thumb.clientHeight);
        
        this.thumb.style.bottom = offset + 'px';

        this.props.onChange(percent);
    }

    handleMouseMove(e) { this.moveTo(e) } 

    handleMouseUp() {
        this.thumb.classList.remove('slider__thumb_push');

        document.removeEventListener('mousemove', this.removeMouseMove);
        document.removeEventListener('mouseup', this.removeMouseUp);
    }

    handleMouseDown = e => {
        e.preventDefault();
        
        let shiftY, thumb;
        
        if (e.target.classList.contains('slider')) {
            thumb = e.target.querySelector('.slider__thumb');
            shiftY = thumb.clientHeight / 2;
        } else {
            thumb = e.target.closest('.slider__thumb');
            shiftY = getCoords(thumb).bottom - e.pageY;
        }
        
        this.thumb = thumb;
        this.thumb.shiftY = shiftY;
        this.thumb.slider = e.currentTarget;

        this.thumb.classList.add('slider__thumb_push');

        this.moveTo(e);
        
        this.removeMouseMove = this.handleMouseMove.bind(this);
        document.addEventListener('mousemove', this.removeMouseMove);
        
        this.removeMouseUp = this.handleMouseUp.bind(this);
        document.addEventListener('mouseup', this.removeMouseUp);
    }
    
    render() {
        return (
            <div 
                ref={el => this.slider = el}
                onMouseDown={this.handleMouseDown}
                className="slider color-picker__slider"
            >
                <div 
                    ref={el => this.thumb = el}
                    className="slider__thumb"
                >
                </div>
            </div>
        )
    }
}