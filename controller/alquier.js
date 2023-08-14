var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from "class-transformer";
export class PostAlquier {
    constructor(data) {
        Object.assign(this, data);
        this.costo_total = 0;
        this.estado = "";
        this.fecha_inicio = "";
        this.fecha_reserva = "";
        this.id_alquiler = 0;
        this.id_automovil = 0;
        this.id_cliente = 0;
    }
    alert(value) {
        let obj = value.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].propertyName;
        const erroes = {
            id_automovil: { status: 401, message: "id del automovil es incorrecto" },
            id_cliente: { status: 401, message: "id del cliente es incorrecto" },
            id_alquiler: { status: 401, message: "id del alquiler es incorrecto" },
            id_reserva: { status: 401, message: "id de reserva es incorrecto" },
            fecha_reserva: { status: 400, message: "fecha reserva es incorrecta" },
            fecha_inicio: { status: 400, message: "fecha incio es incorrecta" },
            costo_total: { status: 400, message: "costo es incorrecta" },
            estado: { status: 400, message: "estado es incorrecto" }
        };
        let error = erroes[obj];
        return error;
    }
}
__decorate([
    Expose({ name: "id_alquiler" }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], PostAlquier.prototype, "id_alquiler", void 0);
__decorate([
    Expose({ name: "id_cliente" }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], PostAlquier.prototype, "id_cliente", void 0);
__decorate([
    Expose({ name: "id_automovil" }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], PostAlquier.prototype, "id_automovil", void 0);
__decorate([
    Expose({ name: "fecha_reserva" }),
    Transform(({ value }) => {
        if (/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en los parametros, fecha debe ser AAAA-MM-DD" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], PostAlquier.prototype, "fecha_reserva", void 0);
__decorate([
    Expose({ name: "fecha_inicio" }),
    Transform(({ value }) => {
        if (/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en los parametros, fecha debe ser AAAA-MM-DD" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], PostAlquier.prototype, "fecha_inicio", void 0);
__decorate([
    Expose({ name: "costo_total" }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], PostAlquier.prototype, "costo_total", void 0);
__decorate([
    Expose({ name: "estado" }),
    __metadata("design:type", String)
], PostAlquier.prototype, "estado", void 0);
