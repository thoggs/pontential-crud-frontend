import { Genre, RequestStatus } from "../@type/enums/enums";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { fetchFilterDevelopers } from "../services/developers.services";
import { DeveloperType } from "../@type/developers/developer.type";


type ModaladdProps = {
  modalId: string,
  onRequestStatus: Dispatch<SetStateAction<RequestStatus>>
  setDeveloperList:  React.Dispatch<React.SetStateAction<DeveloperType[]>>
  setQuery:  React.Dispatch<React.SetStateAction<any>>
  setTotalPage:  React.Dispatch<React.SetStateAction<number>>
}

export function Modalfilter(props: ModaladdProps) {
  const [nome, setNome] = useState<string>('');
  const [idade, setIdade] = useState<string>('');
  const [sexo, setSexo] = useState<string>('');
  const [hobby, setHobby] = useState<string>('');
  const [datanascimento, setDatanascimento] = useState<string>('');
  const {modalId, onRequestStatus, setDeveloperList, setQuery, setTotalPage} = props;

  function handleAddDeveloper(event: FormEvent) {
    event.preventDefault();

    if (!nome && !idade && !sexo && !hobby && !datanascimento) {
      return
    }

    fetchFilterDevelopers({
      nome: nome,
      idade: idade,
      sexo: sexo,
      hobby: hobby,
      datanascimento: datanascimento
    }).then(result => {
      setDeveloperList(result.body.data)
      setTotalPage(result.body.total)
    })
      .finally(() => {
        setNome('');
        setIdade('');
        setSexo('');
        setHobby('');
        setDatanascimento('');

        setQuery({
          nome: nome,
          idade: idade,
          sexo: sexo,
          hobby: hobby,
          datanascimento: datanascimento
        })

        onRequestStatus(RequestStatus.INITIAL_VALUE)
        const btnEl = document.getElementById('filter-modal-close-button');
        if (btnEl) btnEl.click();

      })
      .catch(() => onRequestStatus(RequestStatus.ERROR))
  }

  return (
    <div className="modal fade"
         id={modalId}
         aria-hidden="true"
         data-bs-backdrop="static"
         data-bs-keyboard="false">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <form onSubmit={handleAddDeveloper}>
            <div className="modal-header">
              <h5 className="modal-title">
                Filtrar por desenvolvedores
              </h5>
              <button type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className='container p-3'>
                <div className='row'>
                  <div className='col'>
                    <div className="form-floating mb-3">
                      <input onChange={event => setNome(event.target.value)}
                             value={nome} type="text"
                             className="form-control"
                             id="modal-filter-nome"
                             placeholder="nome exemplo"
                      />
                      <label htmlFor="floatingInput">Nome</label>
                    </div>
                  </div>
                  <div className='col'>
                    <div className="form-floating mb-3">
                      <input onChange={event => setIdade(event.target.value)}
                             value={idade}
                             type='number'
                             className="form-control"
                             id="modal-filter-idade"
                             placeholder="idade = 25"
                      />
                      <label htmlFor="floatingInput">Idade</label>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <div className="form-floating mb-3">
                      <input onChange={event => setDatanascimento(event.target.value)}
                             value={datanascimento}
                             type="date"
                             className="form-control"
                             id="modal-filter-datanascimento"
                             placeholder="dia/mês/ano"
                      />
                      <label htmlFor="floatingInput">Data de nascimento</label>
                    </div>
                  </div>
                  <div className='col'>
                    <div className="form-floating">
                      <select onChange={event => setSexo(event.target.value)}
                              value={sexo}
                              className="form-select"
                              id="modalseletefilter"
                              aria-label="Floating label select example">
                        <option value={''}>Selecione seu gênero</option>
                        <option value={Genre.M}>Masculino</option>
                        <option value={Genre.F}>Feminino</option>
                        <option value={Genre.O}>Outro</option>
                      </select>
                      <label htmlFor="modalseletefilter">Clique para selecionar</label>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <div className="form-floating">
                      <textarea onChange={event => setHobby(event.target.value)}
                                value={hobby}
                                className="form-control"
                                placeholder="Leave a comment here"
                                id="modal-filter-hobby"
                      />
                      <label htmlFor="floatingTextarea">Hobby</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                id='filter-modal-close-button'
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                Fechar
              </button>
              <button
                id='filter-modal-submit-button'
                type="submit"
                className="btn btn-success">
                <i className="bi-box-arrow-in-right me-2"/>
                Filtrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
