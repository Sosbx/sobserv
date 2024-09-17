let canvas;
let ctx;
let logoSosmedecins;
// Chargement du logo
window.addEventListener('load', function() {
    logoSosmedecins = new Image();
    logoSosmedecins.src = 'LogoSosmedecins.png'; // Assurez-vous que le chemin est correct
});

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
            'Testicules plapés'
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
- Migraine similaire aux autres crises
Examen neuro:
- Pas de signe de gravité
- Pas de trouble du comportement
- RPM symétriques et consensuels
- Paires crâniennes normales
- Pas de déficit sensitif
- Pas de déficit moteur
- Pas de syndrome méningé`,
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
function generateCategoryHTML(category, isEchoPage = false) {
    if (category.type === 'input' || category.type === 'textarea') {
        return `
            <div class="category" id="category-${category.id}">
                <div class="category-title">${category.name}</div>
                <div class="category-content">
                    ${category.type === 'input' ? 
                        `<input type="text" id="${category.id}" class="perso-input" placeholder="Entrez le titre de l'échographie" oninput="updateEchoReport()">` :
                        `<textarea id="${category.id}" class="perso-textarea" placeholder="Entrez le contenu ici" oninput="updateEchoReport()"></textarea>`
                    }
                </div>
            </div>
        `;
    }

    return `
        <div class="category" id="category-${category.id}">
            <div class="category-title" onclick="toggleCategory(${category.id})">
                <input type="checkbox" onclick="event.stopPropagation()" onchange="toggleAllSymptoms(${category.id}, this.checked)">
                ${category.name}
            </div>
            <div class="category-content">
                ${category.symptoms.map((symptom, index) => {
                    if (typeof symptom === 'object' && symptom.isSubtitle) {
                        return `<h4 class="symptom-subtitle">${symptom.text}</h4>`;
                    } else {
                        return `
                            <div class="symptom-row">
                                <label>
                                    <input type="checkbox" name="${category.id}-${index}" onchange="${isEchoPage ? 'updateEchoReport()' : 'updateMainReport()'}">
                                    <span class="symptom-text">${typeof symptom === 'string' ? symptom : symptom.text}</span>
                                    ${typeof symptom === 'object' && symptom.input ? `
                                        <span class="symptom-input-container">
                                            <input type="number" class="symptom-input" step="0.1" min="0" oninput="${isEchoPage ? 'updateEchoReport()' : 'updateMainReport()'}">
                                            ${symptom.unit}
                                            ${symptom.secondInput ? `x <input type="number" class="symptom-input" step="0.1" min="0" oninput="${isEchoPage ? 'updateEchoReport()' : 'updateMainReport()'}"> ${symptom.unit}` : ''}
                                        </span>
                                    ` : ''}
                                </label>
                                <button class="add-custom-symptom" onclick="addCustomSymptom(this, ${category.id}, ${index}, ${isEchoPage})">+</button>
                            </div>
                        `;
                    }
                }).join('')}
            </div>
        </div>
    `;
}


function addCustomSymptom(button, categoryId, index, isEchoPage) {
    const newRow = document.createElement('div');
    newRow.className = 'symptom-row custom-symptom-row';
    newRow.innerHTML = `
        <label>
            <input type="checkbox" name="${categoryId}-custom-${index}" onchange="${isEchoPage ? 'updateEchoReport()' : 'updateMainReport()'}">
            <input type="text" class="custom-symptom-input" placeholder="Autre" oninput="handleCustomSymptomInput(this, ${isEchoPage})">
        </label>
        <button class="remove-custom-symptom" onclick="removeCustomSymptom(this, ${isEchoPage})">-</button>
    `;
    button.parentNode.insertAdjacentElement('afterend', newRow);
    
    if (isEchoPage) {
        updateEchoReport();
    } else {
        updateMainReport();
    }
}

function handleCustomSymptomInput(input, isEchoPage) {
    const checkbox = input.parentNode.querySelector('input[type="checkbox"]');
    checkbox.checked = input.value.trim() !== '';
    
    if (isEchoPage) {
        updateEchoReport();
    } else {
        updateMainReport();
    }
}

function removeCustomSymptom(button, isEchoPage) {
    button.parentNode.remove();
    if (isEchoPage) {
        updateEchoReport();
    } else {
        updateMainReport();
    }
}

function toggleCategory(categoryId) {
    const category = document.getElementById(`category-${categoryId}`);
    category.classList.toggle('open');
}

function toggleAllSymptoms(categoryId, checked) {
    const category = document.getElementById(`category-${categoryId}`);
    if (category) {
        const checkboxes = category.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = checked;
        });
        updateReport();
    }
}

function updateMainReport() {
    let report = "";
    CATEGORIES.forEach(category => {
        let categoryReport = "";
        let hasContent = false;

        const categoryElement = document.getElementById(`category-${category.id}`);
        const symptomRows = categoryElement.querySelectorAll('.symptom-row');

        symptomRows.forEach((row) => {
            const checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox && checkbox.checked) {
                if (!hasContent) {
                    categoryReport += `${category.name}:\n`;
                    hasContent = true;
                }

                if (row.classList.contains('custom-symptom-row')) {
                    const textInput = row.querySelector('.custom-symptom-input');
                    if (textInput && textInput.value.trim()) {
                        categoryReport += `- ${textInput.value.trim()}\n`;
                    }
                } else {
                    let symptomText = row.textContent.trim();
                    // Supprime le symbole '+' à la fin du texte s'il existe
                    symptomText = symptomText.replace(/\+$/, '').trim();
                    
                    const inputs = row.querySelectorAll('input[type="number"]');
                    if (inputs.length > 0) {
                        let inputText = `${symptomText}: `;
                        inputText += inputs[0].value + (inputs[1] ? ` x ${inputs[1].value}` : '');
                        if (row.textContent.includes('cm')) {
                            inputText += ' cm';
                        } else if (row.textContent.includes('mm')) {
                            inputText += ' mm';
                        }
                        categoryReport += `- ${inputText}\n`;
                    } else {
                        categoryReport += `- ${symptomText}\n`;
                    }
                }
            }
        });

        if (categoryReport) {
            report += categoryReport.trim() + '\n\n'; // Ajoute un double saut de ligne entre les catégories
        }
    });

    const reportTextArea = document.getElementById('reportText');
    if (reportTextArea) {
        reportTextArea.value = report.trim(); // Supprime les espaces superflus au début et à la fin
        adjustTextareaHeight(reportTextArea);
    }
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
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.value = '';
    });
    elements.reportTextArea.value = '';
    elements.copyButton.classList.remove('copied');
    elements.copyButton.textContent = 'Copier le rapport';

    // Fermer toutes les catégories déployées
    document.querySelectorAll('.category.open').forEach(category => {
        category.classList.remove('open');
    });

    // Réinitialiser la taille de la zone de texte
    elements.reportTextArea.style.height = 'auto';

    updateReport();
}


function initializeApp() {
    
    const categoriesElement = document.getElementById('categories');
    const echoTypeSelect = document.getElementById('echoTypeSelect');
    const isEchoPage = !!document.getElementById('echoTypeSelect');

    if (isEchoPage) {
        initializeEchoPage();
    } else {
        // Initialisation pour la page principale
        initializeTabs();
        initializeFavoriteButtons();
        initializeDropdowns();
        
        if (elements.categoriesContainer) {
            elements.categoriesContainer.innerHTML = CATEGORIES.map(category => generateCategoryHTML(category, false)).join('');
            
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', updateMainReport);
            });
            
            document.querySelectorAll('input[type="number"]').forEach(input => {
                input.addEventListener('input', updateMainReport);
            });
        }
    }

    if (categoriesElement) {
        // Page principale (index.html)
        initializeTabs();
        initializeFavoriteButtons();
        initializeDropdowns();
       
        
        if (elements.categoriesContainer) {
            elements.categoriesContainer.innerHTML = CATEGORIES.map(category => generateCategoryHTML(category, false)).join('');
            
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', updateMainReport);
            });
            
            document.querySelectorAll('input[type="number"]').forEach(input => {
                input.addEventListener('input', updateMainReport);
            });
        }
    } else if (echoTypeSelect) {
        // Page d'échographie (echo.html)
        initializeEchoPage();
    
    }
   
    // Ajustement de la hauteur du textarea
    const reportTextArea = document.getElementById('reportText');
    if (reportTextArea) {
        reportTextArea.addEventListener('input', function() {
            adjustTextareaHeight(this);
        });
        adjustTextareaHeight(reportTextArea);
    }

    // Ajustement de la hauteur du textarea lors du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        const textArea = document.getElementById('reportText');
        if (textArea) {
            adjustTextareaHeight(textArea);
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
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    initializeEchoPage();
    initializeNavigation();
});

function initializeNavigation() {
    const menuButton = document.getElementById('menuButton');
    const menuDropdown = document.getElementById('menuDropdown');
    const menuOverlay = document.querySelector('.menu-overlay');

    if (menuButton && menuDropdown && menuOverlay) {
        menuButton.addEventListener('click', function(event) {
            event.stopPropagation();
            toggleMenu();
        });

        menuOverlay.addEventListener('click', closeMenu);

        document.addEventListener('click', function(event) {
            if (!menuButton.contains(event.target) && !menuDropdown.contains(event.target)) {
                closeMenu();
            }
        });
    } else {
        console.error('Éléments de navigation manquants');
    }
}

// Assurez-vous que cette ligne est présente
document.addEventListener('DOMContentLoaded', initializeNavigation);

function toggleMenu() {
    const menuDropdown = document.getElementById('menuDropdown');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuButton = document.getElementById('menuButton');

    menuDropdown.classList.toggle('show');
    menuOverlay.classList.toggle('show');
    const isOpen = menuDropdown.classList.contains('show');
    menuButton.setAttribute('aria-expanded', isOpen);
}

function closeMenu() {
    const menuDropdown = document.getElementById('menuDropdown');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuButton = document.getElementById('menuButton');

    menuDropdown.classList.remove('show');
    menuOverlay.classList.remove('show');
    menuButton.setAttribute('aria-expanded', 'false');
}


// Ces fonctions restent inchangées
elements.copyButton.addEventListener('click', copyReport);
elements.resetButton.addEventListener('click', resetAll);

let uploadedImages = [];

function initializeImageUpload() {
    const addImageButton = document.getElementById('addImageButton');
    const fileInput = document.getElementById('imageUpload');

    if (addImageButton && fileInput) {
        addImageButton.addEventListener('click', addImageButtonClickHandler);
        fileInput.addEventListener('change', handleFileSelect);
    } else {
        console.warn('Elements for image upload not found');
    }
}

function addImageButtonClickHandler(event) {
    event.preventDefault(); // Empêche le comportement par défaut
    document.getElementById('imageUpload').click();
}

function handleFileSelect(event) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        uploadedImages.push(files[i]);
    }
    updateImagesList();
    event.target.value = ''; // Réinitialiser l'input file
}
function updateImagesList() {
    const imagesList = document.getElementById('uploadedImagesList');
    imagesList.innerHTML = '';
    uploadedImages.forEach((file, index) => {
        const listItem = document.createElement('div');
        listItem.className = 'uploaded-image-item';
        listItem.innerHTML = `
            <span>${file.name}</span>
            <button class="remove-image" onclick="removeImage(${index})">×</button>
        `;
        imagesList.appendChild(listItem);
    });
}

function removeImage(index) {
    uploadedImages.splice(index, 1);
    updateImagesList();
}

function generatePDF(lastName, firstName, birthDate) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Récupérer les informations du médecin
    const savedInfo = localStorage.getItem('doctorInfo');
    const doctorInfo = savedInfo ? JSON.parse(savedInfo) : {};

    const margin = 20;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const contentWidth = pageWidth - 2 * margin;
    const columnWidth = contentWidth / 2 - 5;

    function addHeaderAndFooter(pageNum) {
        if (pageNum > 1) {
            doc.setFontSize(9);
            doc.text(`Patient: ${lastName} ${firstName} - Né(e) le: ${birthDate}`, margin, 10);
            
        }
    }

    function addTextWithOverflow(text, x, y, options = {}) {
        const lineHeight = options.lineHeight || 4;
        const fontSize = options.fontSize || 10;
        const fontStyle = options.fontStyle || 'normal';
        const maxWidth = options.maxWidth || contentWidth;

        doc.setFontSize(fontSize);
        doc.setFont(undefined, fontStyle);

        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach((line, index) => {
            if (y + (index * lineHeight) > pageHeight - margin) {
                doc.addPage();
                addHeaderAndFooter(doc.internal.getNumberOfPages());
                y = margin;
            }
            doc.text(line, x, y + (index * lineHeight));
        });

        return y + (lines.length * lineHeight);
    }

    // Logo
    if (logoSosmedecins && logoSosmedecins.complete) {
        doc.addImage(logoSosmedecins, 'PNG', margin, 10, 50, 20);
    }

    let yPosition = 40;

    // Informations du patient (colonne gauche)
    yPosition = addTextWithOverflow('Patient :', margin, yPosition, { fontSize: 11, fontStyle: 'bold', maxWidth: columnWidth });
    yPosition = addTextWithOverflow(`Nom : ${lastName}`, margin, yPosition + 3, { fontSize: 10, maxWidth: columnWidth });
    yPosition = addTextWithOverflow(`Prénom : ${firstName}`, margin, yPosition + 3, { fontSize: 10, maxWidth: columnWidth });
    yPosition = addTextWithOverflow(`Date de naissance : ${birthDate}`, margin, yPosition + 3, { fontSize: 10, maxWidth: columnWidth });

      // Informations du médecin (colonne droite)
    const doctorInfoX = pageWidth - margin;
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text(`Dr ${doctorInfo.name || '[Nom du médecin]'}`, doctorInfoX, 40, { align: 'right' });
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`RPPS : ${doctorInfo.rpps || '[RPPS du médecin]'}`, doctorInfoX, 50, { align: 'right' });

    yPosition += 10; // Saut de ligne avant le titre

    // Titre du rapport
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Compte rendu d\'échographie', pageWidth / 2, yPosition, { align: 'center' });


    yPosition += 10;

    // Date et heure
    const currentDate = new Date().toLocaleString('fr-FR');
    yPosition = addTextWithOverflow(`Date et heure : ${currentDate}`, margin, yPosition, { fontSize: 10 });

    // Type d'échographie
    const echoType = document.getElementById('echoTypeSelect').value;
    yPosition = addTextWithOverflow(`Type d'échographie : ${ECHO_TYPES[echoType].name}`, margin, yPosition + 4, { fontSize: 10, fontStyle: 'bold' });

    yPosition += 10;

    // Contenu du rapport
    const reportContent = document.getElementById('reportText').value;
    const sections = reportContent.split('\n\n');

    sections.forEach(section => {
        const [title, ...content] = section.split('\n');
        yPosition = addTextWithOverflow(title, margin, yPosition, { fontSize: 11, fontStyle: 'bold' });
        yPosition += 2;
        content.forEach(line => {
            if (line.startsWith('Jambe') || line.startsWith('Rein') || line.includes('CARREFOUR') || line.includes('RÉGION')) {
                // Sous-titres
                yPosition = addTextWithOverflow(line, margin + 2, yPosition, { fontSize: 10, fontStyle: 'italic' });
            } else {
                yPosition = addTextWithOverflow(line, margin + 5, yPosition, { fontSize: 9 });
            }
        });
        yPosition += 5;
    });

    // Ajout de la signature et du nom du médecin à la fin
    yPosition = addTextWithOverflow(`Dr ${doctorInfo.name || '[Nom du médecin]'}`, margin, yPosition + 10, { fontSize: 10, fontStyle: 'bold' });
    if (doctorInfo.signature) {
        doc.addImage(doctorInfo.signature, 'PNG', margin, yPosition + 5, 50, 25);
    }
    // Pages pour les images
    if (uploadedImages.length > 0) {
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        const margin = 10;
        const imageSize = (pageWidth - 4 * margin) / 2; // 2 colonnes
        const xPositions = [margin, pageWidth / 2 + margin / 2];
        let currentY = margin;
        let currentPage = 1;
        let imagesOnCurrentPage = 0;

        const addImageToPDF = (imgData, index) => {
            if (currentPage === 1 || imagesOnCurrentPage === 6) {
                doc.addPage();
                currentPage++;
                addHeaderAndFooter(currentPage);
                currentY = 15; // Ajusté pour laisser de la place à l'en-tête
                imagesOnCurrentPage = 0;
            }

            const x = xPositions[imagesOnCurrentPage % 2];
            doc.addImage(imgData, 'JPEG', x, currentY, imageSize, imageSize);
            imagesOnCurrentPage++;

            if (imagesOnCurrentPage % 2 === 0) {
                currentY += imageSize + margin;
            }
        };

        let imagesProcessed = 0;
        uploadedImages.forEach((image, index) => {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    const imgData = canvas.toDataURL('image/jpeg', 1.0); // Qualité maximale
                    addImageToPDF(imgData, index);
                    imagesProcessed++;
                    if (imagesProcessed === uploadedImages.length) {
                        doc.save('rapport_echographie_avec_images.pdf');
                    }
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(image);
        });
    } else {
        doc.save('rapport_echographie.pdf');
    }
}
// Mise à jour de l'initialisation pour inclure le gestionnaire d'événements pour le bouton de génération de PDF
function initializeEchoPage() {
    console.log('Initialisation de la page d\'échographie');
    
    const echoTypeSelect = document.getElementById('echoTypeSelect');
    const reportText = document.getElementById('reportText');
    const copyButton = document.getElementById('copyButton');
    const resetButton = document.getElementById('resetButton');
    const addImageButton = document.getElementById('addImageButton');
    const generatePDFButton = document.getElementById('generatePDFButton');

    if (echoTypeSelect) {
        echoTypeSelect.addEventListener('change', function() {
            updateEchoCategories(this.value);
        });
        updateEchoCategories(echoTypeSelect.value);
    }

    if (reportText) {
        reportText.addEventListener('input', function() {
            adjustTextareaHeight(this);
        });
        adjustTextareaHeight(reportText);
    }

    if (copyButton) {
        copyButton.addEventListener('click', copyReport);
    }

    if (resetButton) {
        resetButton.addEventListener('click', resetAll);
    }

    if (addImageButton && document.getElementById('imageUpload')) {
        initializeImageUpload();
    } else {
        console.log('Elements for image upload not found');
    }

    if (generatePDFButton) {
        console.log('Bouton Générer PDF trouvé');
        generatePDFButton.addEventListener('click', showPatientInfoModal);
    } else {
        console.log('Bouton Générer PDF non trouvé');
    }

    const confirmPatientInfoButton = document.getElementById('confirmPatientInfo');
    if (confirmPatientInfoButton) {
        confirmPatientInfoButton.addEventListener('click', handlePatientInfo);
    }

    const cancelPatientInfoButton = document.getElementById('cancelPatientInfo');
    if (cancelPatientInfoButton) {
        cancelPatientInfoButton.addEventListener('click', hidePatientInfoModal);
    }

    const echoCategoriesContainer = document.getElementById('echo-categories');
    if (echoCategoriesContainer) {
        echoCategoriesContainer.addEventListener('change', function(event) {
            if (event.target.type === 'checkbox') {
                updateEchoReport();
            }
        });
    }

    initializeDoctorInfoSection();
    initializeNavigation();
    console.log('Initialisation de la page d\'échographie terminée');
}

