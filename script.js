
// Constants
const CATEGORIES = [
    { 
        id: 1, 
        name: 'Examen général', 
        symptoms: [
            'Bon état général',
            'GSC 15',
            'Constantes normales',
            'Pas de signe de gravité',
            'Pas de signe de déshydratation',
            'Tonique, joue, sourit',
            'Mange bien, boit bien',
        ]
    },
    { 
        id: 2, 
        name: 'Cardio', 
        symptoms: [
            'Pas de douleur thoracique',
            'Bruits du cœur réguliers',
            'Pas de signe d\'insuffisance cardiaque droite',
            'Pas de signe d\'insuffisance cardiaque gauche',
            'Pas de souffle',
            'Pouls perçus',
            'ECG = RSR, Pas de trouble de repo. ni de cond.',
            'ECG comparable au tracé de référence'
        ]
    },
    {
        id: 3,
        name: 'Pneumo',
        symptoms: [
            'Eupnéique',
            'MV +/+',
            'Pas de toux',
            'Pas de crépitant',
            'Pas de sibilant',
            'Pas d\'expectoration',
            'Pas d\'hémoptysie'
        ]
    },
    {
        id: 4,
        name: 'Neuro',
        symptoms: [
            'Pas de trouble du comportement',
            'RPM symétriques et consensuels',
            'Paires crâniennes normales',
            'Pas de déficit sensitif',
            'Pas de déficit moteur',
            'Pas de syndrome méningé',
            'Pas de syndrome cérébelleux',
            'Pas de syndrome vestibulaire',
            'ROT +/+'
        ]
    },
    {
        id: 5,
        name: 'Abdo',
        symptoms: [
            'Abdomen souple dépressible indolore',
            'Pas de défense',
            'Pas de contracture',
            'Pas de méléna',
            'Pas d\'hématémèse',
            'Orifices herniaires libres',
            'Pas de vomissement',
            'Pas de trouble du transit'
        ]
    },
    {
        id: 6,
        name: 'Uro',
        symptoms: [
            'Pas de brûlure mictionnelle',
            'Pas de pollakiurie',
            'Pas d\'hématurie',
            'Fosses lombaires libres',
            'Pas de globe',
            'Testicules de taille normale pour l\'âge', 
            'Testucules plapés'
        ]
    },
    {
        id: 7,
        name: 'Gyneco',
        symptoms: [
            'Pas de méno-métrorragie',
            'Règles régulières et d\'abondance normale',
            'Pas de leucorrhée',
            'Pas de grossesse en cours déclarée'
        ]
    },
    {
        id: 8,
        name: 'Traumato',
        symptoms: [
            'Marche sans aide',
            'Pas de plaie',
            'Pas d\'hématome',
            'Pas de déformation',
            'Pas de douleur à la palpation des articulations adjacentes',
            'Pas d\'impotence fonctionnelle'
        ]
    },
    {
        id: 9,
        name: 'Psy',
        symptoms: [
            'Pas d\'idées noires',
            'Pas de délire',
            'Pas d\'agitation',
            'Risque suicidaire faible'
        ]
    },
    {
        id: 10,
        name: 'ORL',
        symptoms: [
            'Pas d\'angine',
            'Pas d\'ADP',
            'Pas d\'OMA',
            'Tympans vus non perforés',
            'Streptatest positif',
            'Streptatest négatif'
        ]
    },
    {
        id: 11,
        name: 'Cutané',
        symptoms: [
            'Pas de purpura',
            'Pas de prurit',
            'Pas d\'exanthème',
            'Pas d\'énanthème'
        ]
    }
];

