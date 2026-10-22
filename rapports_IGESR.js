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
	"lastUpdated": "2026-10-22 09:08:14"
}

const MOIS = {
	janvier: '01', février: '02', fevrier: '02', mars: '03', avril: '04',
	mai: '05', juin: '06', juillet: '07', août: '08', aout: '08',
	septembre: '09', octobre: '10', novembre: '11', décembre: '12', decembre: '12'
};

function detectWeb(doc, url) {
	for (let h of doc.querySelectorAll('h2')) {
		if (/Télécharger\s+le\s+rapport/i.test(h.textContent)) {
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
				if (name) {
					names.push(name);
					}
			}
		}
	}
	for (let name of names) {
		item.creators.push(ZU.cleanAuthor(name, 'author'));
	}

	// Numéro et date : « Rapport n° 24-25 047A, juin 2026 »
	let ref = '';
	for (let p of doc.querySelectorAll('.fr-card--download p')) {
		let t = p.textContent.trim();
		if (/^Rapport\s+n\s*°/i.test(t)) {
			ref = t;
			break;
		}
	}
	let m = ref.match(/^Rapport\s+n\s*°\s*([^,]+?)\s*(?:,\s*(.+))?$/i);
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
		"url": "https://www.education.gouv.fr/igesr/l-accessibilite-des-apprentissages-une-ecole-pour-tous-et-par-tous-506008",
		"items": [
			{
				"itemType": "report",
				"title": "L’accessibilité des apprentissages : une École pour tous et par tous",
				"creators": [],
				"date": "2026-07",
				"abstractNote": "Vingt ans après la loi du 11 février 2005, le rapport de l'IGÉSR L'accessibilité des apprentissages : une École pour tous et par tous met en évidence les progrès considérables accomplis en matière de scolarisation des élèves en situation de handicap. Il souligne toutefois que ces avancées ne se traduisent pas encore par une pleine accessibilité des apprentissages et des parcours scolaires.",
				"institution": "IGÉSR",
				"language": "fr",
				"libraryCatalog": "IGESR",
				"place": "Paris",
				"reportNumber": "25-26 009B",
				"reportType": "Rapport d'inspection générale",
				"shortTitle": "L’accessibilité des apprentissages",
				"url": "https://www.education.gouv.fr/igesr/l-accessibilite-des-apprentissages-une-ecole-pour-tous-et-par-tous-506008",
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