function updateEchoCategories(echoType) {
    const echoCategoriesContainer = document.getElementById('echo-categories');
    const selectedEcho = ECHO_TYPES[echoType];
    
    if (selectedEcho && echoCategoriesContainer) {
        echoCategoriesContainer.innerHTML = selectedEcho.categories.map(category => generateCategoryHTML(category, true)).join('');
        
        document.querySelectorAll('#echo-categories input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', updateEchoReport);
        });
    }
}

function updateEchoReport() {
    const echoType = document.getElementById('echoTypeSelect').value;
    const selectedEcho = ECHO_TYPES[echoType];
    let report = "";
    
    if (selectedEcho) {
        if (echoType === 'perso') {
            const title = document.getElementById('perso-title').value;
            report += `Échographie : ${title}\n\n`;
            
            selectedEcho.categories.forEach(category => {
                if (category.id !== 'perso-title') {
                    const content = document.getElementById(category.id).value;
                    if (content.trim()) {
                        report += `${category.name}:\n${content}\n\n`;
                    }
                }
            });
        } else {
            selectedEcho.categories.forEach(category => {
                let categoryReport = "";
                let hasContent = false;
                let currentSubtitle = "";

                const categoryElement = document.getElementById(`category-${category.id}`);
                const allElements = categoryElement.querySelectorAll('.symptom-row, .symptom-subtitle');

                allElements.forEach((element) => {
                    if (element.classList.contains('symptom-subtitle')) {
                        // C'est un sous-titre, on le stocke pour une utilisation ultérieure
                        currentSubtitle = element.textContent.trim();
                    } else {
                        // C'est une ligne de symptôme
                        const checkbox = element.querySelector('input[type="checkbox"]');
                        if (checkbox && checkbox.checked) {
                            if (!hasContent) {
                                categoryReport += `${category.name}:\n`;
                                hasContent = true;
                            }

                            // Ajouter le sous-titre si nécessaire
                            if (currentSubtitle) {
                                categoryReport += `\n${currentSubtitle}\n`;
                                currentSubtitle = ""; // Réinitialiser pour ne pas le répéter
                            }

                            if (element.classList.contains('custom-symptom-row')) {
                                const textInput = element.querySelector('.custom-symptom-input');
                                if (textInput && textInput.value.trim()) {
                                    categoryReport += `- ${textInput.value.trim()}\n`;
                                }
                            } else {
                                const symptomText = element.querySelector('.symptom-text').textContent.trim();
                                const inputs = element.querySelectorAll('input[type="number"]');
                                if (inputs.length > 0) {
                                    let inputText = `- ${symptomText}: `;
                                    if (inputs.length === 2) {
                                        inputText += `${inputs[0].value} x ${inputs[1].value} cm`;
                                    } else {
                                        inputText += `${inputs[0].value} ${symptomText.includes('mm') ? 'mm' : 'cm'}`;
                                    }
                                    categoryReport += `${inputText}\n`;
                                } else {
                                    categoryReport += `- ${symptomText}\n`;
                                }
                            }
                        }
                    }
                });

                if (categoryReport) {
                    report += categoryReport.trim() + '\n\n';
                }
            });
        }
    }
    
    const reportText = document.getElementById('reportText');
    if (reportText) {
        reportText.value = report.trim();
        adjustTextareaHeight(reportText);
    }
}






