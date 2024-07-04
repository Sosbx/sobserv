const categories = [
    { 
        id: 1, 
        name: 'Examen général', 
        symptoms: [
            'Bon état général',
            'GSC 15',
            'Constantes normales',
            'Pas de signe de gravité',
            'Pas de signe de déshydratation',
            'Tonique, joue, sourit'
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
            'Fosse lombaire libre',
            'Pas de globe'
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
    const category = categories.find(c => c.id === categoryId);
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
    categories.forEach(category => {
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
    const reportTextArea = document.getElementById('reportText');
    reportTextArea.value = report.trim();
    adjustTextareaHeight(reportTextArea);
}

function adjustTextareaHeight(element) {
    element.style.height = 'auto';
    element.style.height = (element.scrollHeight) + 'px';
}

function copyReport() {
    const report = document.getElementById('reportText').value;
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(report).then(() => {
            updateCopyButtonState();
        }).catch(err => {
            console.error('Erreur lors de la copie : ', err);
            fallbackCopyTextToClipboard(report);
        });
    } else {
        fallbackCopyTextToClipboard(report);
    }
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
    const copyButton = document.getElementById('copyButton');
    copyButton.classList.add('copied');
    copyButton.textContent = 'Copié !';
    setTimeout(() => {
        copyButton.classList.remove('copied');
        copyButton.textContent = 'Copier le rapport';
    }, 2000);
}

function resetAll() {
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    document.getElementById('reportText').value = '';
    const copyButton = document.getElementById('copyButton');
    copyButton.classList.remove('copied');
    copyButton.textContent = 'Copier le rapport';
    updateReport();

    document.querySelectorAll('.category.open').forEach(category => {
        category.classList.remove('open');
    });
}

// Le reste du code reste inchangé jusqu'à la fonction resetAll()

// Remplacez la partie du code commençant par document.addEventListener par ce qui suit :
document.addEventListener('DOMContentLoaded', function() {initializeApp();});

function initializeApp() {
    initializeTabs();
    initializeFavoriteButtons();
    initializeDropdowns(); // Ajoutez cette ligne
    const categoriesContainer = document.getElementById('categories');
    if (categoriesContainer) {
        categoriesContainer.innerHTML = categories.map(generateCategoryHTML).join('');
    } else {
        console.error("L'élément avec l'ID 'categories' n'a pas été trouvé.");
    }
    
    const reportTextArea = document.getElementById('reportText');
    if (reportTextArea) {
        reportTextArea.addEventListener('input', function() {
            adjustTextareaHeight(this);
        });
        adjustTextareaHeight(reportTextArea);
    }
    
    window.addEventListener('resize', function() {
        if (reportTextArea) {
            adjustTextareaHeight(reportTextArea);
        }
    });
}

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => switchTab(button.dataset.tab));
    });
}

function switchTab(tabName) {
    const tabButtons = document.querySelectorAll('.tab-button');
    const categoriesContainer = document.getElementById('categories');

    tabButtons.forEach(button => {
        if (button.dataset.tab === tabName) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    if (tabName === 'general') {
        categoriesContainer.innerHTML = categories.map(generateCategoryHTML).join('');
    } else if (tabName === 'favorites') {
        // Pour l'instant, nous afficherons juste un message
        categoriesContainer.innerHTML = '<p>Fonctionnalité des favoris à venir</p>';
    }
}
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => switchTab(button.dataset.tab));
    });
}

function switchTab(tabName) {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
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
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', () => generateFavoriteReport(button.dataset.favorite));
    });
}


function initializeDropdowns() {
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');

    if (dropdownBtn && dropdownContent) {
        dropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', function() {
            dropdownContent.style.display = 'none';
        });

        dropdownContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

