import { Link, useParams } from 'react-router-dom';
import { MdPlace, MdChildFriendly } from 'react-icons/md';
import { RiMailFill } from 'react-icons/ri';
import { FaPaw } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import PetsittingDetails from './PetsittingDetails/PetsittingDetails';
import PetCard from './PetCard/PetCard';
import './PublicProfile.scss';
import { fetchPublicUserInfos } from '../../api/user';

function PublicProfile() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPublicUserInfos(id));
  }, []);

  const publicUser = useSelector((state) => state.user.publicUser);
  console.log('publicUser >> ', publicUser);

  const publicUserRole = publicUser.roles;
  let petsitter = false;
  let petowner = false;
  if (publicUserRole) {
    petsitter = !!publicUserRole.filter((role) => role.name === 'petsitter').length;
    petowner = !!publicUserRole.filter((role) => role.name === 'petownerjj').length;
  }
  console.log('petsitter, petowner', petsitter, petowner);

  return (
    <div className="PublicProfile">
      <section className="profile">
        <div className="profile__user">
          <div className="profile__user__infos">
            <h1
              className="profile__user__name"
            >
              {publicUser.first_name}
              <br />
              {publicUser.last_name}
            </h1>
            <p className="profile__user__location">
              <MdPlace />
              {`${publicUser.city} - ${publicUser.postal_code}`}
            </p>
            <p
              className="profile__user__email"
            >
              <RiMailFill />
              {publicUser.email}
            </p>
          </div>

          <div
            className="profile__user__right"
          >
            <Link to={`mailto:${publicUser.email}`}>
              <button
                type="button"
                className="profile__user__right__button"
              >
                <RiMailFill />
                Contactez-moi
              </button>
            </Link>

            <div className="profile__user__right__tags">
              {petowner && <FaPaw size="40" />}
              {petsitter && <MdChildFriendly size="40" />}

            </div>
          </div>
        </div>
        <p className="profile__user__description">{`"${publicUser.presentation}"`}</p>
      </section>

      <hr />

      <section className="pets">

        <h1 className="pets__title">Mes animaux</h1>

        <PetCard
          className="pets__item"
          name="Médor"
          pet_type="Chien"
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi dicta eveniet quos, optio veritatis officia quam tempore pariatur magnam. Laudantium sequi quasi eum laboriosam mollitia, eos amet esse dolores accusamus."
        />
        <PetCard
          name="Félix"
          pet_type="Chat"
          description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi dicta eveniet quos, optio veritatis officia quam tempore pariatur magnam."
        />

      </section>

      <hr />

      <section className="ads">
        <h1 className="ads__title">Je recherche</h1>
        {/* Mettre composant annonce que Simon aura fait pour la page Toutes les annonces */}
      </section>
      <hr />

      {petsitter && <PetsittingDetails isAvailable={publicUser.availability} />}

    </div>
  );
}

export default PublicProfile;
