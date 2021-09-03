import { Genre, RequestStatus } from "../@type/enums/enums";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { fetchCreateDeveloper } from "../services/developers.services";


type ModaladdProps = {
  modalId: string,
  onRequestStatus: Dispatch<SetStateAction<RequestStatus>>
}

export function Modaladd(props: ModaladdProps) {
  const [nome, setNome] = useState<string>('');
  const [idade, setIdade] = useState<string>('');
  const [sexo, setSexo] = useState<string>('');
  const [hobby, setHobby] = useState<string>('');
  const [datanascimento, setDatanascimento] = useState<string>('');
  const {modalId, onRequestStatus} = props;

  function handleAddDeveloper(event: FormEvent) {
    event.preventDefault();

    if (!sexo)
      return

    fetchCreateDeveloper({
      nome: nome,
      idade: idade,
      sexo: sexo,
      hobby: hobby,
      datanascimento: datanascimento
    }).then(result => console.log(result))
      .finally(() => {
        setNome('');
        setIdade('');
        setSexo('');
        setHobby('');
        setDatanascimento('');

        onRequestStatus(RequestStatus.SUCCESS)
        const btnEl = document.getElementById('add-modal-close-button');
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
                Adicionar desenvolvedor
              </h5>
              <button
                type="button"
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
                      <input
                        onChange={event => setNome(event.target.value)}
                        value={nome} type="text"
                        className="form-control"
                        id="modal-add-nome"
                        placeholder="nome exemplo"
                        required
                      />
                      <label htmlFor="floatingInput">Nome</label>
                    </div>
                  </div>
                  <div className='col'>
                    <div className="form-floating mb-3">
                      <input
                        onChange={event => setIdade(event.target.value)}
                        value={idade}
                        type='number'
                        className="form-control"
                        id="modal-add-idade"
                        placeholder="idade = 25"
                        required
                      />
                      <label htmlFor="floatingInput">Idade</label>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <div className="form-floating mb-3">
                      <input
                        onChange={event => setDatanascimento(event.target.value)}
                        value={datanascimento}
                        type="date"
                        className="form-control"
                        id="modal-add-datanascimento"
                        placeholder="dia/mês/ano"
                        required
                      />
                      <label htmlFor="floatingInput">Data de nascimento</label>
                    </div>
                  </div>
                  <div className='col'>
                    <div className="form-floating">
                      <select
                        onChange={event => setSexo(event.target.value)}
                        value={sexo}
                        className="form-select"
                        id="seletemodaladd"
                        aria-label="Floating label select example"
                        required>
                        <option value={''}>Selecione seu gênero</option>
                        <option value={Genre.M}>Masculino</option>
                        <option value={Genre.F}>Feminino</option>
                        <option value={Genre.O}>Outro</option>
                      </select>
                      <label htmlFor="seletemodaladd">Clique para selecionar</label>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <div className="form-floating">
                      <textarea
                        onChange={event => setHobby(event.target.value)}
                        value={hobby}
                        className="form-control"
                        placeholder="Leave a comment here"
                        id="modal-add-hobby"
                        required
                      />
                      <label htmlFor="floatingTextarea">Hobby</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                id='add-modal-close-button'
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                Fechar
              </button>
              <button
                id='add-modal-submit-button'
                type="submit"
                className="btn btn-success">
                <i className="bi-box-arrow-in-right me-2"/>
                Enviar formulário
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
