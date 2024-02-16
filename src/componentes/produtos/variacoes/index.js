import * as React from 'react';
import Accordion from '@mui/material/Accordion';
// import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CadastrarVariacao } from './cadastrarVariacao';

export default function Variacoes({ variacoes, handleSubmit }) {
    const [vari, setVari] = React.useState([]);
    const [acordionCadastro, setAcordionCadastro] = React.useState(false);

    React.useEffect(() => {
        if(variacoes){
            setVari(variacoes);
        }
    }, []);

    const salvarNovaVariacao = (objeto) => {
        const newData = [...vari, objeto];
        setVari(newData);
        handleSubmit(newData);
        setAcordionCadastro(false);
    }

    const salvarVariacao = (objeto, index) => {
        const newData = [...vari];
    
    newData[index] = { ...newData[index], nome: objeto.nome, minimo: objeto.minimo, maximo: objeto.maximo, opcoes: objeto.opcoes };
    
    setVari(newData);
    handleSubmit(newData);
    }

    return (
        <div>
            <button style={{marginBottom: '20px'}} className="botaoSalvarProduto" onClick={() => setAcordionCadastro(true)}>Cadastrar nova Variação</button>
            {acordionCadastro && <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='cadastro'
                    id='cadastro'
                >
                    <b>Cadastrar variação</b>
                </AccordionSummary>
                <AccordionDetails>
                    <CadastrarVariacao handleSubmit={salvarNovaVariacao}/>
                </AccordionDetails>
            </Accordion>}
            {vari && vari.map((variacao, index) => {
                return (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={variacao}
                            id={variacao}
                        >
                            <b>{variacao.nome}</b>
                        </AccordionSummary>
                        <AccordionDetails>
                            <CadastrarVariacao variacao={variacao} index={index} handleSubmit={salvarVariacao} />
                            <button onClick={() => console.log(vari)}></button>
                        </AccordionDetails>
                        {/* <AccordionActions>
                            <Button>Salvar</Button>
                        </AccordionActions> */}
                    </Accordion>
                )
            })}
        </div>
    );
}