import { DeveloperType } from "../@type/developers/developer.type";
import { Dispatch, SetStateAction } from "react";
import { RequestStatus } from "../@type/enums/enums";
import { fetchDeleteDeveloper } from "../services/developers.services";

type ModaldeleteProps = {
  modalId: string,
  developer?: DeveloperType,
  onRequestStatus: Dispatch<SetStateAction<RequestStatus>>
}

export function Modaldelete(props: ModaldeleteProps) {
  const {modalId, developer, onRequestStatus} = props;

  function deleteDeveloper() {
    if (developer && developer.id) {
      fetchDeleteDeveloper(developer.id)
        .finally(() => {
          onRequestStatus(RequestStatus.SUCCESS)
          const btnEl = document.getElementById('modal-delete-developer-button');
          if (btnEl) btnEl.click();
        });
    }
  }

  return (
    <div className="modal fade"
         id={modalId}
         aria-labelledby="modal-delete-aria"
         aria-hidden="true"
         data-bs-backdrop="static"
         data-bs-keyboard="false">
      <div className="modal-dialog modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"
                id="modal-delete-developer-title">
              Confirma a exclusão?
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"/>
          </div>
          <div className="modal-body">

            <div className="alert alert-warning" role="alert">
              O desenvolvedor <i className='fw-bold'>{developer ? developer.nome : ''}</i> será excluido
              permanentemente!
            </div>

          </div>
          <div className="modal-footer">
            <button
              id='modal-delete-developer-button'
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal">
              Fechar
            </button>
            <button
              onClick={deleteDeveloper}
              type="button"
              className="btn btn-danger">
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
