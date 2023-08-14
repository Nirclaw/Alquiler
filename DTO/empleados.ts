import { Expose, Transform } from "class-transformer";

export class PostEmpleado {
    @Expose({ name: "id_empleado" })
    @Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true })
    id_empleado: number
    @Expose({ name: "nombre" })
    @Transform(({ value }) => {
        if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en el nombre" };
    }, { toClassOnly: true })
    nombre: string
    @Expose({ name: "apellido" })
    @Transform(({ value }) => {
        if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en el apellido" };
    }, { toClassOnly: true })
    apellido: string
    @Expose({ name: "cc" })
    @Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en la cedula" };
    }, { toClassOnly: true })
    dni: number
    @Expose({ name: "direccion" })
    direccion: string
    @Expose({ name: "telefono" })
    telefono: number
    @Expose({ name: "cargo" })
    @Transform(({ value }) => {
        if (/\S+@\S+.\S+/.test(value))
            return value;
        else throw { status: 400, message: "El correo no cumple con los parametros de entrada" }
    }, { toClassOnly: true })
    cargo: string

    constructor(data: Partial<PostEmpleado>) {
        Object.assign(this, data)
        Object.assign(this, data)
        this.nombre = ""
        this.apellido = ""
        this.id_empleado = 0
        this.telefono = 0
        this.direccion = ""
        this.cargo = ""
    }
}