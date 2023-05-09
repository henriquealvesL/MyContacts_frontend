import PropTypes from "prop-types";

import { Container } from "./styles";
import { useEffect, memo } from "react";

import xCircleIcon from "../../../assets/images/icons/x-circle.svg";
import checkCircleIcon from "../../../assets/images/icons/check-circle.svg";

function ToastMessage({ message, onRemoveMessage, isLeaving, animatedRef }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 7000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onRemoveMessage, message]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
      isLeaving={isLeaving}
      ref={animatedRef}
    >
      {message.type === "danger" && <img src={xCircleIcon} alt="X" />}
      {message.type === "success" && <img src={checkCircleIcon} alt="check" />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  onRemoveMessage: PropTypes.func.isRequired,
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["success", "danger", "default"]).isRequired,
    id: PropTypes.number.isRequired,
    duration: PropTypes.number,
  }).isRequired,
  isLeaving: PropTypes.bool.isRequired,
  animatedRef: PropTypes.shape().isRequired,
};

export default memo(ToastMessage);
