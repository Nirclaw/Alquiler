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
export class postSucursalAutos {
    constructor(data) {
        Object.assign(this, data);
        this.cantidad_Disponible = 0;
        this.id_automovil = 0;
        this.id_sucursal = 0;
    }
    errores(value) {
        let obj = value.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0].propertyName;
        const erroes = {
            id_sucursal: { status: 401, message: "id del sucursal sucursal es incorrecto" },
            id_automovil: { status: 401, message: "id  del sucursal automovil es incorrecto" },
            cantidad_Disponible: { status: 401, message: "cantidad es incorrecto" },
        };
        let error = erroes[obj];
        return error;
    }
}
__decorate([
    Expose({ name: "id_sucursal" }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], postSucursalAutos.prototype, "id_sucursal", void 0);
__decorate([
    Expose({ name: "id_auto" }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], postSucursalAutos.prototype, "id_automovil", void 0);
__decorate([
    Expose({ name: "cant_disponible" }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], postSucursalAutos.prototype, "cantidad_Disponible", void 0);
