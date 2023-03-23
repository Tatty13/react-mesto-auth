import { useEffect, useState, useCallback, useMemo } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import { api, authApi } from "../utils/api";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isImagePopupOpen, setImagePopupState] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupState] = useState(false);
  const [isErrorPopupOpen, setErrorPopupState] = useState(false);
  const [isSuccessLoginPopupOpen, setSuccessLoginPopupState] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });

  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });
  const [userEmail, setUserEmail] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [isloggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  /* -------------------------------------------- */
  const popupsState = useMemo(
    () => [
      { state: isEditAvatarPopupOpen, setter: setEditAvatarPopupState },
      { state: isEditProfilePopupOpen, setter: setEditProfilePopupState },
      { state: isAddPlacePopupOpen, setter: setAddPlacePopupState },
      { state: isImagePopupOpen, setter: setImagePopupState },
      { state: isDeleteCardPopupOpen, setter: setDeleteCardPopupState },
      { state: isSuccessLoginPopupOpen, setter: setSuccessLoginPopupState },
    ],
    [
      isEditAvatarPopupOpen,
      isEditProfilePopupOpen,
      isAddPlacePopupOpen,
      isImagePopupOpen,
      isDeleteCardPopupOpen,
      isSuccessLoginPopupOpen,
    ]
  );

  const closeAllPopups = useCallback(() => {
    if (isErrorPopupOpen) {
      setErrorPopupState(false);
    } else {
      popupsState.forEach(popup => popup.state && popup.setter(false));
    }
  }, [popupsState, isErrorPopupOpen]);

  /* -------------------------------------------- */

  const handleErrorCatch = useCallback(errorText => {
    setErrorPopupState(true);
    setErrorText(errorText);
  }, []);

  function handleLogin(email) {
    setIsLoggedIn(true);
    setUserEmail(email);
  }

  function handlseSignup() {
    setSuccessLoginPopupState(true);
  }

  function handleSuccessPopupClose() {
    closeAllPopups();
    navigate("/", { replace: true });
  }

  function handleSignout() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/sign-in", { replace: true });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupState(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupState(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupState(true);
  }

  function handleCardClick({ name, link }) {
    setSelectedCard({
      name,
      link,
    });
    setImagePopupState(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);

    api
      .toogleCardLike(card._id, isLiked)
      .then(updatedCard => {
        setCards(cards =>
          cards.map(item => (item._id === updatedCard._id ? updatedCard : item))
        );
      })
      .catch(handleErrorCatch);
  }

  function handleDeleteCardPopupOpen(cardId) {
    setSelectedCard({ id: cardId });
    setDeleteCardPopupState(true);
  }

  function handleCardDelete(cardId) {
    setLoading(true);
    api
      .deleteCard(cardId)
      .then(_ => {
        setCards(cards => cards.filter(item => item._id !== cardId));
        closeAllPopups();
      })
      .catch(handleErrorCatch)
      .finally(() => setLoading(false));
  }

  function handleUpdateUser(userData) {
    setLoading(true);

    api
      .setUserData(userData)
      .then(updatedUserInfo => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .catch(handleErrorCatch)
      .finally(() => setLoading(false));
  }

  function handleUpdateAvatar(avatarData) {
    setLoading(true);
    api
      .updateAvatar(avatarData)
      .then(updatedUserInfo => {
        setCurrentUser(updatedUserInfo);
        closeAllPopups();
      })
      .catch(handleErrorCatch)
      .finally(() => setLoading(false));
  }

  function handleAddPlaceSubmit(cardData) {
    setLoading(true);
    api
      .addCard(cardData)
      .then(newCard => {
        setCards(cards => [newCard, ...cards]);
        closeAllPopups();
      })
      .catch(handleErrorCatch)
      .finally(() => setLoading(false));
  }

  const handleTokenCheck = useCallback(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      authApi
        .validateToken(token)
        .then(({ data }) => {
          setUserEmail(data.email);
          setIsLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch(handleErrorCatch);
    }
  }, [handleErrorCatch, navigate]);

  useEffect(() => {
    handleTokenCheck();
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([user, cardsData]) => {
        setCurrentUser(user);
        setCards([...cardsData]);
      })
      .catch(handleErrorCatch);
  }, [handleErrorCatch, handleTokenCheck]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <div className="page__wrap">
          <Header
            isloggedIn={isloggedIn}
            email={userEmail}
            onSignput={handleSignout}
          />

          <Routes>
            <Route
              path="/sign-up"
              element={
                <Register onSignup={handlseSignup} onError={handleErrorCatch} />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login onLogin={handleLogin} onError={handleErrorCatch} />
              }
            />
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute
                  component={Main}
                  isloggedIn={isloggedIn}
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onDeleteBtnClick={handleDeleteCardPopupOpen}
                />
              }
            />
          </Routes>

          <Footer />
        </div>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          isLoading={isLoading}
          onClose={closeAllPopups}
          onDeleteConfirm={handleCardDelete}
          card={selectedCard}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          content="error"
          moreInfo={errorText}
          title="Что-то пошло не так!
          Попробуйте ещё раз."
          isOpen={isErrorPopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          content="success"
          title="Вы успешно зарегистрировались!"
          isOpen={isSuccessLoginPopupOpen}
          onClose={handleSuccessPopupClose}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
