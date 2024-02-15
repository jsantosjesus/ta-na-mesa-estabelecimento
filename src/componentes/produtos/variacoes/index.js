import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CadastrarVariacao } from './cadastrarVariacao';

export default function Variacoes({ variacoes }) {
    return (
        <div>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='cadastro'
                    id='cadastro'
                >
                    <b>Cadastrar variação</b>
                </AccordionSummary>
                <AccordionDetails>
                    <CadastrarVariacao />
                </AccordionDetails>
                {/* <AccordionActions>
                            <Button>Salvar</Button>
                        </AccordionActions> */}
            </Accordion>
            {variacoes && variacoes.map((variacao) => {
                return (
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={variacao}
                            id={variacao}
                        >
                            <b>{variacao.nome}</b>
                        </AccordionSummary>
                        <AccordionDetails>
                            <CadastrarVariacao variacao={variacao}/>
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