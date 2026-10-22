{
	"translatorID": "bcca48cb-59dc-4563-8b1b-0602d5511fc0",
	"label": "IGESR",
	"creator": "Maite.deroubaix",
	"target": "^https?://www\\.education\\.gouv\\.fr/igesr/[^/?#]+-\\d+$",
	"minVersion": "5.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2026-10-22 16:42:14"
}

const MOIS = {
	janvier: '01', février: '02', fevrier: '02', mars: '03', avril: '04',
	mai: '05', juin: '06', juillet: '07', août: '08', aout: '08',
	septembre: '09', octobre: '10', novembre: '11', décembre: '12', decembre: '12'
};

function detectWeb(doc, url) {
	for (let h of doc.querySelectorAll('h2')) {
		if (/Télécharge(?:r|z)\s+le\s+rapport/i.test(h.textContent)) {
			return 'report';
		}
	}
	return false;
}

async function doWeb(doc, url) {
	let item = new Zotero.Item('report');

	item.title = text(doc, 'h1');
	item.abstractNote = attr(doc, 'meta[name="description"]', 'content');
	item.url = url;
	item.institution = 'IGÉSR';
	item.place = 'Paris';
	item.reportType = 'Rapport d\'inspection générale';
	item.language = 'fr';

	// Auteurs
	let names = [];
let block = doc.querySelector('.fr-highlight');
if (block && /auteurs/i.test(block.textContent)) {
	for (let li of block.querySelectorAll('li')) {
		for (let name of li.textContent.split(',')) {
			name = name.replace(/\(.*?\)/g, '').trim();
			if (name && !/^(co-?)?pilotes?$/i.test(name) && /\p{Ll}/u.test(name)) {
				names.push(name);
			}
		}
	}
}
for (let name of names) {
	item.creators.push(ZU.cleanAuthor(name, 'author'));
}

	// Numéro et date : « Rapport IGESR-IGF n°23-24 004A, juin 2026 »
let ref = '';
for (let p of doc.querySelectorAll('.fr-card--download p')) {
	// Normalise : espaces insécables et espaces multiples → un seul espace simple
	let t = p.textContent.replace(/[\u00A0\u202F]/g, ' ').replace(/\s+/g, ' ').trim();
	if (/^Rapport\b[^,]*?\bn\s*[°º˚]/i.test(t)) {
		ref = t;
		break;
	}
}
let m = ref.match(/^Rapport\b[^,]*?\bn\s*[°º˚]\s*([^,]+?)\s*(?:,\s*(.+))?$/i);
if (m) {
	item.reportNumber = m[1];
	let dateStr = m[2] || '';
	let d = dateStr.match(/([A-Za-zéûÉ]+)\s+(\d{4})/);
	if (d && MOIS[d[1].toLowerCase()]) {
		item.date = d[2] + '-' + MOIS[d[1].toLowerCase()];
	}
	else if (/^\d{4}$/.test(dateStr.trim())) {
		item.date = dateStr.trim();
	}
}

	// PDF
	let pdf = doc.querySelector('.fr-card--download a.fr-link');
	if (pdf) {
		item.attachments.push({
			title: 'Texte intégral (PDF)',
			mimeType: 'application/pdf',
			url: pdf.href
		});
	}
	item.attachments.push({
		title: 'Snapshot',
		document: doc
	});

	item.complete();
}

