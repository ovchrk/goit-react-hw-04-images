import React, { useState } from 'react';
import css from '../Searchbar/Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = e => {
    const { value } = e.currentTarget;
    setValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value.trim());
    setValue('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchform} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchform__button}>
          <span className={css.searchform__label}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          name="value"
          value={value}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
// class Searchbar extends Component {
//   state = {
//     value: '',
//   };
// handleChange = e => {
//   const { name, value } = e.currentTarget;
//   this.setState({ [name]: value });
// };
// handleSubmit = e => {
//   e.preventDefault();
//   this.props.onSubmit(this.state.value.trim());
//   this.setState({ value: '' });
// };

//   render() {
//     const { value } = this.state;
// return (
//   <header className={css.searchbar}>
//     <form className={css.searchform} onSubmit={this.handleSubmit}>
//       <button type="submit" className={css.searchform__button}>
//         <span className={css.searchform__label}>Search</span>
//       </button>

//       <input
//         className={css.input}
//         type="text"
//         name="value"
//         value={value}
//         onChange={this.handleChange}
//         autoComplete="off"
//         autoFocus
//         placeholder="Search images and photos"
//       />
//     </form>
//   </header>
// );
//   }
// }
export { Searchbar };