const FAVORITES = {
    'examen-normal': `Examen général:
- Bon état général
- Constantes normales
- Pas de signe de gravité
Cardio:
- Pas de douleur thoracique
- Bruits du cœur réguliers
- Pas de signe d'insuffisance cardiaque
Pneumo:
- Eupnéique
- MV +/+
- Pas de BSA
Neuro:
- Pas de DSM
- Pas de syndrome méningé
Abdo:
- Abdomen souple dépressible indolore
- Pas de défense
- Pas de trouble du transit`,
    'angine-strepta-plus': `- Mal de gorge
- Dysphagie
- Fièvre
- Adénopathies cervicales sensibles
Examen de la gorge :
- Amygdales hypertrophiées
- Érythème pharyngé
- Exsudat blanchâtre sur les amygdales

Streptatest : Positif`,
    'angine-strepta-minus': `- Mal de gorge
- Dysphagie
- Fièvre
- Adénopathies cervicales sensibles
Examen de la gorge :
- Amygdales hypertrophiées
- Érythème pharyngé
- Exsudat blanchâtre sur les amygdales

Streptatest : Négatif`,
    'cystite': `- Brûlure mictionnelle
- Pollakiurie
- Hématurie
- Apyrétique
- Fosse lombaire libre
- Pas de globe`,
    'deces': `- Identité du patient verifiée
- Absence de ventilation spontanée
- Pupilles en mydriase et aréactives
- Bdc inaudibles
- Pas de pouls
- Rigidité cadavérique`,
    'gastro': `Diarrhée, nausée, vomissements

Examen général:
- Bon état général
- Pas de signe de déshydratation
Abdo:
- Abdomen souple dépressible, sensible dans son ensemble
- Pas de défense
- Pas de contracture`,
    'oma': `Otalgie
Tympan:
- Congestif
- Inflammatoire
- Perte de transparence 
- Collecté`,
    'lumbago': `Douleur lombaire d'apparition brutale,
- Marche sans aide
- Contracture des muscles paravertébraux
- Lasègue négatif 
- Léri négatif
- Pas de déficit sensitivo-moteur des membres inférieurs
- Pouls périphériques perçus et symétriques`,

'Sinusite frontale': `- Fièvre/Frissons
- Myalgies diffuses
- Céphalées retro orbitaire
- Céphalées augmentée à la mobilisation de la tête


Examen clinique :
- Bon état général
- Pas de signe de gravité
- Auscultation claire, pas de foyer
- Pas de sd méningé
- Pas d'autre point d'appel infectieux retrouvé`,

'Sinusite maxillaire': `- Fièvre/Frissons
- Myalgies diffuses
- Douleurs retro maxillaire/sous orbitaire
- Augmentée à la mobilisation de la tête

Examen clinique :
- Bon état général
- Pas de signe de gravité
- Auscultation claire, pas de foyer
- Pas de sd méningé
- Pas d'autre point d'appel infectieux retrouvé`,

    'syndrome-grippal': `- Fièvre
- Frissons
- Asthénie
- Myalgies diffuses
- Céphalées
- Toux sèche

Examen clinique :
- Bon état général
- Pas de signe de gravité
- Auscultation claire, pas de foyer
- Pas de sd méningé
- Pas d'autre point d'appel infectieux retrouvé`,
    'colique-nephretique': `Colique néphrétique :
- Douleur lombaire unilatérale brutale
- Irradiation vers les organes génitaux externes
- Agitation
- Nausées, vomissements

Examen clinique :
- Bon état général
- Douleur à la palpation de la fosse lombaire
- Absence de fièvre
- Bandelette urinaire : hématurie`,

    'conjonctivite': `- Oeil rouge
- Prurit
- Écoulement purulent
- Larmoiement 
- Sensation de corps étranger`,

    'coqueluche': `Suspicion de coqueluche :
- Toux persistante
- Quinteuse, émétisante à prédominance nocturne
- Reprise inspiratoire bruyante

Examen clinique :
- État général conservé
- Apyrexie ou fièvre modérée
- Auscultation pulmonaire normale
- Pas de détresse respiratoire`,

    'migraine': `Migraine :
- Céphalées unilatérales pulsatiles
- Photophobie, phonophobie
- Nausées, vomissements

Examen clinique :
- Bon état général
- Examen neurologique normal
- Pas de signe de gravité`,
    'depression': `Dépression :
- Humeur triste
- Anhédonie
- Troubles du sommeil
- Perte d'appétit
- Fatigue
- Difficultés de concentration

Examen clinique :
- Patient conscient, orienté
- Pas d'idées suicidaires exprimées
- Pas de délire ni d'hallucinations
- Pas de risque de passage à l'acte immédiat`,
    'entorse-cheville': `Entorse de cheville :
- Traumatisme en torsion
- Douleur et œdème de la malléole 

Examen clinique :
- Marche difficile, mais fait 4 pas
- Œdème et ecchymose malléolaire
- Douleur à la palpation des faisceaux ligamentaires
- Pas de douleur à la palpation de la base du 5ème métatarsien
- Pas de douleur à la palpation médio-pied
- Pas de douleur à la palpation du genou`,
    'entorse-genou': `Entorse de genou :
- Traumatisme en torsion / Hyperextension
- Douleur et gonflement du genou

Examen clinique :
- Impotence fonctionnelle partielle
- Limitation des amplitudes articulaires
- Epanchement articulaire
- Douleur à la palpation des ligaments latéraux
- Genou difficilement examinable ce jour`,
    'entorse-poignet': `Entorse de poignet :
- Traumatisme en hyperextension / flexion forcée
- Douleur et oedeme du poignet

Examen clinique :
- Mobilisation du poignet douloureuse
- Impotence fonctionnelle partielle
- Œdème localisé
- Pas de déformation
- Pas de trouble sensitivo-moteur des doigts
- Pouls radial présent`,
    'entorse-doigt': `Entorse de doigt :
- Traumatisme en hyperextension / déviation latérale
- Douleur et oedeme du doigt

Examen clinique :
- Œdème localisé
- Douleur à la mobilisation
- Pas de déformation
- Stabilité des articulations adjacentes
- Pas de trouble sensitivo-moteur du doigt`

};

