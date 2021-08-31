import '../styles/developer.scss';
import moment from "moment";
import { useDevelopers } from "../hooks/developers/useDevelopers";
import { useState } from "react";
import { RequestType } from "../interfaces/enums";


type OptionsProps = {
  type?: RequestType,
  devId?: string,
  query?: URLSearchParams
}

export function Developertable() {
  const [state, dispatch] = useState<OptionsProps>({
    devId: undefined,
    query: undefined,
    type: undefined
  });
  const {developers} = useDevelopers(state);


  function handleDeleteDeveloper(devId: string) {
    dispatch({devId: devId, type: RequestType.DELETE})
  }

  function handleDevelopers() {
    if (developers) {
      return (
        developers.map((dev) => {
          return (
            <tr key={dev.id}>
              <td>{dev.nome}</td>
              <td>{dev.idade}</td>
              <td>{dev.sexo}</td>
              <td>{dev.hobby}</td>
              <td>{moment(dev.datanascimento).format('L')}</td>
              <td><i onClick={() => console.log(dev.id)} className='material-icons'>edit</i></td>
              <td><i onClick={() => handleDeleteDeveloper(dev.id)} className='material-icons'>delete</i></td>
            </tr>
          )
        })
      )
    }
  }

  return (
    <div>
      <table className='table table-striped table-bordered tabledev rounded'>
        <thead>
        <tr>
          <th>Nome</th>
          <th>Idade</th>
          <th>Sexo</th>
          <th>Hobby</th>
          <th>Data de Nascimento</th>
        </tr>
        </thead>
        <tbody>
        {handleDevelopers()}
        </tbody>
      </table>
    </div>
  )

}
