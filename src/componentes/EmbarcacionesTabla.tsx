import React from "react";
import { Embarcacion } from "../Embarcaciones";

interface EmbarcacionesTablaProps {
    embarcaciones: Embarcacion[];
    onEditar: (embarcacion: Embarcacion) => void;
    onEliminar: (id: number) => void;
}

const EmbarcacionesTabla: React.FC<EmbarcacionesTablaProps> = ({embarcaciones, onEditar, onEliminar}) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Capacidad</th>
                    <th>Descripcion</th>
                    <th>Fecha Programada</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {embarcaciones.map(embarcacion => (
                    <tr key={embarcacion.id}>
                        <td>{embarcacion.nombre}</td>
                        <td>{embarcacion.capacidad}</td>
                        <td>{embarcacion.descripcion}</td>
                        <td>{embarcacion.fechaProgramada}</td>
                        <td>
                            <button onClick={() => onEditar(embarcacion)}>Editar</button>
                            <button onClick={() => onEliminar(embarcacion.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
export default EmbarcacionesTabla;