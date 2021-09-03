import moment from "moment";
import { DeveloperType } from "../@type/developers/developer.type";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Modalupdate } from "./Modalupdate";
import { RequestStatus } from "../@type/enums/enums";
import { Modaldelete } from "./Modaldelete";


type DevelopertableProps = {
  modalUpdateId: string,
  modalDeleteId: string,
  developersList: Array<DeveloperType>,
  onRequestStatus: Dispatch<SetStateAction<RequestStatus>>
}

export function Developerstable(props: DevelopertableProps) {
  const {developersList, modalUpdateId, modalDeleteId, onRequestStatus} = props;
  const [developer, setDeveloper] = useState<DeveloperType>();

  function handleDevelopers(): ReactNode {
    return developersList.map((dev) => {
      return (
        <tr key={dev.id}>
          <td>{dev.nome}</td>
          <td>{dev.idade}</td>
          <td>{dev.sexo === 'M' ? 'Masculino' : dev.sexo === 'F' ? 'Feminino' : 'Outro'}</td>
          <td>{dev.hobby}</td>
          <td>{moment(dev.datanascimento).format('L')}</td>
          <td><i
            onClick={() => setDeveloper(dev)}
            data-bs-target={`#${modalUpdateId}`}
            data-bs-toggle="modal"
            className='bi-pencil-square'/>
          </td>
          <td><i
            onClick={() => setDeveloper(dev)}
            data-bs-target={`#${modalDeleteId}`}
            data-bs-toggle="modal"
            className='bi-trash-fill text-danger'/>
          </td>
        </tr>
      );
    });
  }

  return (
    <>
      <div className='my-custom-scrollbar table-wrapper-scroll-y table-tools'>
        <table className='table table-striped table-bordered rounded table-hover table-responsive table'>
          <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Sexo</th>
            <th>Hobby</th>
            <th>Data de Nascimento</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
          </thead>
          <tbody>
          {handleDevelopers()}
          </tbody>
        </table>
      </div>
      <Modalupdate
        modalId={modalUpdateId}
        developer={developer}
        onRequestStatus={onRequestStatus}
      />
      <Modaldelete
        modalId={modalDeleteId}
        developer={developer}
        onRequestStatus={onRequestStatus}
      />
    </>
  )

}
