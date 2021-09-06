import { Genre, RequestStatus } from "../@type/enums/enums";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { fetchCreateDeveloper } from "../services/developers.services";
import { toast } from "react-hot-toast";
import { useTextGlobals } from "../hooks/i18n/useTextGlobals";


type ModaladdProps = {
  modalId: string,
  onRequestStatus: Dispatch<SetStateAction<RequestStatus>>
}

export function Modaladd(props: ModaladdProps) {
  const [nome, setNome] = useState<string>('')
  const [idade, setIdade] = useState<string>('')
  const [sexo, setSexo] = useState<string>('')
  const [hobby, setHobby] = useState<string>('')
  const [datanascimento, setDatanascimento] = useState<string>('')
  const {texts} = useTextGlobals(process.env.REACT_APP_TEXT_LOCALE)
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
    })
      .then(() => {
        onRequestStatus(RequestStatus.SUCCESS)
        toast.success(texts.MODAL_ADD_TOAST_DEVELOPER_SUCCESS)
      })
      .finally(() => {
        setNome('');
        setIdade('');
        setSexo('');
        setHobby('');
        setDatanascimento('');

        const btnEl = document.getElementById('add-modal-close-button');
        if (btnEl) btnEl.click();
      })
      .catch(() => {
        toast.error(texts.MODAL_ADD_TOAST_DEVELOPER_ERROR)
        onRequestStatus(RequestStatus.ERROR)
      })
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
                {texts.MODAL_ADD_BTN_ADD_DEVELOPER}
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
                      <label htmlFor="floatingInput">{texts.MODAL_ADD_FORM_NAME}</label>
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
                      <label htmlFor="floatingInput">{texts.MODAL_ADD_FORM_AGE}</label>
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
                      <label htmlFor="floatingInput">{texts.MODAL_ADD_FORM_BIRTH_DATE}</label>
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
                        <option value={''}>{texts.MODAL_ADD_FORM_GENRE_SELECT_PLACEHOLDER}</option>
                        <option value={Genre.M}>{texts.MODAL_ADD_FORM_GENRE_SELECT_OPTION_M}</option>
                        <option value={Genre.F}>{texts.MODAL_ADD_FORM_GENRE_SELECT_OPTION_F}</option>
                        <option value={Genre.O}>{texts.MODAL_ADD_FORM_GENRE_SELECT_OPTION_O}</option>
                      </select>
                      <label htmlFor="seletemodaladd">{texts.MODAL_ADD_FORM_GENRE_SELECT_LABEL}</label>
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
                      <label htmlFor="floatingTextarea">{texts.MODAL_ADD_FORM_HOBBY}</label>
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
                {texts.MODAL_ADD_BTN_CLOSE_MODAL}
              </button>
              <button
                id='add-modal-submit-button'
                type="submit"
                className="btn btn-success">
                <i className="bi-box-arrow-in-right me-2"/>
                {texts.MODAL_ADD_BTN_SUBMIT}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
