
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
function generateCategoryHTML(category) {
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
                    } else if (typeof symptom === 'string') {
                        return `
                            <label>
                                <input type="checkbox" name="${category.id}-${index}" onchange="updateEchoReport()">
                                ${symptom}
                            </label>
                        `;
                    } else {
                        return `
                            <label>
                                <input type="checkbox" name="${category.id}-${index}" onchange="updateEchoReport()">
                                ${symptom.text}
                                <input type="number" class="symptom-input" step="0.1" min="0" oninput="updateEchoReport()">
                                ${symptom.unit}
                                ${symptom.secondInput ? `x <input type="number" class="symptom-input" step="0.1" min="0" oninput="updateEchoReport()"> ${symptom.unit}` : ''}
                            </label>
                        `;
                    }
                }).join('')}
                <label class="custom-symptom">
                    <input type="checkbox" name="${category.id}-custom" onchange="updateEchoReport()">
                    <input type="text" placeholder="Autre" oninput="updateEchoReport()">
                </label>
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
    initializeNavigation();
    
    if (document.getElementById('categories')) {
        // Page principale
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
    } else if (document.getElementById('echoTypeSelect')) {
        // Page d'échographie
        initializeEchoPage();
    }
    
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
document.addEventListener('DOMContentLoaded', initializeApp);
document.addEventListener('DOMContentLoaded', initializeEchoPage);
elements.copyButton.addEventListener('click', copyReport);
elements.resetButton.addEventListener('click', resetAll);

function initializeNavigation() {
    const echoButton = document.getElementById('echoButton');
    const homeButton = document.getElementById('homeButton');
    
    if (echoButton) {
        echoButton.addEventListener('click', () => {
            window.location.href = 'echo.html';
        });
    }
    
    if (homeButton) {
        homeButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
}

let uploadedImages = [];

function initializeImageUpload() {
    const addImageButton = document.getElementById('addImageButton');
    const fileInput = document.getElementById('imageUpload');

    // Supprimez tout événement existant
    addImageButton.removeEventListener('click', addImageButtonClickHandler);
    fileInput.removeEventListener('change', handleFileSelect);

    // Ajoutez les nouveaux écouteurs d'événements
    addImageButton.addEventListener('click', addImageButtonClickHandler);
    fileInput.addEventListener('change', handleFileSelect);
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

    const margin = 20;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const contentWidth = pageWidth - 2 * margin;
    const columnWidth = contentWidth / 2 - 5;

    function addHeaderAndFooter(pageNum) {
        if (pageNum > 1) {
            doc.setFontSize(9);
            doc.text(`Patient: ${lastName} ${firstName} - Né(e) le: ${birthDate}`, margin, 10);
            doc.text(`Dr [Nom du médecin]`, pageWidth - margin, pageHeight - 10, { align: 'right' });
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
    let rightColumnY = 40;
    const doctorInfoX = margin + columnWidth + 10;
    rightColumnY = addTextWithOverflow('Dr [Nom du médecin]', doctorInfoX, rightColumnY, { fontSize: 11, fontStyle: 'bold', maxWidth: columnWidth });
    rightColumnY = addTextWithOverflow('RPPS : [RPPS du médecin]', doctorInfoX, rightColumnY + 3, { fontSize: 10, maxWidth: columnWidth });
    rightColumnY = addTextWithOverflow('ADELI : [ADELI du médecin]', doctorInfoX, rightColumnY + 3, { fontSize: 10, maxWidth: columnWidth });
    rightColumnY = addTextWithOverflow('Adresse : [Adresse du médecin]', doctorInfoX, rightColumnY + 3, { fontSize: 10, maxWidth: columnWidth });
    rightColumnY = addTextWithOverflow('Tél : 05 56 44 74 74', doctorInfoX, rightColumnY + 3, { fontSize: 10, maxWidth: columnWidth });

    yPosition = Math.max(yPosition, rightColumnY) + 10;

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
            yPosition = addTextWithOverflow(line, margin + 5, yPosition, { fontSize: 10 });
        });
        yPosition += 5;
    });

    // Signature du médecin
    yPosition = addTextWithOverflow('Signature du médecin :', margin, yPosition + 10, { fontSize: 10 });
    yPosition = addTextWithOverflow('Dr [Nom du médecin]', margin, yPosition + 5, { fontSize: 10 });

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
    initializeImageUpload();
    const echoTypeSelect = document.getElementById('echoTypeSelect');
    if (echoTypeSelect) {
        echoTypeSelect.addEventListener('change', function() {
            updateEchoCategories(this.value);
        });
        updateEchoCategories(echoTypeSelect.value);
    }

    const reportText = document.getElementById('reportText');
    if (reportText) {
        reportText.addEventListener('input', function() {
            adjustTextareaHeight(this);
        });
        adjustTextareaHeight(reportText);
    }

    const copyButton = document.getElementById('copyButton');
    if (copyButton) {
        copyButton.addEventListener('click', copyReport);
    }

    const resetButton = document.getElementById('resetButton');
    if (resetButton) {
        resetButton.addEventListener('click', resetAll);
    }

    const addImageButton = document.getElementById('addImageButton');
    if (addImageButton) {
        addImageButton.addEventListener('click', addImage);
    }

    const generatePDFButton = document.getElementById('generatePDFButton');
    if (generatePDFButton) {
        console.log('Bouton Générer PDF trouvé');
        generatePDFButton.addEventListener('click', showPatientInfoModal);
    } else {
        console.error('Bouton Générer PDF non trouvé');
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

    console.log('Initialisation de la page d\'échographie terminée');
}


function updateEchoCategories(echoType) {
    const echoCategoriesContainer = document.getElementById('echo-categories');
    const selectedEcho = ECHO_TYPES[echoType];
    
    if (selectedEcho && echoCategoriesContainer) {
        echoCategoriesContainer.innerHTML = selectedEcho.categories.map(generateCategoryHTML).join('');
        
        // Ajoutez des écouteurs d'événements pour les cases à cocher
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
        selectedEcho.categories.forEach(category => {
            let categoryReport = "";
            category.symptoms.forEach((symptom, index) => {
                if (typeof symptom === 'object' && symptom.isSubtitle) {
                    categoryReport += `\n${symptom.text}\n`;
                } else if (typeof symptom === 'string') {
                    const checkbox = document.querySelector(`input[name="${category.id}-${index}"]`);
                    if (checkbox && checkbox.checked) {
                        categoryReport += `- ${symptom}\n`;
                    }
                } else {
                    const checkbox = document.querySelector(`input[name="${category.id}-${index}"]`);
                    if (checkbox && checkbox.checked) {
                        const inputs = checkbox.parentNode.querySelectorAll('input[type="number"]');
                        if (inputs.length > 0 && inputs[0].value) {
                            let symptomText = `- ${symptom.text}${inputs[0].value} ${symptom.unit}`;
                            if (symptom.secondInput && inputs.length > 1 && inputs[1].value) {
                                symptomText += ` x ${inputs[1].value} ${symptom.unit}`;
                            }
                            categoryReport += symptomText + '\n';
                        }
                    }
                }
            });
            
            // Ajout de l'option personnalisée
            const customCheckbox = document.querySelector(`input[name="${category.id}-custom"]`);
            const customInput = customCheckbox.nextElementSibling;
            if (customCheckbox && customCheckbox.checked && customInput && customInput.value.trim()) {
                categoryReport += `- ${customInput.value.trim()}\n`;
            }
            
            if (categoryReport) {
                report += `${category.name}:\n${categoryReport}\n`;
            }
        });
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