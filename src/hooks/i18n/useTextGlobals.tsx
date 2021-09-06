import {useEffect, useState} from "react";
import { PtBR } from "../../@type/globals/text.globals";


export function useTextGlobals(locale: string | undefined) {
  const [texts, setTexts] = useState(PtBR);

  useEffect(() => {
    switch (locale) {
      case 'en-US': // Americam
      default: setTexts(PtBR)
    }
  }, [locale])

  return {texts}
}
