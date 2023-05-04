import PropTypes from "prop-types";

import { Overlay, Container, Footer } from "./styles";

import Button from "../Button";
import ReactPortal from "../ReactPortal";
import useAnimatedUnmount from "../../hooks/useAnimatedUnmount";

export default function Modal({
  danger,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  isModalVisible,
  isLoading,
}) {
  const { shouldRender, animatedElementRef } =
    useAnimatedUnmount(isModalVisible);

  if (!shouldRender) return null;

  return (
    <ReactPortal containerId="modal-root">
      <Overlay isLeaving={!isModalVisible} ref={animatedElementRef}>
        <Container danger={danger} isLeaving={!isModalVisible}>
          <h1>{title}</h1>
          <div className="modal-body">{children}</div>

          <Footer>
            <button
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              type="button"
              danger={danger}
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  isModalVisible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
  cancelLabel: "Cancelar",
  confirmLabel: "Confirmar",
  isLoading: false,
};
