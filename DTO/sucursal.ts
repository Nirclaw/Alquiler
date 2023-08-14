import { Expose, Transform } from "class-transformer";

export class PostSucursal {
    @Expose({ name: "id_sucursal" })
    @Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true })
    id_sucursal: number;
    @Expose({ name: "nombre" })
    @Transform(({ value }) => {
        if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en el nombre" };
    }, { toClassOnly: true })
    nombre: string
    @Expose({ name: "direccion" })
    direccion: string
    @Expose({ name: "telefono" })
    telefono: number;


    constructor(data: Partial<PostSucursal>) {
        Object.assign(this, data)
        this.nombre = ""
        this.id_sucursal = 0
        this.direccion = ""
        this.telefono = 0
    }
    alert(value) {
        let obj = value.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].propertyName
        const erroes = {
            id_sucursal:{status:401,message:"id del sucursal es incorrecto"},
            nombre:{status:401,message:"nombre del sucursal es incorrecto"},
            telefono:{status:401,message:"telefono del clientes es incorrecto"},
            direccion:{status:401,message:"direccion del clientes es incorrecto"},
        }
        let error = erroes[obj]
        return error
    }
}