import { NestedKeys } from "../customTable/interfaces/table.interface";


export const getPropertie = <T>(objeto: T, key: NestedKeys<T>): any=>{
  const partes = key.split('.');
  const [primeraParte, ...resto] = partes;
  if (objeto && typeof objeto === 'object' && primeraParte in objeto) {
      const siguienteObjeto = objeto[primeraParte as keyof T];
      if (resto.length === 0) {
          return siguienteObjeto;
      } else {
          const nuevaClave = resto.join('.') as NestedKeys<typeof siguienteObjeto>;
          return getPropertie(siguienteObjeto, nuevaClave);
      }
  } else {
      return undefined;
  }
}
