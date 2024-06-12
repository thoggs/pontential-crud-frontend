import { useCallback, useState } from "react";
import { Developer } from "@/app/shered/types/response/developers";
import moment from 'moment';

export default function useDeveloperValidation() {
  const [ validationErrors, setValidationErrors ] = useState<Record<string, string | undefined>>({});

  const validateRequired = useCallback((value: string) => !!value.length, []);

  const validateEmail = useCallback((email: string) => {
    return !!email.length && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
  }, []);

  const validateDate = useCallback((date: string) => {
    return moment(date, 'YYYY-MM-DD', true).isValid();
  }, []);

  const validateDeveloper = useCallback((dev: Developer) => {
    const errors = {
      firstName: !validateRequired(dev.firstName) ? 'Nome é obrigatório' : '',
      lastName: !validateRequired(dev.lastName) ? 'Sobrenome é obrigatório' : '',
      age: !validateRequired(String(dev.age)) ? 'Idade é obrigatória' : '',
      birthDate: !validateDate(dev.birthDate) ? 'Formato de data inválido' : '',
      hobby: !validateRequired(dev.hobby) ? 'Hobby é obrigatório' : '',
      email: !validateEmail(dev.email) ? 'Formato de email incorreto' : '',
    };

    setValidationErrors(errors);
    return errors;
  }, [ validateRequired, validateEmail, validateDate ]);

  return { validationErrors, validateDeveloper, setValidationErrors };
}
