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
export class PostAutomovil {
    constructor(data) {
        Object.assign(this, data);
        this.anio = 0;
        this.capacidad = 0;
        this.id_automovil = 0;
        this.marca = "";
        this.modelo = "";
        this.tipo = "";
    }
}
__decorate([
    Expose({ name: "id_automovil" }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], PostAutomovil.prototype, "id_automovil", void 0);
__decorate([
    Expose({ name: "marca" }),
    __metadata("design:type", String)
], PostAutomovil.prototype, "marca", void 0);
__decorate([
    Expose({ name: "modelo" }),
    __metadata("design:type", String)
], PostAutomovil.prototype, "modelo", void 0);
__decorate([
    Expose({ name: "año" }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], PostAutomovil.prototype, "anio", void 0);
__decorate([
    Expose({ name: "modelo" }),
    __metadata("design:type", String)
], PostAutomovil.prototype, "tipo", void 0);
__decorate([
    Expose({ name: "capacida" }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value))
            return value;
        else
            throw { status: 400, message: "Error en el id" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], PostAutomovil.prototype, "capacidad", void 0);
