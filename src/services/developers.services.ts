import { DevelopersResponseDTO, DeveloperType } from "../@type/developers/developer.type";
import { RequestType } from "../@type/enums/enums";


const apiUrl = 'http://localhost:8080/api/developers';

export function fetchCreateDeveloper(developer: DeveloperType) {
  const query = new URLSearchParams();
  query.append('nome' ,developer.nome);
  query.append('idade', developer.idade);
  query.append('sexo', developer.sexo);
  query.append('hobby', developer.hobby);
  query.append('datanascimento', developer.datanascimento);

  return fetch(`${apiUrl}?${query}`, {method: RequestType.POST})
    .then((res) => res.json())
    .then((result: DevelopersResponseDTO) => result)
    .catch(err => err);
}

export function fetchAllDevelopers() {
  return fetch(`${apiUrl}?page=1`, {method: RequestType.GET})
    .then((res) => res.json())
    .then((result: DevelopersResponseDTO) => result)
    .catch(err => err)
}

export function fetchUpdateDeveloper(devId: string, developer: DeveloperType) {
  const query = new URLSearchParams();
  query.append('nome' ,developer.nome);
  query.append('idade', developer.idade);
  query.append('sexo', developer.sexo);
  query.append('hobby', developer.hobby);
  query.append('datanascimento', developer.datanascimento);

  return fetch(`${apiUrl}/${devId}?${query}`, {method: RequestType.PUT})
    .then((res) => res.json())
    .then((result: DevelopersResponseDTO) => result)
    .catch(err => err)
}

export function fetchDeleteDeveloper(devId: string) {
  return fetch(`${apiUrl}/${devId}`, {method: RequestType.DELETE})
    .then((res) => res.json())
    .then((result: DevelopersResponseDTO) => result)
    .catch(err => err)
}

export function fetchFilterDevelopers(developer: DeveloperType) {
  const query = new URLSearchParams();
  query.append('nome' ,developer.nome);
  query.append('idade', developer.idade);
  query.append('sexo', developer.sexo);
  query.append('hobby', developer.hobby);
  query.append('datanascimento', developer.datanascimento);

  return fetch(`${apiUrl}?${query}`, {method: RequestType.GET})
    .then((res) => res.json())
    .then((result: DevelopersResponseDTO) => result)
    .catch(err => err);
}

export function fetchPagesWithPageNumber(page: number) {
  return fetch(`${apiUrl}?page=${page}`, {method: RequestType.GET})
    .then((res) => res.json())
    .then((result: DevelopersResponseDTO) => result)
    .catch(err => err)
}

export function fetchPagesWithPageUrl(pageUrl: string) {
  return fetch(`${pageUrl}`, {method: RequestType.GET})
    .then((res) => res.json())
    .then((result: DevelopersResponseDTO) => result)
    .catch(err => err)
}
