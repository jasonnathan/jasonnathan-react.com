/*global window*/
import React, {Component, PropTypes} from 'react';

export default class FadeInImage extends Component {
  constructor(props) {
    super(props);
    // set defaults if not provided
    const {size=40, style={}} = props;
    this.state = {
      // it seems counter-intuitive to unset default styles
      // but it works better for my use case
      style: {
        opacity: 0,
        transition: 'opacity 1s ease-in',
        fontSize: size / 2,
        height: size,
        width: size,
        ...style
      }
    }
  }

  componentDidMount(){
    let imgElement = new window.Image();

    imgElement.onload = () => this.onImageLoad();
    imgElement.src = this.props.src;
  }

  onImageLoad() {
    return this.setState({
      style: { ...this.state.style, opacity: 1}
    })
  }

  render(){
    return (
      <img
        className="centered-content"
        role="presentation"
        key={this.props.src}
        style={this.state.style}
        src={this.props.src}
      />
    )
  }
}

FadeInImage.propTypes = {
  size: PropTypes.number,
  src: PropTypes.string,
  style: PropTypes.object
}