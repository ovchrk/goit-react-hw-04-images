import css from '../Button/Button.module.css';

export const Button = ({ onLoadMore }) => {
  return (
    <div className={css.section}>
      <button type="button" onClick={onLoadMore} className={css.button}>
        Load more
      </button>
    </div>
  );
};
