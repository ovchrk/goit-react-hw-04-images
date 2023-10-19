import React, { useState } from 'react';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';

const App = () => {
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);

  const onSearch = value => {
    setValue(value);
    setPage(1);
  } 
  return (
    <div>
      <Searchbar onSubmit={onSearch}></Searchbar>
      <ImageGallery query={value} initialPage={page}>
      </ImageGallery>
     </div>
  )
}


export { App };