// DOM Elements
const elements = {
    categoriesContainer: document.getElementById('categories'),
    reportTextArea: document.getElementById('reportText'),
    copyButton: document.getElementById('copyButton'),
    resetButton: document.getElementById('resetButton'),
    tabButtons: document.querySelectorAll('.tab-button'),
    favoriteButtons: document.querySelectorAll('.favorite-btn'),
    dropdownBtn: document.querySelector('.dropdown-btn'),
    dropdownContent: document.querySelector('.dropdown-content')
};

// Functions
function generateCategoryHTML(category) {
    return `
        <div class="category" id="category-${category.id}">
            <div class="category-title" onclick="toggleCategory(${category.id})">
                <input type="checkbox" onclick="event.stopPropagation()" onchange="toggleAllSymptoms(${category.id}, this.checked)">
                ${category.name}
            </div>
            <div class="category-content">
                ${category.symptoms.map(symptom => `
                    <label>
                        <input type="checkbox" name="${category.id}-${symptom}" onchange="updateReport()">
                        ${symptom}
                    </label>
                `).join('')}
            </div>
        </div>
    `;
}

function toggleCategory(categoryId) {
    const category = document.getElementById(`category-${categoryId}`);
    category.classList.toggle('open');
}

function toggleAllSymptoms(categoryId, checked) {
    const category = CATEGORIES.find(c => c.id === categoryId);
    if (category) {
        category.symptoms.forEach(symptom => {
            const checkbox = document.querySelector(`input[name="${categoryId}-${symptom}"]`);
            if (checkbox) {
                checkbox.checked = checked;
            }
        });
        updateReport();
    }
}

