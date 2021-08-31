import '../styles/home.scss';
import { Navbar } from "../components/Navbar";
import { Developertable } from "../components/Developertable";
import { Modaladd } from "../components/Modaladd";


export function Home() {

  return (
    <>
      <Navbar/>
      <div className='developers-container'>


        <div className="input-field col s6">
          <input id="pesqiuisar" type="text" className="validate"/>
          <label htmlFor="pesquisar">Pesquisar por desenvolvedor</label>
        </div>


        <div className='developers-add-button-item'>
          <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                  data-bs-target="#add-developer-modal">
            <i className="material-icons">add</i>
          </button>
        </div>


        <Modaladd modalId={'add-modal'}/>


        <div className='developers-table-item'>
          <Developertable/>
        </div>
        <div className='developers-paginator-item'>
          <ul className="pagination">
            <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
            <li className="active"><a href="#!">1</a></li>
            <li className="waves-effect"><a href="#!">2</a></li>
            <li className="waves-effect"><a href="#!">3</a></li>
            <li className="waves-effect"><a href="#!">4</a></li>
            <li className="waves-effect"><a href="#!">5</a></li>
            <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
          </ul>
        </div>
      </div>
    </>
  )
}
