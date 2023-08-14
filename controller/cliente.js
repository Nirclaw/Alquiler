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
import { IsDefined } from "class-validator";
export class GetCliente {
    constructor(id) {
        this.id = id;
    }
}
__decorate([
    Expose({ name: "id" }),
    IsDefined({ message: () => { throw { status: 422, message: "La cedula del cliente es obligatoria" }; } }),
    __metadata("design:type", Number)
], GetCliente.prototype, "id", void 0);
export class PostCliente {
    constructor(data) {
        Object.assign(this, data);
        this.nombre = "";
        this.apellido = "";
        this.id_cliente = 0;
        this.telefono = 0;
        this.direccion = "";
        this.email = "";
    }
    alert(value) {
        let obj = value.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].propertyName;
        const erroes = {
            id_cliente: { status: 401, message: "id del cliente es incorrecto" },
            nombre: { status: 401, message: "nombre del cliente es incorrecto" },
            apellido: { status: 401, message: "apellido del cliente es incorrecto" },
            telefono: { status: 401, message: "telefono del clientes es incorrecto" },
            direccion: { status: 401, message: "direccion del clientes es incorrecto" },
            email: { status: 401, message: "email es del clientes es incorrecto" },
            dni: { status: 400, message: "cc del cliente es incorrecto" }
        };
        let error = erroes[obj];
        return error;
    }
}
__decorate([
    Expose({ name: "id" }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], PostCliente.prototype, "id_cliente", void 0);
__decorate([
    Expose({ name: "nombre" }),
    Transform(({ value }) => {
        if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en el nombre" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], PostCliente.prototype, "nombre", void 0);
__decorate([
    Expose({ name: "apellido" }),
    Transform(({ value }) => {
        if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en el apellido" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], PostCliente.prototype, "apellido", void 0);
__decorate([
    Expose({ name: "cc" }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en la cedula" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], PostCliente.prototype, "dni", void 0);
__decorate([
    Expose({ name: "direccion" }),
    __metadata("design:type", String)
], PostCliente.prototype, "direccion", void 0);
__decorate([
    Expose({ name: "telefono" }),
    __metadata("design:type", Number)
], PostCliente.prototype, "telefono", void 0);
__decorate([
    Expose({ name: "email" }),
    Transform(({ value }) => {
        if (/\S+@\S+.\S+/.test(value))
            return value;
        else
            throw { status: 400, message: "El correo no cumple con los parametros de entrada" };
    }, { toClassOnly: true }),
    __metadata("design:type", String)
], PostCliente.prototype, "email", void 0);
