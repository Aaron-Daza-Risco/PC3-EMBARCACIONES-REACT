import React, { useState, useEffect } from "react";
import { Embarcacion } from "../Embarcaciones";

interface EmbarcacionesFormularioProps {
    embarcacion?: Embarcacion | null;
    onGuardar: (embarcacion: Omit<Embarcacion, 'id'>) => void;
    onCancelar: () => void;
}

const EmbarcacionesFormulario: React.FC<EmbarcacionesFormularioProps> = ({ embarcacion, onGuardar, onCancelar }) => {
    const [nombre, setNombre] = useState<string>('');
    const [capacidad, setCapacidad] = useState<number>(0);
    const [descripcion, setDescripcion] = useState<string>('');
    const [fechaProgramada, setFechaProgramada] = useState<string>('');

    useEffect(() => {
        if (embarcacion) {
            setNombre(embarcacion.nombre);
            setCapacidad(embarcacion.capacidad);
            setDescripcion(embarcacion.descripcion);
            setFechaProgramada(embarcacion.fechaProgramada);
        } else {
            setNombre('');
            setCapacidad(0);
            setDescripcion('');
            setFechaProgramada('');
        }
    }, [embarcacion]);

    const handleGuardar = () => {
        onGuardar({
            nombre,
            capacidad,
            descripcion,
            fechaProgramada
        });
    };

    const handleCancelar = () => {
        setNombre('');
        setCapacidad(0);
        setDescripcion('');
        setFechaProgramada('');
        onCancelar();
    };

    return (
        <div>
            <label>Nombre</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <label>Capacidad</label>
            <input type="number" value={capacidad} onChange={(e) => setCapacidad(parseInt(e.target.value))} />
            <label>Descripcion</label>
            <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            <label>Fecha Programada</label>
            <input type="date" value={fechaProgramada} onChange={(e) => setFechaProgramada(e.target.value)} />
            <button onClick={handleGuardar}>Guardar</button>
            <button onClick={handleCancelar}>Cancelar</button>
        </div>
    );
};
export default EmbarcacionesFormulario;