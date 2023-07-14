import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from '../Modal/Modal.module.css';
import { Button } from 'components/Button';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }
// handleKeyDown = evt => {
//   if (evt.code === 'Escape') {
//     this.props.onClose();
//   }
// };
// handleBackdropClick = evt => {
//   if (evt.currentTarget === evt.target) {
//     this.props.onClose();
//   }
// };
//   render() {
// return createPortal(
//   <div className={css.overlay} onClick={this.handleBackdropClick}>
//     <div className={css.modal}>{this.props.children}</div>
//   </div>,
//   modalRoot
// );
//   }
// }
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
