import { FiPlus } from 'react-icons/fi';
import { MdLibraryAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getMyAds } from '../../api/ads';

import UpdateMyProfile from './UpdateMyProfile/UpdateMyProfile';
import PetProfile from './PetProfile/PetProfile';
import { deleteAccount, fetchConnectedUserInfos } from '../../api/user';
import './MyProfile.scss';
import { logout } from '../../store/reducers/user';
import { resetResearchPetsitters } from '../../store/reducers/petsitters';
import { resetFieldsUpdateAccount } from '../../store/reducers/updateAccount';
import Loader from '../../components/Loader/Loader';
import CounterResults from '../../components/CounterResults/CounterResults';
import MyAdCard from '../MyAds/MyAdCard/MyAdCard';
import '../MyAds/MyAdCard/MyAdCard.scss';

function MyProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const connectedUser = useSelector((state) => state.user.connectedUser);
  const myAdsData = useSelector((state) => state.user.ads);

  useEffect(() => {
    dispatch(fetchConnectedUserInfos());
    setIsLoading(false);
    dispatch(getMyAds());
  }, []);

  const [confirmDelete, setConfirmDelete] = useState(false);

  function handleDeleteAccount() {
    setConfirmDelete(true);
    const timer = setTimeout(() => {
      setConfirmDelete(false);
    }, 6000);
    return () => clearTimeout(timer);
  }

  function handleConfirmDeleteAccount() {
    dispatch(deleteAccount());
    localStorage.clear();
    dispatch(logout());
    dispatch(resetResearchPetsitters());
    dispatch(resetFieldsUpdateAccount());
    navigate('/');
  }

  return (
    <div className="MyProfile">

      {isLoading
        ? <Loader />
        : (
          <div>
            <UpdateMyProfile />
            <hr />
            <PetProfile
              pets={connectedUser.pets}
            />
          </div>
        )}
      <hr />

      <div className="profile__ads">
        <h1>Mes annonces</h1>

        {myAdsData[0]
          ? (
            <>
              <CounterResults
                arrayResult={myAdsData}
                searchType="annonce"
              />

              {myAdsData.map((ad) => (
                <MyAdCard
                  key={ad.id}
                  adCardTitle={ad.title}
                  adCardContent={ad.content}
                  adCardCity={ad.city}
                  adCardPostalCode={ad.postal_code}
                  adCardCreatedAt={ad.created_at}
                  adCardId={ad.id}
                />
              ))}
            </>
          )
          : (
            <div className="myAds__notFound">
              <p>
                Vous n&#39;avez pas encore d&#39;annonce.
              </p>
            </div>
          )}

        <div className="profile__ads__btns">
          <Link to="/creer-une-annonce">
            <button type="button" className="profile__ads__btn--add">
              <FiPlus />
              Ajouter une annonce
            </button>
          </Link>
          <Link to="/mes-annonces">
            <button type="button" className="profile__ads__btn--disp">
              Afficher / Gérer mes annonces
            </button>
          </Link>
        </div>
      </div>

      <div className="profile__delete">
        {confirmDelete
          ? (
            <button
              type="button"
              className="profile__delete__btn profile__delete__btn--confirm"
              onClick={handleConfirmDeleteAccount}
            >
              SUR DE VOULOIR NOUS QUITTER ?
            </button>
          )
          : (
            <button
              type="button"
              className="profile__delete__btn"
              onClick={handleDeleteAccount}
            >
              SUPPRIMER MON COMPTE
            </button>
          )}
      </div>
    </div>

  );
}

export default MyProfile;
