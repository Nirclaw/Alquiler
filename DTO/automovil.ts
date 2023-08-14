import { Expose, Transform } from "class-transformer"

export class PostAutomovil {
    @Expose({ name: "id_automovil" })
    @Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true })
    id_automovil: number
    @Expose({ name: "marca" })
    marca: string
    @Expose({ name: "modelo" })
    modelo: string
    @Expose({ name: "año" })
    @Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true })
    anio: number
    @Expose({ name: "modelo" })
    tipo: string
    @Expose({ name: "capacida" })
    @Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true })
    capacidad: number

    constructor(data: Partial<PostAutomovil>) {

        Object.assign(this, data)

        this.anio = 0
        this.capacidad = 0
        this.id_automovil = 0
        this.marca = ""
        this.modelo = ""
        this.tipo = ""


    }


    
}