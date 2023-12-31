export type Roles = 'ADMINISTRADOR' |'AGENTE' | null;
export type Zonal = 'QUITO' | null;
export type Area = 'VIDEOVIGILANCIA' | 'DESPACHO' | null;

export interface Usuario{
    usuario: string;
    contrasena: string;
} 

export interface RespuestaUsuario{
    usuario_id: number;
    nombre: string;
    apellido: string;
    usuario:string;
    zonal: Zonal;
    rol:Roles;
    turno: string;
    area: Area;
    accessToken: string
}

export interface Usuario {
    usuario_id: number;
    nombre: string;
    segundo_nombre: string;
    apellido: string;
    segundo_apellido: string;
    correo: string;
    estado: number;
    zonal: string;
    rol: string;
    turno: string;
    grupo: string;
}

export interface RespuestaUsuarios{
    success: boolean,
    usuarios: Array<Usuario>,
    total: number
}