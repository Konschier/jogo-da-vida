import React from "react"


function Regras(){
    return(
        <div>
            <h1> Regras </h1>
            <p>
                O autómato celular bidimensional mais conhecido é o jogo da vida, inventado pelo matemático britânico John Horton Conway em 1970.<br/>
            O jogo da vida é um autómato celular que simula processos de evolução de células biológicas. Pode-se provar que é um autómato computacionalmente universal, ou seja, potencialmente seria capaz de simular qualquer sistema possível.
            As regras deste autómato são as seguintes: <br/>
            - Uma célula sobrevive (continua com um valor 1) e tem 2 ou 3 vizinhos vivos (com um valor 1). <br/>
            - Uma nova célula é criada num quadrado vazio (o seu valor passa de 0 a 1) se esse quadrado tem exactamente 3 vizinhos vivos. <br/>
            O jogo da vida em si consiste em escolher uma configuração inicial de células vivas tais que elas acabem por sobreviver. 
            </p>
        </div>
    )
}
export default Regras