import { createContext, ReactNode} from "react";


type ThemeContextProviderProps = {
  children: ReactNode;
}

export const ThemeContext = createContext({});

export function ThemeProvider(props: ThemeContextProviderProps) {


  return (
    <ThemeContext.Provider value={{}}>
      {props.children}
    </ThemeContext.Provider>
  )
}
