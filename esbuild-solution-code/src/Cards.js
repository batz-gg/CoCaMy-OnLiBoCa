import React from 'react';
import './Cards.css';
import location from './location.svg';
import { images } from './images';

export const Cards = ({ filters }) => (
  <div className='cards'>
    {images
      .filter((image) => filters[image.tag].selected)
      .map((image, i) => (
        <div className='card-item' key={i}>
          <img className='card-img' src={image.src} alt={image.title} />
          <div>{image.title}</div>
          <div className='card-location'>
            <img src={location} className='location-icon' alt='location icon' />
            {image.location}
          </div>
        </div>
      ))}
  </div>
);
