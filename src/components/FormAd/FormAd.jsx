import { useDispatch, useSelector } from 'react-redux';
import { func } from 'prop-types';

import Field from '../Field/Field';
import FieldArea from '../FieldArea/FieldArea';
import { changeFieldAd } from '../../store/reducers/ads';
import './FormAd.scss';

function FormAd({ onSubmit }) {
  const dispatch = useDispatch();

  const {
    title,
    content,
    city,
    postal_code,
  } = useSelector((state) => state.ads);

  function handleChangeField(value, name) {
    dispatch(changeFieldAd({
      key: name,
      value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="formAd" onSubmit={handleSubmit}>
      <Field
        label="Titre*"
        name="title"
        placeholder="Titre de l'annonce"
        onChange={handleChangeField}
        form="ad"
        value={title}
      />

      <FieldArea
        label="Résumé de votre annonce*"
        name="content"
        placeholder="#Résumé de votre annonce
					#Animal concerné
					#Date.s souhaitée.s"
        onChange={handleChangeField}
        form="ad"
        value={content}
        limit="300"
      />

      <Field
        label="Code postal*"
        name="postal_code"
        placeholder="Code postal"
        onChange={handleChangeField}
        form="ad"
        value={postal_code}
      />

      <Field
        label="Ville*"
        name="city"
        placeholder="Ville"
        onChange={handleChangeField}
        form="ad"
        value={city}
      />

      <button type="submit" className="formAd__btn">Poster mon annonce</button>
    </form>
  );
}

export default FormAd;

FormAd.propTypes = {
  onSubmit: func.isRequired,
};