function copyEchoReport() {
    const echoReport = document.getElementById('echoReportText').value;
    navigator.clipboard.writeText(echoReport)
        .then(() => updateEchoCopyButtonState())
        .catch(err => {
            console.error('Erreur lors de la copie : ', err);
            fallbackCopyTextToClipboard(echoReport);
        });
}

function updateEchoCopyButtonState() {
    const echoCopyButton = document.getElementById('echoCopyButton');
    echoCopyButton.classList.add('copied');
    echoCopyButton.textContent = 'Copié !';
    setTimeout(() => {
        echoCopyButton.classList.remove('copied');
        echoCopyButton.textContent = 'Copier le rapport';
    }, 2000);
}

function resetEchoReport() {
    const echoReportText = document.getElementById('echoReportText');
    echoReportText.value = '';
    adjustTextareaHeight(echoReportText);
}

function addImage() {
    // Fonctionnalité à implémenter
    console.log('Fonctionnalité d\'ajout d\'image à implémenter');
}

const ECHO_TYPES = {
    'renal': {
        name: 'Échographie rénale',
        categories: [
            {
                id: 1,
                name: 'INDICATION',
                symptoms: ['Douleur fosse lombaire', 'Dysurie']
            },
            {
                id: 2,
                name: 'TECHNIQUE',
                symptoms: [
                    'Échographie rénale par voie abdominale antérieure et postérieure',
                    'Sonde ultraportable butterfly IQ/IQ+/IQ3',
                    'Sonde ultraportable GE Vscan'
                ]
            },
            {
                id: 3,
                name: 'RÉSULTATS',
                symptoms: [
                    { text: 'Rein DROIT', isSubtitle: true },
                    'Morphologie : normale',
                    { text: 'Dimensions : ', input: true, unit: 'cm',secondInput: true },
                    'Structure : homogène, sans échostructure anormale',
                    { text: 'Cortex : épaisseur ', input: true, unit: 'mm' },
                    'Médullaire : structure normale',
                    'Sinus rénaux : libres',
                    'Vascularisation : normale, artères rénales perméables, flux rénaux normaux',
                    'Dilatation pyélocalicielle du rein Droit',
                    'Flux méat uretral non visualisé',
                    { text: 'Rein GAUCHE', isSubtitle: true },
                    'Morphologie : normale',
                    { text: 'Dimensions : ', input: true, unit: 'cm',secondInput: true },
                    'Structure : homogène, sans échostructure anormale',
                    { text: 'Cortex : épaisseur ', input: true, unit: 'mm' },
                    'Médullaire : structure normale',
                    'Sinus rénaux : libres',
                    'Vascularisation : normale, artères rénales perméables, flux rénaux normaux',
                    'Dilatation pyélocalicielle du rein gauche',
                    'Flux méat uretral non visualisé',
                    { text: 'Vessie', isSubtitle: true },
                    'Paroi normale'
                ]
            },
            {
                id: 4,
                name: 'CONCLUSION',
                symptoms: [
                    'Échographie rénale dans les limites de la normale',
                    'Pas d\'anomalie morphologique, structurelle ou vasculaire des reins ni des voies urinaires',
                    'Pas de dilatation pyélocalicielle visualisée',
                    'Échographie rénale en faveur d\'une CN Droite',
                    'Échographie rénale en faveur d\'une CN Gauche',
                    { text: 'Calcul visible de ', input: true, unit: 'mm', secondInput: true },
                    'Calcul non visualisé'
                ]
            }
        ]
    },
    
    'pleuropulmonaire': {
        name: 'Échographie pleuro-pulmonaire',
        categories: [
            {
                id: 1,
                name: 'INDICATION',
                symptoms: ['Dyspnée', 'Toux', 'Fièvre', 'Douleurs thoraciques']
            },
            {
                id: 2,
                name: 'TECHNIQUE',
                symptoms: [
                    'Sonde ultraportable butterfly IQ/IQ+/IQ3',
                    'Sonde ultraportable GE Vscan'
                ]
            },
            {
                id: 3,
                name: 'RÉSULTATS',
                symptoms: [
                    'Glissement pleural bilatéral',
                    'Absence d\'épanchement pleural',
                    'Absence de syndrome interstitiel',
                    'Absence de syndrome alvéolaire',
                    'Absence de glissement pleural droit',
                    'Absence de glissement pleural gauche',
                    'Présence d\'un épanchement pleural droit',
                    'Présence d\'un épanchement pleural gauche',
                    'Présence d\'un syndrome interstitiel bilatéral et diffus',
                    'Présence d\'un syndrome interstitiel à droite',
                    'Présence d\'un syndrome interstitiel à gauche',
                    'Présence d\'un syndrome alvéolaire à droite',
                    'Présence d\'un syndrome alvéolaire à gauche'
                ]
            },
            {
                id: 4,
                name: 'CONCLUSION',
                symptoms: [
                    'Échographie pleuro-pulmonaire dans les limites de la normale',
                    'Échographie pleuro-pulmonaire en faveur d\'une pneumopathie droite',
                    'Échographie pleuro-pulmonaire en faveur d\'une pneumopathie gauche',
                    'Échographie pleuro-pulmonaire en faveur d\'un épanchement pleural droit',
                    'Échographie pleuro-pulmonaire en faveur d\'un épanchement pleural gauche',
                    'Échographie pleuro-pulmonaire en faveur d\'un pneumothorax droit',
                    'Échographie pleuro-pulmonaire en faveur d\'un pneumothorax gauche',
                    'À réévaluer en fonction de la clinique.',
                    'L\'examen pourra être répété quelques jours plus tard afin de suivre l\'évolution.'
                ]
            }
        ]
    },
    'tvp': {
    name: 'Écho-Doppler des veines des membres inférieurs',
    categories: [
        {
            id: 1,
            name: 'INDICATION',
            symptoms: ['OMI', 'Douleur mollet', 'Dyspnée']
        },
        {
            id: 2,
            name: 'TECHNIQUE',
            symptoms: [
                'Sonde ultraportable butterfly IQ/IQ+/IQ3',
                'Sonde ultraportable GE Vscan'
            ]
        },
        {
            id: 3,
            name: 'RÉSULTATS',
            symptoms: [
                { text: 'Jambe DROITE - CARREFOUR FÉMORAL', isSubtitle: true },
                'Lumière de la veine : Anéchogene',
                'Lumière de la veine : Peu echogene',
                'Lumière de la veine : Tres echogene',
                'Test de compressibilité : compressible jusqu\'au collabsus',
                'Incompressibilité partielle uniquement centrale',
                'Incompressibilité partielle uniquement en région latérale de la veine',
                'Incompressibilité partielle périphérique en faveur d\'un thrombus reperméabilisé',
                'Incompressibilité totale, en faveur d\'un caillot occlusif',
                'Étude des flux Doppler : Flux au Doppler pulsé',
                'Étude des flux Doppler : Absence de flux au doppler pulsé',
                { text: 'Jambe DROITE - RÉGION POPLITÉE', isSubtitle: true },
                'Lumière de la veine : Anéchogene',
                    'Lumière de la veine : Peu echogene',
                    'Lumière de la veine : Tres echogene',
                    'Test de compressibilité : compressible jusqu\'au collabsus',
                    'Incompressibilité partielle uniquement centrale',
                    'Incompressibilité partielle uniquement en région latérale de la veine',
                    'Incompressibilité partielle périphérique en faveur d\'un thrombus reperméabilisé',
                    'Incompressibilité totale, en faveur d\'un caillot occlusif',
                    'Étude des flux Doppler : Flux au Doppler pulsé',
                    'Étude des flux Doppler : Absence de flux au doppler pulsé',
                { text: 'Jambe GAUCHE - CARREFOUR FÉMORAL', isSubtitle: true },
                'Lumière de la veine : Anéchogene',
                    'Lumière de la veine : Peu echogene',
                    'Lumière de la veine : Tres echogene',
                    'Test de compressibilité : compressible jusqu\'au collabsus',
                    'Incompressibilité partielle uniquement centrale',
                    'Incompressibilité partielle uniquement en région latérale de la veine',
                    'Incompressibilité partielle périphérique en faveur d\'un thrombus reperméabilisé',
                    'Incompressibilité totale, en faveur d\'un caillot occlusif',
                    'Étude des flux Doppler : Flux au Doppler pulsé',
                    'Étude des flux Doppler : Absence de flux au doppler pulsé',
                { text: 'Jambe GAUCHE - RÉGION POPLITÉE', isSubtitle: true },
                'Lumière de la veine : Anéchogene',
                    'Lumière de la veine : Peu echogene',
                    'Lumière de la veine : Tres echogene',
                    'Test de compressibilité : compressible jusqu\'au collabsus',
                    'Incompressibilité partielle uniquement centrale',
                    'Incompressibilité partielle uniquement en région latérale de la veine',
                    'Incompressibilité partielle périphérique en faveur d\'un thrombus reperméabilisé',
                    'Incompressibilité totale, en faveur d\'un caillot occlusif',
                    'Étude des flux Doppler : Flux au Doppler pulsé',
                    'Étude des flux Doppler : Absence de flux au doppler pulsé'
            ]
        },
        {
            id: 4,
            name: 'CONCLUSION',
            symptoms: [
                'Cet examen est en faveur de l\'absence de thrombose veineuse fémoro-poplitée',
                'Cet examen est en faveur de la présence de thrombose veineuse fémoro-poplitée',
                'À réévaluer en fonction de la clinique.',
                'L\'examen pourra être répété quelques jours plus tard afin de suivre l\'évolution.'
            ]
        }
    ]
},


    'fast': {
        name: 'FAST ÉCHO',
        categories: [
            {
                id: 1,
                name: 'INDICATION',
                symptoms: ['Douleurs abdominales aiguës', 'Douleurs thoraciques', 'Dyspnée']
            },
            {
                id: 2,
                name: 'TECHNIQUE',
                symptoms: [
                    'Sonde ultraportable butterfly IQ/IQ+/IQ3',
                    'Sonde ultraportable GE Vscan'
                ]
            },
            {
                id: 3,
                name: 'RÉSULTATS',
                symptoms: [
                    'Pas d\'épanchement dans le cul-de-sac hépatorenal',
                    'Pas d\'épanchement dans le cul-de-sac splénorenal',
                    'Pas d\'épanchement dans le Douglas',
                    'Pas d\'épanchement pleural droit',
                    'Pas d\'épanchement pleural gauche',
                    'Glissement pleural présent bilatéral',
                    'Pas d\'épanchement péricardique'
                ]
            },
            {
                id: 4,
                name: 'CONCLUSION',
                symptoms: [
                    'Fast écho dans les limites de la normale',
                    'Présence d\'un épanchement péritonéal',
                    'Présence d\'un épanchement pleural droit',
                    'Présence d\'un épanchement pleural gauche',
                    'Présence d\'un pneumothorax droit',
                    'Présence d\'un pneumothorax gauche',
                    'Présence d\'un épanchement péricardique',
                    'À réévaluer en fonction de la clinique.',
                    'L\'examen pourra être répété quelques jours plus tard afin de suivre l\'évolution.'
                ]
            }
        ]
    },

    'perso': {
        name: 'Échographie Perso',
        categories: [
            {
                id: 'perso-title',
                name: 'Titre',
                type: 'input'
            },
            {
                id: 'perso-indication',
                name: 'INDICATION',
                type: 'textarea'
            },
            {
                id: 'perso-technique',
                name: 'TECHNIQUE',
                type: 'textarea'
            },
            {
                id: 'perso-resultats',
                name: 'RÉSULTATS',
                type: 'textarea'
            },
            {
                id: 'perso-conclusion',
                name: 'CONCLUSION',
                type: 'textarea'
            }
        ]
    }
};



