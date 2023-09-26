import React from 'react';
import Header from '../../componentes/Header';

export const Cozinha = () => {
  return (
    <>
      <Header />
      <div className="bodyCozinha">
        <div>
          <h3>Aguardando aprovação</h3>
        </div>
        <div>
          <h3>Fila</h3>
        </div>
        <div>
          <h3>Preparando</h3>
        </div>
      </div>
    </>
  );
};
