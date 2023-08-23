export type Roles = 'ADMINISTRADOR' |'OPERADOR'|'VIDEOVIGILANCIA' | null;
export type Zonal = 'QUITO-VIDEO' | 'QUITO-DESPACHO'| null;

export interface Usuario{
    usuario: string;
    contrasena: string;
} 

export interface RespuestaUsuario{
    usuario_id: string;
    nombre: string;
    apellido: string;
    usuario:string;
    zonal: Zonal;
    rol:Roles;
    accessToken: string
}