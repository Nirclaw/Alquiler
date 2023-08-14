import { Expose, Transform } from "class-transformer";

export class PostAlquier {

    @Expose({ name: "id_alquiler" })
    @Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true })
    id_alquiler: number
    @Expose({ name: "id_cliente" })
    @Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true })

    id_cliente: number
    @Expose({ name: "id_automovil" })
    @Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true })

    id_automovil: number
    @Expose({ name: "fecha_reserva" })
    @Transform(({ value }) => {

        if (/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/.test(value))
            return value;
        else throw { status: 400, message: "Error en los parametros, fecha debe ser AAAA-MM-DD" };
    }, { toClassOnly: true })
    fecha_reserva: string
    @Expose({ name: "fecha_inicio" })
    @Transform(({ value }) => {

        if (/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/.test(value))
            return value;
        else throw { status: 400, message: "Error en los parametros, fecha debe ser AAAA-MM-DD" };
    }, { toClassOnly: true })
    fecha_inicio: string
    @Expose({ name: "costo_total" })
    @Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true })
    costo_total: number

    @Expose({ name: "estado" })
    estado: string


    constructor(data: Partial<PostAlquier>) {
        Object.assign(this, data)
        this.costo_total = 0
        this.estado = ""
        this.fecha_inicio = ""
        this.fecha_reserva = ""
        this.id_alquiler = 0
        this.id_automovil = 0
        this.id_cliente = 0
    }

    alert(value) {
        let obj = value.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].propertyName
        const erroes = {
            id_automovil: { status: 401, message: "id del automovil es incorrecto" },
            id_cliente: { status: 401, message: "id del cliente es incorrecto" },
            id_alquiler: { status: 401, message: "id del alquiler es incorrecto" },
            id_reserva: { status: 401, message: "id de reserva es incorrecto" },
            fecha_reserva: { status: 400, message: "fecha reserva es incorrecta" },
            fecha_inicio: { status: 400, message: "fecha incio es incorrecta" },
            costo_total: { status: 400, message: "costo es incorrecta" },
            estado: { status: 400, message: "estado es incorrecto" }
        }
        let error = erroes[obj]
        return error
    }


}

