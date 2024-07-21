import { useEffect, useState } from "react";



const BuildHora = ({dataPedido}) => {

    const hora = dataPedido.toDate();

    const [now, setNow] = useState(new Date());


    useEffect(() => {

        const intervalo = setInterval(() => {
            setNow(new Date());
        }, 10000);

        return () => clearInterval(intervalo);
    })


    const differenceInHours = now.getHours() - hora.getHours();

    const wastoDay = hora.getDate() == now.getDate() &&
        hora.getMonth() == now.getMonth() &&
        hora.getFullYear == now.getFullYear;

    const wasNow = hora.getHours() == now.getHours() && hora.getMinutes() == now.getMinutes();

    let buildHora = '';

    if (!wastoDay) {
        buildHora = `ontem às ${hora.getHours()}:${hora.getMinutes()}`
    } else if (!wasNow) {
        const time =
            ((differenceInHours * 60) - hora.getMinutes()) + now.getMinutes();
        const plural = time > 1 ? 'minutos' : 'minuto';
        buildHora = `à ${time} ${plural}`;
    } else {
        buildHora = 'agora';
    }



    return (
        <p>
            {buildHora}
        </p>
    );
}
export default BuildHora;