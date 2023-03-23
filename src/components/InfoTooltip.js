import Popup from "./Popup";

function InfoTooltip({ moreInfo, isOpen, onClose, content, title }) {
  return (
    <Popup
      name="notification"
      isOpen={isOpen}
      onClose={onClose}
      containerClass={`popup__container popup__container_content_notification popup__container_content_${content}`}>
      <h2 className="popup__title">{title}</h2>
      <p className="popup__subtitle">{moreInfo}</p>
    </Popup>
  );
}

export default InfoTooltip;
