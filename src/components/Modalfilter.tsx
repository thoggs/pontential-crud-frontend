import { Genre, RequestStatus } from "../@type/enums/enums";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { fetchFilterDevelopers } from "../services/developers.services";
import { DeveloperType } from "../@type/developers/developer.type";
import { toast } from "react-hot-toast";
import { useTextGlobals } from "../hooks/i18n/useTextGlobals";


type ModaladdProps = {
  modalId: string,
  onRequestStatus: Dispatch<SetStateAction<RequestStatus>>
  setDeveloperList: React.Dispatch<React.SetStateAction<DeveloperType[]>>
  setQuery: React.Dispatch<React.SetStateAction<any>>
  setTotalPage: React.Dispatch<React.SetStateAction<number>>
}

export function Modalfilter(props: ModaladdProps) {
  const {texts} = useTextGlobals(process.env.REACT_APP_TEXT_LOCALE)
  const [nome, setNome] = useState<string>('');
  const [idade, setIdade] = useState<string>('');
  const [sexo, setSexo] = useState<string>('');
  const [hobby, setHobby] = useState<string>('');
  const [datanascimento, setDatanascimento] = useState<string>('');
  const {modalId, onRequestStatus, setDeveloperList, setQuery, setTotalPage} = props;

  function handleFilterDeveloper(event: FormEvent) {
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
      if (result.body.data?.length > 0) {
        setDeveloperList(result.body.data)
        setTotalPage(result.body.total)
        onRequestStatus(RequestStatus.INITIAL_VALUE)
        clearFormFilter()
      } else {
        setQuery(undefined)
        toast.error(texts.MODAL_FILTER_TOAST_DEVELOPER_WARNING)
      }
    })
      .finally(() => {
        const btnEl = document.getElementById('filter-modal-close-button');
        if (btnEl) btnEl.click()
      })
      .catch(() => {
        clearFormFilter()
        toast.error(texts.MODAL_FILTER_TOAST_DEVELOPER_ERROR)
        onRequestStatus(RequestStatus.ERROR)
      })
  }

  function clearFormFilter() {
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
  }

  return (
    <div className="modal fade"
         id={modalId}
         aria-hidden="true"
         data-bs-backdrop="static"
         data-bs-keyboard="false">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <form onSubmit={handleFilterDeveloper}>
            <div className="modal-header">
              <h5 className="modal-title">
                {texts.MODAL_FILTER_TITLE}
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
                        id="modal-filter-nome"
                        placeholder="nome exemplo"
                      />
                      <label htmlFor="floatingInput">{texts.MODAL_FILTER_FORM_NAME}</label>
                    </div>
                  </div>
                  <div className='col'>
                    <div className="form-floating mb-3">
                      <input
                        onChange={event => setIdade(event.target.value)}
                        value={idade}
                        type='number'
                        className="form-control"
                        id="modal-filter-idade"
                        placeholder="idade = 25"
                      />
                      <label htmlFor="floatingInput">{texts.MODAL_FILTER_FORM_AGE}</label>
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
                        id="modal-filter-datanascimento"
                        placeholder="dia/mês/ano"
                      />
                      <label htmlFor="floatingInput">{texts.MODAL_FILTER_FORM_BIRTH_DATE}</label>
                    </div>
                  </div>
                  <div className='col'>
                    <div className="form-floating">
                      <select
                        onChange={event => setSexo(event.target.value)}
                        value={sexo}
                        className="form-select"
                        id="modalseletefilter"
                        aria-label="Floating label select example">
                        <option value={''}>{texts.MODAL_FILTER_FORM_GENRE_SELECT_PLACEHOLDER}</option>
                        <option value={Genre.M}>{texts.MODAL_FILTER_FORM_GENRE_SELECT_OPTION_M}</option>
                        <option value={Genre.F}>{texts.MODAL_FILTER_FORM_GENRE_SELECT_OPTION_F}</option>
                        <option value={Genre.O}>{texts.MODAL_FILTER_FORM_GENRE_SELECT_OPTION_O}</option>
                      </select>
                      <label htmlFor="modalseletefilter">{texts.MODAL_FILTER_FORM_GENRE_SELECT_LABEL}</label>
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
                        id="modal-filter-hobby"
                      />
                      <label htmlFor="floatingTextarea">{texts.MODAL_FILTER_FORM_HOBBY}</label>
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
                {texts.MODAL_FILTER_BTN_CLOSE_MODAL}
              </button>
              <button
                id='filter-modal-submit-button'
                type="submit"
                className="btn btn-success">
                <i className="bi-box-arrow-in-right me-2"/>
                {texts.MODAL_FILTER_BTN_SUBMIT}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