/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "https://www.education.gouv.fr/igesr/filles-et-mathematiques-lutter-contre-les-stereotypes-ouvrir-le-champ-des-possibles-465606",
		"items": [
			{
				"itemType": "report",
				"title": "Filles et mathématiques : lutter contre les stéréotypes, ouvrir le champ des possibles",
				"creators": [
					{
						"firstName": "Olivier",
						"lastName": "Sidokpohou",
						"creatorType": "author"
					},
					{
						"firstName": "Michaël",
						"lastName": "Ohier",
						"creatorType": "author"
					},
					{
						"firstName": "Catherine",
						"lastName": "Sueur",
						"creatorType": "author"
					},
					{
						"firstName": "Xavier",
						"lastName": "Gauchard",
						"creatorType": "author"
					},
					{
						"firstName": "Bénédicte",
						"lastName": "Robert",
						"creatorType": "author"
					},
					{
						"firstName": "Nathalie",
						"lastName": "Sayac",
						"creatorType": "author"
					},
					{
						"firstName": "Jérôme",
						"lastName": "Tourbeaux",
						"creatorType": "author"
					},
					{
						"firstName": "Valentin",
						"lastName": "Melot",
						"creatorType": "author"
					},
					{
						"firstName": "Agathe",
						"lastName": "Rosenzweig",
						"creatorType": "author"
					}
				],
				"date": "2025-02",
				"abstractNote": "Après une progression régulière jusqu’à la fin des années 2000, la proportion de femmes dans les études de mathématiques, physique-chimie, informatique et sciences de l’ingénieur (dites STEM) plafonne à un faible niveau depuis une dizaine d’années. Le rapport formule des propositions visant à faire progresser significativement la part de filles dans les études scientifiques et dans les métiers qui",
				"institution": "IGÉSR",
				"language": "fr",
				"libraryCatalog": "IGESR",
				"place": "Paris",
				"reportNumber": "24-25 0038",
				"reportType": "Rapport d'inspection générale",
				"shortTitle": "Filles et mathématiques",
				"url": "https://www.education.gouv.fr/igesr/filles-et-mathematiques-lutter-contre-les-stereotypes-ouvrir-le-champ-des-possibles-465606",
				"attachments": [
					{
						"title": "Texte intégral (PDF)",
						"mimeType": "application/pdf"
					},
					{
						"title": "Snapshot",
						"mimeType": "text/html"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://www.education.gouv.fr/igesr/enseigner-le-lexique-l-ecole-primaire-505410",
		"items": [
			{
				"itemType": "report",
				"title": "Enseigner le lexique à l’école primaire",
				"creators": [
					{
						"firstName": "Florence",
						"lastName": "Imokrane",
						"creatorType": "author"
					},
					{
						"firstName": "Fabrice",
						"lastName": "Poli",
						"creatorType": "author"
					},
					{
						"firstName": "Ariane",
						"lastName": "Azéma",
						"creatorType": "author"
					},
					{
						"firstName": "Bénédicte",
						"lastName": "Abraham",
						"creatorType": "author"
					},
					{
						"firstName": "Robin",
						"lastName": "Bosdeveix",
						"creatorType": "author"
					},
					{
						"firstName": "Bruno",
						"lastName": "Claval",
						"creatorType": "author"
					},
					{
						"firstName": "Jean-Michel",
						"lastName": "Coignard",
						"creatorType": "author"
					},
					{
						"firstName": "Ollivier",
						"lastName": "Hunault",
						"creatorType": "author"
					},
					{
						"firstName": "Thomas",
						"lastName": "Leroux",
						"creatorType": "author"
					},
					{
						"firstName": "Laurence",
						"lastName": "Loeffel",
						"creatorType": "author"
					},
					{
						"firstName": "François",
						"lastName": "Micheletti",
						"creatorType": "author"
					},
					{
						"firstName": "Caroline",
						"lastName": "Moreau-Fauvarque",
						"creatorType": "author"
					},
					{
						"firstName": "Catherine",
						"lastName": "Mottet",
						"creatorType": "author"
					},
					{
						"firstName": "Armelle",
						"lastName": "Poutrel",
						"creatorType": "author"
					},
					{
						"firstName": "Nathalie",
						"lastName": "Sayac",
						"creatorType": "author"
					},
					{
						"firstName": "François",
						"lastName": "Vandenbrouck",
						"creatorType": "author"
					},
					{
						"firstName": "Nathalie",
						"lastName": "Vilacèque",
						"creatorType": "author"
					}
				],
				"date": "2026-06",
				"abstractNote": "Comment permettre à chaque élève de s’approprier les mots nécessaires pour comprendre, apprendre, penser et s’exprimer ? Le rapport de l’IGÉSR relatif à l’enseignement du lexique à l’école primaire apporte des éléments d’analyse et de réflexion pour éclairer les pratiques pédagogiques et leur pilotage.",
				"institution": "IGÉSR",
				"language": "fr",
				"libraryCatalog": "IGESR",
				"place": "Paris",
				"reportNumber": "24-25 047A",
				"reportType": "Rapport d'inspection générale",
				"url": "https://www.education.gouv.fr/igesr/enseigner-le-lexique-l-ecole-primaire-505410",
				"attachments": [
					{
						"title": "Texte intégral (PDF)",
						"mimeType": "application/pdf"
					},
					{
						"title": "Snapshot",
						"mimeType": "text/html"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	},
	{
		"type": "web",
		"url": "https://www.education.gouv.fr/igesr/modele-economique-des-etablissements-publics-de-l-enseignement-superieur-469886",
		"items": [
			{
				"itemType": "report",
				"title": "Modèle économique des établissements publics de l’enseignement supérieur",
				"creators": [
					{
						"firstName": "Olivier",
						"lastName": "Engel",
						"creatorType": "author"
					},
					{
						"firstName": "Dominique",
						"lastName": "Kervadec",
						"creatorType": "author"
					},
					{
						"firstName": "Brice",
						"lastName": "Lannaud",
						"creatorType": "author"
					},
					{
						"firstName": "François",
						"lastName": "Werner",
						"creatorType": "author"
					},
					{
						"firstName": "Bruno",
						"lastName": "Kerhuel",
						"creatorType": "author"
					},
					{
						"firstName": "Anouk",
						"lastName": "Canet",
						"creatorType": "author"
					},
					{
						"firstName": "Benjamin",
						"lastName": "Huin-Morales",
						"creatorType": "author"
					},
					{
						"firstName": "Katia Jodogne-del",
						"lastName": "Litto",
						"creatorType": "author"
					}
				],
				"date": "2025-01",
				"abstractNote": "Quel est le contexte financier des établissements publics de l’enseignement supérieur ? Quels sont les leviers de développement de leurs ressources propres ? Peut-on envisager des pistes d’évolution relatives aux droits d’inscription en formation initiale ?",
				"institution": "IGÉSR",
				"language": "fr",
				"libraryCatalog": "IGESR",
				"place": "Paris",
				"reportNumber": "23-24-296A",
				"reportType": "Rapport d'inspection générale",
				"url": "https://www.education.gouv.fr/igesr/modele-economique-des-etablissements-publics-de-l-enseignement-superieur-469886",
				"attachments": [
					{
						"title": "Texte intégral (PDF)",
						"mimeType": "application/pdf"
					},
					{
						"title": "Snapshot",
						"mimeType": "text/html"
					}
				],
				"tags": [],
				"notes": [],
				"seeAlso": []
			}
		]
	}
]
/** END TEST CASES **/
