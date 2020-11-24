import React, { useState } from 'react';

import { FiEdit3, FiTrash } from 'react-icons/fi';

import api from '../../services/api';

import { Container } from './styles';

interface IClient {
  id: number;
  name: string;
  image: string;
  available: boolean;
  address: string;
  telephone: string;
  numeroUsina: string;
  percentualUsina: string;
}

interface IProps {
  client: IClient;
  handleDelete: (id: number) => {};
  handleEditClient: (client: IClient) => void;
}

const Client: React.FC<IProps> = ({
  client,
  handleDelete,
  handleEditClient,
}: IProps) => {
  const [isAvailable, setIsAvailable] = useState(client.available);

  async function toggleAvailable(): Promise<void> {
    try {
      await api.put(`/client/${client.id}`, {
        ...client,
        available: !isAvailable,
      });

      setIsAvailable(!isAvailable);
    } catch (err) {
      console.log(err);
    }
  }

  function setEditingClient(): void {
    handleEditClient(client);
  }

  return (
    <Container available={isAvailable}>
      <header>
        <img src={client.image} alt={client.name} />
      </header>
      <section className="body">
        <h2>{client.name}</h2>
        <p>Endereço: {client.address}</p>
        <p>Telefone: {client.telephone}</p>
        <p>Usina: {client.numeroUsina}</p>
        <p>PercentualUsina: {client.percentualUsina}</p>
      </section>
      <section className="client">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={() => setEditingClient()}
            data-testid={`edit-client-${client.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => handleDelete(client.id)}
            data-testid={`remove-client-${client.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? 'Disponível' : 'Indisponível'}</p>

          <label htmlFor={`available-switch-${client.id}`} className="switch">
            <input
              id={`available-switch-${client.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={toggleAvailable}
              data-testid={`change-status-client-${client.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

export default Client;
