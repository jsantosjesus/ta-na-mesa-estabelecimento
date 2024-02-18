import { useEffect, useState } from "react";

export const SoundPlayer = ({ src, pedido }) => {
    const [audio] = useState(new Audio(src));

    // useEffect(() => {
    //     return () => {
    //         // Certifica de parar o áudio ao desmontar o componente
    //         audio.pause();
    //     };
    // }, [audio]);


    useEffect(() => {
        if (pedido.status == 'aguardando') {
            audio.currentTime = 0; // Garante que o som seja reiniciado mesmo se já estiver tocando
            audio.play();
        }
    }, [])

    return (
        <div
            style={{ display: 'none' }}
        >
            Play Sound
        </div>
    );
};