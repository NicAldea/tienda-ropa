import { describe, it, expect } from "vitest";
import {
  validarCorreo, validarPassword, validarRegistro, validarRun, validarTexto,
} from "../utils/validators";

// Pruebas de lógica: funciones puras, sin renderizar componentes
describe("Validadores del formulario", () => {
  it("acepta RUN válidos según módulo 11 (incluido dígito K)", () => {
    expect(validarRun("123456785")).toBe("");
    expect(validarRun("111111111")).toBe("");
    expect(validarRun("10000013K")).toBe("");
  });

  it("rechaza RUN con dígito verificador incorrecto o mal formato", () => {
    expect(validarRun("123456789")).toBe("El RUN no es válido");
    expect(validarRun("12.345.678-5")).not.toBe("");
    expect(validarRun("123")).toBe("El RUN debe tener entre 7 y 9 caracteres");
    expect(validarRun("")).toBe("El RUN es obligatorio");
  });

  it("solo acepta correos de los dominios permitidos", () => {
    expect(validarCorreo("nico@duoc.cl")).toBe("");
    expect(validarCorreo("profe@profesor.duoc.cl")).toBe("");
    expect(validarCorreo("nico@gmail.com")).toBe("");
    expect(validarCorreo("nico@hotmail.com")).toContain("Solo se aceptan");
  });

  it("valida largo de contraseña entre 4 y 10 caracteres", () => {
    expect(validarPassword("abc")).not.toBe("");
    expect(validarPassword("abcd")).toBe("");
    expect(validarPassword("abcdefghijk")).not.toBe("");
  });

  it("valida largo máximo de textos", () => {
    expect(validarTexto("a".repeat(51), "El nombre", 50)).toBe("El nombre admite máximo 50 caracteres");
    expect(validarTexto("Nicolás", "El nombre", 50)).toBe("");
  });

  it("un registro completo y correcto no tiene errores", () => {
    const errores = validarRegistro({
      run: "123456785", nombre: "Nicolás", apellidos: "Aldea Fernández",
      correo: "nico@duoc.cl", password: "clave1", password2: "clave1",
      region: "Región Metropolitana de Santiago", comuna: "Quilicura", direccion: "Av. Siempre Viva 123",
    });
    expect(Object.values(errores).every((e) => e === "")).toBe(true);
  });
});