function generateFavoriteReport(favoriteType) {
    let reportText;

    switch(favoriteType) {
        case 'examen-normal':
            reportText = `Examen général:
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
- Pas de trouble du transit
ORL:
- Pas d'angine
- Pas d'ADP
- Pas d'OMA`;
            break;
        case 'angine-strepta-plus':
            reportText = `- Mal de gorge
- Dysphagie
- Fièvre
- Adénopathies cervicales sensibles
Examen de la gorge :
- Amygdales hypertrophiées
- Érythème pharyngé
- Exsudat blanchâtre sur les amygdales

Streptatest : Positif`;
            break;
        case 'angine-strepta-minus':
            reportText = `- Mal de gorge
- Dysphagie
- Fièvre
- Adénopathies cervicales sensibles
Examen de la gorge :
- Amygdales hypertrophiées
- Érythème pharyngé
- Exsudat blanchâtre sur les amygdales

Streptatest : Négatif` ;
            break;
        case 'cystite':
            reportText = `- Brûlure mictionnelle
- Pollakiurie
- Hématurie
- Apyrétique
- Fosse lombaire libre
- Pas de globe`;
            break;
        case 'deces':
            reportText = `- Identité du patient verifiée
- Absence de ventilation spontanée
- Pupilles en mydriase et aréactives
- Bdc inaudibles
- Pas de pouls
- Rigidité cadavérique `;
            break;
        case 'gastro':
            reportText = `Diarrhée, nausée, vomissements

Examen général:
- Bon état général
- Pas de signe de déshydratation
Abdo:
- Abdomen souple dépressible, sensible dans son ensemble
- Pas de défense
- Pas de contracture`;
            break;
        case 'oma':
            reportText = `Otalgie
Tympan:
- Congestif
- Inflammatoire
- Perte de transparence 
- Collecté`;
            break;
        case 'lumbago':
            reportText = `Douleur lombaire d'apparition brutale,
- Marche sans aide
- Pas d'irradiation dans les membres inferieurs
- Lasègue neg
- Léri neg
- Pouls percus et symétriques`;
            break;
            case 'syndrome-grippal':
            reportText = `- Fièvre
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
- Pas d'autre point d'appel infectieux retrouvé`;
            break;
            case 'colique-nephretique':
                reportText = `Colique néphrétique :
    - Douleur lombaire unilatérale brutale
    - Irradiation vers les organes génitaux externes
    - Agitation
    - Nausées, vomissements
    
    Examen clinique :
    - Bon état général
    - Douleur à la palpation de la fosse lombaire
    - Absence de fièvre
    - Bandelette urinaire : hématurie`;
                break;
    
            case 'migraine':
                reportText = `Migraine :
    - Céphalées unilatérales pulsatiles
    - Photophobie, phonophobie
    - Nausées, vomissements
    
    Examen clinique :
    - Bon état général
    - Examen neurologique normal
    - Pas de signe de gravité`;
                break;

                case 'depression':
                    reportText = `Dépression :
        - Humeur triste
        - Anhédonie
        - Troubles du sommeil
        - Perte d'appétit
        - Fatigue
        - Difficultés de concentration
        
        Examen clinique :
        - Patient conscient, orienté
        - Ralentissement psychomoteur
        - Pas d'idées suicidaires exprimées
        - Pas de délire ni d'hallucinations
        - Pas de risque de passage à l'acte immédiat`;
                    break;

                    case 'entorse-cheville':
                        reportText = `Entorse de cheville :
            - Traumatisme en torsion
            - Douleur et œdème de la malléole 
            
            Examen clinique :
            - Marche difficile, mais fait 4 pas
            - Œdème et ecchymose malléolaire
            - Douleur à la palpation des faisceaux ligamentaires
            - Pas de douleur à la palpation de la base du 5ème métatarsien
            - Pas de douleur à la palpation médio-pied
            - Pas de douleur à la palpation du genou`;
                        break;
            
                    case 'entorse-genou':
                        reportText = `Entorse de genou :
            - Traumatisme en torsion / Hyperextension
            - Douleur et gonflement du genou
            
            Examen clinique :
            - Impotence fonctionnelle partielle
            - Limitation des amplitudes articulaires
            - Epanchement articulaire
            - Douleur à la palpation des ligaments latéraux
            - Genou difficilement examinable ce jour`;
                        break;
            
                    case 'entorse-poignet':
                        reportText = `Entorse de poignet :
            - Traumatisme en hyperextension / flexion forcée
            - Douleur et oedeme du poignet
            
            Examen clinique :
            - Mobilisation du poignet douloureuse
            - Impotence fonctionnelle partielle
            - Œdème localisé
            - Pas de déformation
            - Pas de trouble sensitivo-moteur des doigts
            - Pouls radial présent`;
                        break;
            
                    case 'entorse-doigt':
                        reportText = `Entorse de doigt :
            - Traumatisme en hyperextension / déviation latérale
            - Douleur et oedeme du doigt
            
            Examen clinique :
            - Œdème localisé
            - Douleur à la mobilisation
            - Pas de déformation
            - Stabilité des articulations adjacentes
            - Pas de trouble sensitivo-moteur du doigt`;
                        break;
            
        default:
            reportText = "Texte non défini pour ce favori.";
    }

    document.getElementById('reportText').value = reportText;
    adjustTextareaHeight(document.getElementById('reportText'));
}
