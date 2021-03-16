import { useState, FormEvent } from "react";
import Modal from "react-modal";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import closeImg from "../../assets/close.svg";
import {
  Container,
  TransactionTypeContainer,
  RadioBox,
} from "./styles";
import { api } from "../../services/api";

interface INewTransactionModal {
  isOpen: boolean;
  onRequestClose: () => any;
}

interface IData {
  title: string;
  value: number;
  category: string;
}

Modal.setAppElement("#root");

export function NewTransactionModal({ isOpen, onRequestClose }: INewTransactionModal) {
  const [data, setData] = useState<IData>({
    title: "",
    value: 0,
    category: "",
  });
  const [type, setType] = useState("deposit");
  const handleCreateNewTransaction = (event: FormEvent) => {
    event.preventDefault();
    const body = {
      ...data,
      type,
    };
    api.post('/transactions', body);
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal"/>
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          placeholder="Título"
          value={data.title}
          onChange={event => setData({
            ...data,
            title: event.currentTarget.value,
          })}
        />
        <input
          type="number"
          placeholder="Valor"
          value={data.value === 0 ? undefined : data.value}
          onChange={event => setData({
            ...data,
            value: Number(event.currentTarget.value),
          })}
        />
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive={type === "deposit"}
            activeColor="green"
            onClick={() => setType("deposit")}
          >
            <img src={incomeImg} alt="Entrada"/>
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            isActive={type === "withdraw"}
            activeColor="red"
            onClick={() => setType("withdraw")}
          >
            <img src={outcomeImg} alt="Saída"/>
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input
          placeholder="Categoria"
          value={data.category}
          onChange={event => setData({
            ...data,
            category: event.currentTarget.value,
          })}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
};