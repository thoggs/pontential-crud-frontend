import { DeveloperType } from "../@type/developers/developer.type";
import { Dispatch, SetStateAction } from "react";
import { RequestStatus } from "../@type/enums/enums";
import { fetchDeleteDeveloper } from "../services/developers.services";
import { useTextGlobals } from "../hooks/i18n/useTextGlobals";
import { toast } from "react-hot-toast";

type ModaldeleteProps = {
  modalId: string,
  developer?: DeveloperType,
  onRequestStatus: Dispatch<SetStateAction<RequestStatus>>
}

export function Modaldelete(props: ModaldeleteProps) {
  const {texts} = useTextGlobals(process.env.REACT_APP_TEXT_LOCALE)
  const {modalId, developer, onRequestStatus} = props;

  function deleteDeveloper() {
    if (developer && developer.id) {
      fetchDeleteDeveloper(developer.id)
        .then(() => {
          onRequestStatus(RequestStatus.SUCCESS)
          toast.success(texts.MODAL_DEL_TOAST_DEVELOPER_SUCCESS)
        })
        .finally(() => {
          const btnEl = document.getElementById('modal-delete-developer-button');
          if (btnEl) btnEl.click();
        })
        .catch(() => toast.error(texts.MODAL_DEL_TOAST_DEVELOPER_ERROR));
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
              {texts.MODAL_DEL_BTN_CONFIRM}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"/>
          </div>
          <div className="modal-body">
            <div className="alert alert-warning" role="alert">
              <span className='mx-1'>{texts.MODAL_DEL_BTN_CONTENT_1}</span>
              <i className='fw-bold'>{developer ? developer.nome : ''}</i>
              <span className='mx-1'>{texts.MODAL_DEL_BTN_CONTENT_2}</span>
            </div>
          </div>
          <div className="modal-footer">
            <button
              id='modal-delete-developer-button'
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal">
              {texts.MODAL_DEL_BTN_CLOSE_MODAL}
            </button>
            <button
              onClick={deleteDeveloper}
              type="button"
              className="btn btn-danger">
              {texts.MODAL_DEL_BTN_SUBMIT}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
