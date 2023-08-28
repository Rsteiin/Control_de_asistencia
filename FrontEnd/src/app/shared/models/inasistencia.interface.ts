import { RespuestaConsola } from "./consola.interface";

export interface InasisteciaRspuesta {
    consola: string;
    area: string;
    inasistencias: number;
    porcentaje: string;
  }

  export interface InasistenciaPayload{
    consolas: Array<RespuestaConsola>;
    usuario_id: number;
    turno: string;
  }
  