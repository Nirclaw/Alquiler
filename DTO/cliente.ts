import { Expose, Transform } from "class-transformer";
import { IsDefined } from "class-validator";

export class GetCliente {
    @Expose({ name: "id" })
    @IsDefined({ message: () => { throw { status: 422, message: "La cedula del cliente es obligatoria" } } })
    id: number;

    constructor(id: number) {
        this.id = id
    }
}





export class PostCliente {

    @Expose({ name: "id" })
    @Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true })
    id_cliente: number;


    @Expose({ name: "nombre" })
    @Transform(({ value }) => {
        if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en el nombre" };
    }, { toClassOnly: true })
    nombre: string;
    @Expose({ name: "apellido" })
    @Transform(({ value }) => {
        if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en el apellido" };
    }, { toClassOnly: true })
    apellido: string;
    @Expose({ name: "cc" })
    @Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en la cedula" };
    }, { toClassOnly: true })
    dni: number;
    @Expose({ name: "direccion" })
    direccion: string;
    @Expose({ name: "telefono" })
    telefono: number;
    @Expose({ name: "email" })
    @Transform(({ value }) => {
        if (/\S+@\S+.\S+/.test(value))
            return value;
        else throw { status: 400, message: "El correo no cumple con los parametros de entrada" }
    }, { toClassOnly: true })
    email: string;


    constructor(data: Partial<PostCliente>) {
        Object.assign(this, data)
        this.nombre = ""
        this.apellido = ""
        this.id_cliente = 0
        this.telefono = 0
        this.direccion = ""
        this.email = ""
    }

    alert(value) {
        let obj = value.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].propertyName
        const erroes = {
            id_cliente:{status:401,message:"id del cliente es incorrecto"},
            nombre:{status:401,message:"nombre del cliente es incorrecto"},
            apellido:{status:401,message:"apellido del cliente es incorrecto"},
            telefono:{status:401,message:"telefono del clientes es incorrecto"},
            direccion:{status:401,message:"direccion del clientes es incorrecto"},
            email:{status:401,message:"email es del clientes es incorrecto"},
            dni:{status:400,message:"cc del cliente es incorrecto"}
        }
        let error = erroes[obj]
        return error
    }


}