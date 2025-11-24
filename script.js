document.addEventListener('DOMContentLoaded', () => {
    
    const modeNlToCpcBtn = document.getElementById('modo-nl-para-cpc');
    const modeCpcToNlBtn = document.getElementById('modo-cpc-para-nl');
    const nlToCpcSection = document.getElementById('conversao-nl-para-cp');
    const cpcToNlSection = document.getElementById('conversao-cpc-para-nl');

    const translateNlToCpcBtn = document.getElementById('traducao-nl-para-cp');
    const translateCpcToNlBtn = document.getElementById('traducao-cpc-para-nl');

    const nlInput = document.getElementById('entrada-nl');
    const cpcOutput = document.getElementById('saida-cpc');
    const cpcInput = document.getElementById('entrada-cpc');
    const nlOutput = document.getElementById('saida-nl');

    const propP = document.getElementById('prop-P');
    const propQ = document.getElementById('prop-Q');
    const propR = document.getElementById('prop-R');

   

    function getPropositions() {
       
        return {
            'P': propP.value.trim(),
            'Q': propQ.value.trim(),
            'R': propR.value.trim(),
        };
    }

    function normalizeText(text) {
 
        return text.toLowerCase()
                   .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ")
                   .replace(/\s{2,}/g," ")
                   .trim();
    }

   

    function switchMode(mode) {
        if (mode === 'NL_TO_CPC') {
            modeNlToCpcBtn.classList.add('ativo');
            modeCpcToNlBtn.classList.remove('ativo');
            nlToCpcSection.classList.remove('hidden');
            cpcToNlSection.classList.add('hidden');
        } else {
            modeCpcToNlBtn.classList.add('ativo');
            modeNlToCpcBtn.classList.remove('ativo');
            nlToCpcSection.classList.add('hidden');
            cpcToNlSection.classList.remove('hidden');
        }
    }

    modeNlToCpcBtn.addEventListener('click', () => switchMode('NL_TO_CPC'));
    modeCpcToNlBtn.addEventListener('click', () => switchMode('CPC_TO_NL'));



    const connectivesMap = {

        'se e somente se': '↔',
        'se somente se': '↔',
        'implica que': '→',
        'então': 'ENTAO_MARCADOR', 
        'se': 'SE_MARCADOR', 
        'ou': '∨',
        'e': '∧',
        'não': '¬',
        'nao': '¬',
    };

    function translateNlToCpc() {
        let text = normalizeText(nlInput.value);
        const propositions = getPropositions();
        let cpcFormula = text;

     
        const propEntries = Object.entries(propositions).filter(([, meaning]) => meaning.length > 0);
        propEntries.sort(([, a], [, b]) => b.length - a.length); 

        propEntries.forEach(([letter, meaning]) => {
            const normalizedMeaning = normalizeText(meaning);
          
            const regex = new RegExp(`\\b${normalizedMeaning}\\b`, 'g');
            cpcFormula = cpcFormula.replace(regex, letter);
        });

   
        Object.entries(connectivesMap).forEach(([nl, cpc]) => {
            const regex = new RegExp(`\\b${nl}\\b`, 'g');
            cpcFormula = cpcFormula.replace(regex, ` ${cpc} `);
        });

   
        cpcFormula = cpcFormula.replace(/SE_MARCADOR\s*(.*?)\s*ENTAO_MARCADOR/g, '($1) →');
        
       
        cpcFormula = cpcFormula.replace(/SE_MARCADOR|ENTAO_MARCADOR/g, '');

        
        cpcFormula = cpcFormula.replace(/\s{2,}/g, ' ').trim();
        cpcFormula = cpcFormula.replace(/(\s*→\s*)/g, ' → ');
        cpcFormula = cpcFormula.replace(/(\s*↔\s*)/g, ' ↔ ');
        cpcFormula = cpcFormula.replace(/(\s*∧\s*)/g, ' ∧ ');
        cpcFormula = cpcFormula.replace(/(\s*∨\s*)/g, ' ∨ ');
        cpcFormula = cpcFormula.replace(/(\s*¬\s*)/g, '¬'); 

        cpcOutput.textContent = cpcFormula.toUpperCase();
    }

    translateNlToCpcBtn.addEventListener('click', translateNlToCpc);

    function translateCpcToNl() {
        let formula = cpcInput.value.toUpperCase().trim();
        const propositions = getPropositions();
        let nlPhrase = formula;

    
        const propEntries = Object.entries(propositions).filter(([, meaning]) => meaning.length > 0);
        propEntries.sort(([, a], [, b]) => b.length - a.length);

        propEntries.forEach(([letter, meaning]) => {
    
            const regex = new RegExp(`\\b${letter}\\b`, 'g');
            nlPhrase = nlPhrase.replace(regex, meaning);
        });

    
        const cpcToNlMap = {
            '↔': ' se e somente se ',
            '→': ' então ',
            '∧': ' e ',
            '∨': ' ou ',
            '¬': 'não ',
        };

        Object.entries(cpcToNlMap).forEach(([cpc, nl]) => {

            const escapedCpc = cpc.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const regex = new RegExp(escapedCpc, 'g');
            nlPhrase = nlPhrase.replace(regex, nl);
        });

        nlPhrase = nlPhrase.replace(/[()]/g, ' ');
        nlPhrase = nlPhrase.replace(/\s{2,}/g, ' ').trim();
        
        if (formula.includes('→') && !nlPhrase.toLowerCase().startsWith('se')) {
             nlPhrase = 'Se ' + nlPhrase;
        }

        if (nlPhrase.length > 0) {
            nlPhrase = nlPhrase.charAt(0).toUpperCase() + nlPhrase.slice(1);
            if (!/[.!?]$/.test(nlPhrase)) {
                nlPhrase += '.';
            }
        }

        nlOutput.textContent = nlPhrase;
    }

    translateCpcToNlBtn.addEventListener('click', translateCpcToNl);
});
