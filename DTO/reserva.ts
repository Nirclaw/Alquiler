import { Expose, Transform } from "class-transformer";

export class PostReserva {

    @Expose({ name: "id_reserva" })
    @Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true })

    id_reserva: number
    @Expose({ name: "id_cliente" })
    @Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true })

    id_cliente: number

    @Expose({ name: "id_auto" })
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

    @Expose({ name: "fecha_fin" })
    @Transform(({ value }) => {

        if (/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/.test(value))
            return value;
        else throw { status: 400, message: "Error en los parametros, fecha debe ser AAAA-MM-DD" };
    }, { toClassOnly: true })

    fecha_fin: string

    @Expose({ name: "estado" })
    estado: string

    constructor(data: Partial<PostReserva>) {
        Object.assign(this, data)
        this.estado = ""
        this.fecha_fin = ""
        this.fecha_inicio = ""
        this.fecha_reserva = ""
        this.id_cliente = 0
        this.id_reserva = 0


    }

    alert(value) {
        let obj = value.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].propertyName
        const erroes = {
            id_cliente: { status: 401, message: "id del cliente es incorrecto" },
            id_reserva: { status: 401, message: "id de reserva es incorrecto" },
            fecha_reserva: { status: 400, message: "fecha reserva es incorrecta" },
            fecha_inicio: { status: 400, message: "fecha incio es incorrecta" },
            fecha_fin: { status: 400, message: "fecha inicio es incorrecta" },
            estado: { status: 400, message: "estado es incorrecto" }
        }
        let error = erroes[obj]
        return error
    }




}