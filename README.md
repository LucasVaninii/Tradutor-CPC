Projeto Realizado pelos Alunos da Uni-FACEF:

-Lucas Vanini Pinheiro / 26247 / Ciência da Computação 

-Pedro Telini / 26351 / Sistema de Informação

-Gabriel Carrijo /  / Sistema de Informação 

Link de Acesso : https://lucasvaninii.github.io/Tradutor-CPC/

- Desenho da arquitetura do sistema e explicação de funcionamento.

<img width="906" height="306" alt="image" src="https://github.com/user-attachments/assets/df8dafde-dd19-47a2-8f3e-fd1df6f9826a" />

Em uma breve explicação, nosso projeto ao ser inicializado o usuário pode selecionar as três proposições e a função getPropositions() captura esses valores, após esse processo o usuário vai selecionar qual a opção de tradução ele gostaria: 
NL → CPC
CPC → NL
Após selecionar e informar os dados, basta o usuáriuo selecionar a opção "Traduzir" e o sistema vai gerar a trdução conforme os correspondestes passo:

Tradução NL → CPC:
1. Usuário insere uma frase em português.
2. O texto é normalizado (minúsculas, remoção de pontuação).
3.O sistema aplica substituições baseadas em regras:
4. proposições → letras (P, Q, R)
5. conectivos → símbolos (∧, ∨, ¬, →, ↔)
6. Tratamento especial para “Se … então …”.
7. O resultado é exibido.

Tradução CPC → NL
1. Usuário insere uma fórmula lógica.
2. Símbolos lógicos são convertidos para conectivos em texto.
3. Proposições são substituídas por seus significados definidos pelo usuário.
4. Texto é capitalizado e formatado.
5. Resultado exibido no campo de saída.


- Estratégia de tradução:

A estratégia utilizada pelo sistema consiste em aplicar um conjunto de regras diretas que fazem a correspondência entre expressões da linguagem natural e elementos da lógica proposicional.
Para NL → CPC, o foco está em identificar conectivos e proposições dentro do texto do usuário, substituindo-os pelos símbolos formais.

Para CPC → NL, o processo é o inverso: cada símbolo lógico é traduzido para sua expressão correspondente em português, enquanto as proposições recebem os significados definidos no início.
O sistema mantém um fluxo simples e previsível, garantindo que cada etapa da tradução ocorra de forma clara, mantendo a coerência entre as duas representações.


- Discussão sobre limitações e possibilidades de melhoria

Atualmente, o sistema depende principalmente de substituições baseadas em regras fixas, o que funciona bem para frases simples, mas pode gerar erros em frases mais complexas ou com múltiplas interpretações. Também existe limitação no reconhecimento automático de proposições, já que o usuário precisa defini-las manualmente no início. Outro ponto é que foi nescessario algum auxilio externo para o funcionamento correto do script.js.

Como possibilidades de melhoria, o sistema poderia incorporar técnicas de processamento de linguagem natural para identificar proposições automaticamente, melhorar a detecção de conectivos e tratar variações de estrutura de frases. Outra evolução possível seria integrar modelos de linguagem para auxiliar na análise semântica, aumentando a precisão das traduções. Além disso, a interface poderia oferecer sugestões automáticas e validação da fórmula lógica antes de exibir o resultado final.


- Vídeo de demonstração do projeto

Link: 
