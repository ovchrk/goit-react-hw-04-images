import PropTypes from 'prop-types';

import css from '../ImageGallery/ImageGallery.module.css';

const ImageGallery = ({ children }) => {
  return (
    <div>
      <ul className={css.gallery}> {children}</ul>
    </div>
  );
};

ImageGallery.propTypes = {
  children: PropTypes.array,
};
export { ImageGallery };
