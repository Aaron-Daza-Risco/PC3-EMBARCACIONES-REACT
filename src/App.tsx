import React, { useState, useEffect } from "react";
import { Embarcacion } from "./Embarcaciones";
import EmbarcacionesTabla from "./componentes/EmbarcacionesTabla";
import EmbarcacionesFormulario  from "./componentes/EmbarcacionesFormulario";
import axios from "axios";

const App: React.FC = () => {
    const [embarcaciones, setEmbarcaciones] = useState<Embarcacion[]>([]);
    const [embarcacionSeleccionada, setEmbarcacionSeleccionada] = useState<Embarcacion | null>(null);

    useEffect(() => {
        axios.get<Embarcacion[]>('/api/embarcaciones')
            .then(response => {
                setEmbarcaciones(response.data);
            });
    }, []);

    const handleGuardar = (embarcacion: Omit<Embarcacion, 'id'>) => {
        if (embarcacionSeleccionada) {
            axios.put(`/api/embarcaciones/${embarcacionSeleccionada.id}`, embarcacion)
                .then(() => {
                    setEmbarcacionSeleccionada(null);
                    setEmbarcaciones(embarcaciones.map(e => e.id === embarcacionSeleccionada.id ? { ...embarcacion, id: e.id } : e));
                });
        } else {
            axios.post<Embarcacion>('/api/embarcaciones', embarcacion)
                .then(response => {
                    setEmbarcaciones([...embarcaciones, response.data]);
                });
        }
    };

    const handleEditar = (embarcacion: Embarcacion) => {
        setEmbarcacionSeleccionada(embarcacion);
    };

    const handleCancelar = () => {
        setEmbarcacionSeleccionada(null);
    };

    const handleEliminar = (id: number) => {
        axios.delete(`/api/embarcaciones/${id}`)
            .then(() => {
                setEmbarcaciones(embarcaciones.filter(e => e.id !== id));
            });
    };

    return (
        <div>
            <h1>Embarcaciones</h1>
            <EmbarcacionesFormulario embarcacion={embarcacionSeleccionada} onGuardar={handleGuardar} onCancelar={handleCancelar} />
            <EmbarcacionesTabla embarcaciones={embarcaciones} onEditar={handleEditar} onEliminar={handleEliminar} />
        </div>
    );
};
export default App;