import { Employee } from "./employee"

export interface Activities {
    codigo: number
    descripcion: string
    estado: string
    fecha_creado: Date
    fecha_ejecucion: Date
    empleado: Employee
}