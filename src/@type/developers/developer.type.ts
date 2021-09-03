export type DeveloperType = {
  id?: string;
  nome: string,
  idade: string,
  sexo: string,
  hobby: string,
  datanascimento: string
}

export type ResponseBody = {
  current_page: number,
  first_page_url: string,
  last_page_url: string,
  next_page_url: string,
  last_page: number,
  total: number,
  data: Array<DeveloperType> | undefined,
}

export type DevelopersResponseDTO = {
  code: number,
  message: Array<string>,
  body: ResponseBody
}