function updateReport() {
    let report = "";
    CATEGORIES.forEach(category => {
        const categorySymptoms = category.symptoms.filter(symptom => {
            const checkbox = document.querySelector(`input[name="${category.id}-${symptom}"]`);
            return checkbox && checkbox.checked;
        });
        if (categorySymptoms.length > 0) {
            report += `${category.name}:\n`;
            categorySymptoms.forEach(symptom => {
                report += `- ${symptom}\n`;
            });
            report += '\n';
        }
    });
    elements.reportTextArea.value = report.trim();
    adjustTextareaHeight(elements.reportTextArea);
}

function adjustTextareaHeight(element) {
    element.style.height = 'auto';
    element.style.height = (element.scrollHeight) + 'px';
}

function copyReport() {
    const report = elements.reportTextArea.value;
    navigator.clipboard.writeText(report)
        .then(() => updateCopyButtonState())
        .catch(err => {
            console.error('Erreur lors de la copie : ', err);
            fallbackCopyTextToClipboard(report);
        });
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        updateCopyButtonState();
    } catch (err) {
        console.error('Erreur lors de la copie : ', err);
    }
    document.body.removeChild(textArea);
}

function updateCopyButtonState() {
    elements.copyButton.classList.add('copied');
    elements.copyButton.textContent = 'Copié !';
    setTimeout(() => {
        elements.copyButton.classList.remove('copied');
        elements.copyButton.textContent = 'Copier le rapport';
    }, 2000);
}

function resetAll() {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    elements.reportTextArea.value = '';
    elements.copyButton.classList.remove('copied');
    elements.copyButton.textContent = 'Copier le rapport';
    updateReport();

    document.querySelectorAll('.category.open').forEach(category => {
        category.classList.remove('open');
    });
}

function initializeApp() {
    initializeTabs();
    initializeFavoriteButtons();
    initializeDropdowns();
    
    if (elements.categoriesContainer) {
        elements.categoriesContainer.innerHTML = CATEGORIES.map(generateCategoryHTML).join('');
    } else {
        console.error("L'élément avec l'ID 'categories' n'a pas été trouvé.");
    }
    
    if (elements.reportTextArea) {
        elements.reportTextArea.addEventListener('input', function() {
            adjustTextareaHeight(this);
        });
        adjustTextareaHeight(elements.reportTextArea);
    }
    
    window.addEventListener('resize', () => {
        if (elements.reportTextArea) {
            adjustTextareaHeight(elements.reportTextArea);
        }
    });
}

function initializeTabs() {
    elements.tabButtons.forEach(button => {
        button.addEventListener('click', () => switchTab(button.dataset.tab));
    });
}

function switchTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');

    elements.tabButtons.forEach(button => {
        if (button.dataset.tab === tabName) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    tabContents.forEach(content => {
        if (content.id === tabName + '-content') {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

function initializeFavoriteButtons() {
    elements.favoriteButtons.forEach(button => {
        button.addEventListener('click', () => generateFavoriteReport(button.dataset.favorite));
    });
}


function initializeDropdowns() {
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');

    if (dropdownBtn && dropdownContent) {
        dropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown();
        });

        document.addEventListener('click', function() {
            closeDropdown();
        });

        dropdownContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Ajout d'un gestionnaire d'événements pour les boutons du menu déroulant
        dropdownContent.querySelectorAll('.favorite-btn').forEach(button => {
            button.addEventListener('click', function() {
                generateFavoriteReport(this.dataset.favorite);
                closeDropdown();
            });
        });
    }
}

function toggleDropdown() {
    const dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.classList.toggle('show');
}

function closeDropdown() {
    const dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.classList.remove('show');
}


function generateFavoriteReport(favoriteType) {
    elements.reportTextArea.value = FAVORITES[favoriteType] || "Texte non défini pour ce favori.";
    adjustTextareaHeight(elements.reportTextArea);
    // Le menu se fermera automatiquement grâce au gestionnaire d'événements ajouté dans initializeDropdowns
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initializeApp);
elements.copyButton.addEventListener('click', copyReport);
elements.resetButton.addEventListener('click', resetAll);