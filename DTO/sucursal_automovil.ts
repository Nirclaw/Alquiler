import { Expose, Transform } from "class-transformer";

export class postSucursalAutos {
    @Expose({ name: "id_sucursal" })
    @Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true })
    id_sucursal: number
    @Expose({ name: "id_auto" })
    @Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true })
    id_automovil: number
    @Expose({ name: "cant_disponible" })
    @Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true })
    cantidad_Disponible: number

    constructor(data: Partial<postSucursalAutos>) {
        Object.assign(this, data)
        this.cantidad_Disponible = 0
        this.id_automovil = 0
        this.id_sucursal = 0
    }


    errores(value){
        let obj = value.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].propertyName
        const erroes = {
            id_sucursal:{status:401,message:"id del sucursal sucursal es incorrecto"},
            id_automovil:{status:401,message:"id  del sucursal automovil es incorrecto"},
            cantidad_Disponible:{status:401,message:"cantidad es incorrecto"},
        }
        let error = erroes[obj]
        return error
    }

}