function showPatientInfoModal() {
    document.getElementById('patientInfoModal').style.display = 'block';
  }
  
  function hidePatientInfoModal() {
    document.getElementById('patientInfoModal').style.display = 'none';
  }
  
  function handlePatientInfo() {
    const lastName = document.getElementById('patientLastName').value;
    const firstName = document.getElementById('patientFirstName').value;
    const birthDate = document.getElementById('patientBirthDate').value;
  
    if (lastName && firstName && birthDate) {
      hidePatientInfoModal();
      generatePDF(lastName, firstName, birthDate);
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }


let isDrawing = false;

function initializeDoctorInfoSection() {
    canvas = document.getElementById('signatureCanvas');
    if (canvas) {
        ctx = canvas.getContext('2d');
        
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);

        canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', stopDrawing);

        document.getElementById('clearSignature').addEventListener('click', clearSignature);
    } else {
        console.error('Canvas element not found');
    }

    const saveButton = document.getElementById('saveDoctorInfo');
    if (saveButton) {
        saveButton.addEventListener('click', saveDoctorInfo);
    } else {
        console.error('Save button not found');
    }

    loadDoctorInfo();
}

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    
    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    if (e.type === 'mousemove') {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    } else if (e.type === 'touchmove') {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    }

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function clearSignature() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveDoctorInfo() {
    const doctorInfo = {
        name: document.getElementById('doctorName').value,
        rpps: document.getElementById('doctorRPPS').value,
        signature: canvas.toDataURL()
    };
    localStorage.setItem('doctorInfo', JSON.stringify(doctorInfo));
    alert('Informations du médecin sauvegardées');
}

function loadDoctorInfo() {
    const savedInfo = localStorage.getItem('doctorInfo');
    if (savedInfo) {
        const doctorInfo = JSON.parse(savedInfo);
        document.getElementById('doctorName').value = doctorInfo.name;
        document.getElementById('doctorRPPS').value = doctorInfo.rpps;
        
        const img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
        }
        img.src = doctorInfo.signature;
    }
}

// Appelez cette fonction au chargement de la page
document.addEventListener('DOMContentLoaded', initializeDoctorInfoSection);
