import { useCallback, useState } from "react";
import moment from 'moment';
import { Developer } from "@/app/shered/types/response/developers";

export default function useDeveloperValidation() {
  const [ validationErrors, setValidationErrors ] = useState<Record<string, string | undefined>>({});

  const validateRequired = useCallback((value: string) => !!value.length, []);

  const validateEmail = useCallback((email: string) => {
    return !!email.length && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
  }, []);

  const validateDate = useCallback((date: string) => {
    return moment(date, 'YYYY-MM-DD', true).isValid();
  }, []);

  const validateNumber = useCallback((value: string) => {
    const numberValue = Number(value);
    return !isNaN(numberValue) && numberValue > 0;
  }, []);

  const validateDeveloper = useCallback((dev: Developer) => {
    const errors = {
      firstName: !validateRequired(dev.firstName) ? 'Nome é obrigatório' : '',
      lastName: !validateRequired(dev.lastName) ? 'Sobrenome é obrigatório' : '',
      age: !validateRequired(String(dev.age)) ? 'Idade é obrigatória' : !validateNumber(String(dev.age)) ?
        'Idade deve ser um número maior que zero' : '',
      birthDate: !validateDate(dev.birthDate) ? 'Formato de data inválido' : '',
      hobby: !validateRequired(dev.hobby) ? 'Hobby é obrigatório' : '',
      email: !validateEmail(dev.email) ? 'Formato de email incorreto' : '',
    };

    setValidationErrors(errors);
    return errors;
  }, [ validateRequired, validateEmail, validateDate, validateNumber ]);

  return { validationErrors, validateDeveloper, setValidationErrors };
}