import React from 'react';
import ReactDOM from 'react-dom';

import { Filters } from './Filters';
import { Cards } from './Cards';

import './app.css';
import summer from './summertime.svg';

const App = () => {
  const [allChecked, setAllChecked] = React.useState(true);
  const [filters, setFilters] = React.useState({
    woods: {
      name: 'Into the Woods',
      selected: true,
    },
    water: {
      name: 'By the Water',
      selected: true,
    },
    city: {
      name: 'In the City',
      selected: true,
    },
  });

  const toggleAllFilters = () => {
    setAllChecked((prevAll) => {
      setFilters((prevFilters) => {
        const nextFilters = Object.assign({}, prevFilters);
        for (const key of Object.keys(nextFilters)) {
          nextFilters[key].selected = !prevAll;
        }
        console.log(nextFilters);
        return nextFilters;
      });
      return !prevAll;
    });
  };

  const toggleFilter = (id) => {
    setFilters((prevFilters) => {
      const nextFilters = Object.assign({}, prevFilters);
      nextFilters[id].selected = !nextFilters[id].selected;
      setAllChecked(
        Object.values(nextFilters).every(({ selected }) => selected)
      );
      return nextFilters;
    });
  };

  return (
    <div>
      <div className='header'>
        <h1>Vacation Destinations</h1>
        <img
          src={summer}
          className='summer'
          alt='icon showing summer vacation on calendar'
        />
      </div>
      <Filters
        allChecked={allChecked}
        toggleAllFilters={toggleAllFilters}
        toggleFilter={toggleFilter}
        filters={filters}
      />
      <Cards filters={filters} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
