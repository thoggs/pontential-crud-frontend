import { useEffect, useState } from "react";
import { RequestType } from "../../interfaces/enums";


type DeveloperType = {
  id: string;
  nome: string,
  idade: number,
  sexo: string,
  hobby: string,
  datanascimento: string
}

type DevelopersResponseDTO = {
  code: number,
  message: Array<string>,
  data: Array<DeveloperType> | undefined
}

type OptionsProps = {
  type?: RequestType,
  devId?: string,
  query?: URLSearchParams
}

export function useDevelopers(options: OptionsProps) {
  const {type, devId, query} = options;
  const apiUrl = 'http://localhost:8080/api/developers';
  const [developers, setDevelopers] = useState<DeveloperType[]>();


  useEffect(() => {

    switch (type) {
      case RequestType.GET: {
        if (devId) {
          fetch(`${apiUrl}/${devId}`, {method: RequestType.GET})
            .then((res) => res.json())
            .then((result: DevelopersResponseDTO) => setDevelopers(result.data))
        } else if (devId && query) {
          fetch(`${apiUrl}/${devId}/${query}`, {method: RequestType.GET})
            .then((res) => res.json())
            .then((result: DevelopersResponseDTO) => setDevelopers(result.data))
        }
        break
      }

      case RequestType.DELETE:
        fetch(`${apiUrl}/${devId}`, {method: RequestType.DELETE})
          .then((res) => res.json())
          .finally(() => {
            fetch(apiUrl, {method: RequestType.GET})
              .then((res) => res.json())
              .then((result: DevelopersResponseDTO) => setDevelopers(result.data))
          })
        break

      default:
        fetch(`${apiUrl}`, {method: 'GET'})
          .then((res) => res.json())
          .then((result: DevelopersResponseDTO) => setDevelopers(result.data))

    }
  }, [devId, query, type])


  return {developers}
}
