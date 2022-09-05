import React from 'react';
import './filters.css';

export const Filters = ({
  allChecked,
  toggleAllFilters,
  toggleFilter,
  filters,
}) => (
  <ul className='filters'>
    <li className='filter-item'>
      <input
        name='all'
        id='all'
        type='checkbox'
        checked={allChecked}
        readOnly
      />
      <label htmlFor='all' onClick={toggleAllFilters}>
        All
      </label>
    </li>
    {Object.entries(filters).map(([id, { name, selected }]) => (
      <li className='filter-item' key={id} data-index={id}>
        <input id={name} type='checkbox' checked={selected} readOnly />
        <label id={id} htmlFor={name} onClick={() => toggleFilter(id)}>
          {name}
        </label>
      </li>
    ))}
  </ul>
);
