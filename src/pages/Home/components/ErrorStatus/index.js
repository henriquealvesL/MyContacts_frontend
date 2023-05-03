import PropTypes from "prop-types";

import { ErrorContainer } from "./styles";

import sad from "../../../../assets/images/sad.svg";
import Button from "../../../../components/Button";

export default function ErrorStatus({ onTryAgain }) {
  return (
    <ErrorContainer>
      <img src={sad} alt="sad" />
      <div className="details">
        <strong>Ocorreu um erro ao buscar seus contatos!</strong>
        <Button type="button" onClick={onTryAgain}>
          Tente novamente
        </Button>
      </div>
    </ErrorContainer>
  );
}

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
};
