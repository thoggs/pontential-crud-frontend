import '../styles/modal.scss'
import { useEffect } from "react";

type ModaladdProps = {
  modalId: string
}


export function Modaladd(props: ModaladdProps) {
  const {modalId} = props;

  useEffect(() => {
    document.addEventListener('DOMContentLoaded', function() {
      const elems = document.querySelectorAll('.modal');
      M.Modal.init(elems, {preventScrolling: true});
    });
  })

  return (




    <div className="modal fade" id="add-developer-modal" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="add-developer-modal">Modal title</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
          </div>
          <div className="modal-body">
            ...
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>





    // <div id={modalId} className="modal developers-modal-add">
    //   <div className="modal-content">
    //     <div className="row">
    //       <form className="col s12">
    //         <div className="row">
    //           <div className="input-field col s6">
    //             <input id="first_name" type="text" className="validate"/>
    //             <label htmlFor="first_name">Nome</label>
    //           </div>
    //           <div className="input-field col s6">
    //             <input id="last_name" type="text" className="validate"/>
    //             <label htmlFor="last_name">Idade</label>
    //           </div>
    //         </div>
    //         <div className="row">
    //           <div className="input-field col s12">
    //             <input id="hobby" type="text" className="validate"/>
    //             <label htmlFor="hobby">Hobby</label>
    //           </div>
    //         </div>
    //         <div className="row">
    //           <div className="input-field col s6">
    //             <input id="sexo" type="text" className="validate"/>
    //             <label htmlFor="sexo">Sexo</label>
    //           </div>
    //           <div className="input-field col s6">
    //             <input id="datanascimento" type="text" className="validate"/>
    //             <label htmlFor="datanascimento">Data de nascimento</label>
    //           </div>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    //   <div className="modal-footer">
    //     <button className="btn waves-effect waves-light" type="submit" name="action">Cadastrar
    //       <i className="material-icons right">send</i>
    //     </button>
    //   </div>
    // </div>
  )
}
