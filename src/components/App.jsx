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

// class App extends Component {
//   state = {
//     value: "",
//     page: 1,
//   }


  // onSearch = value => {
  //   this.setState({ value, page: 1 })
  // } 

//   render() {
//     const { value } = this.state;
  
//     return (<div>
//       <Searchbar onSubmit={this.onSearch}></Searchbar>
//       <ImageGallery query={value} page={this.state.page}>
       
//       </ImageGallery>
      
//     </div>)
//   }
// }

export { App };