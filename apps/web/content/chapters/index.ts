export interface ChapterMeta {
	number: number | null
	slug: string
	titleDa: string
	titleSv: string
	printedPages: string
	pdfPages: string
}

export const chapters: ChapterMeta[] = [
	{
		number: null,
		slug: 'indledning',
		titleDa: 'Indledning',
		titleSv: 'Inledning',
		printedPages: '11–21',
		pdfPages: '9–19',
	},
	{
		number: 1,
		slug: '01-bylagets-historie',
		titleDa: 'Bylagets Historie',
		titleSv: 'Byalagets historia',
		printedPages: '22–78',
		pdfPages: '20–76',
	},
	{
		number: 2,
		slug: '02-bylagets-retlige-karakter',
		titleDa: 'Bylagets retlige Karakter',
		titleSv: 'Byalagets rättsliga karaktär',
		printedPages: '79–90',
		pdfPages: '77–88',
	},
	{
		number: 3,
		slug: '03-bylagets-organisation',
		titleDa: 'Bylagets Organisation',
		titleSv: 'Byalagets organisation',
		printedPages: '91–120',
		pdfPages: '89–118',
	},
	{
		number: 4,
		slug: '04-agerbruget',
		titleDa: 'Agerbruget',
		titleSv: 'Jordbruket',
		printedPages: '121–144',
		pdfPages: '119–142',
	},
	{
		number: 5,
		slug: '05-husdyrbruget',
		titleDa: 'Husdyrbruget',
		titleSv: 'Husdjurshållningen',
		printedPages: '145–197',
		pdfPages: '143–195',
	},
	{
		number: 6,
		slug: '06-skovbruget',
		titleDa: 'Skovbruget m. v.',
		titleSv: 'Skogsbruket m.m.',
		printedPages: '198–208',
		pdfPages: '196–206',
	},
	{
		number: 7,
		slug: '07-markfreden',
		titleDa: 'Markfreden',
		titleSv: 'Markfreden',
		printedPages: '209–232',
		pdfPages: '207–230',
	},
	{
		number: 8,
		slug: '08-landskiftets-former',
		titleDa: 'Landskiftets Former og Udvikling',
		titleSv: 'Jordskiftets former och utveckling',
		printedPages: '232–297',
		pdfPages: '230–295',
	},
	{
		number: 9,
		slug: '09-rebningen-og-landskiftet',
		titleDa: 'Rebningen og Landskiftet',
		titleSv: 'Repslagningen och jordskiftet',
		printedPages: '298–342',
		pdfPages: '296–340',
	},
	{
		number: 10,
		slug: '10-bylagets-saglige-kompetence',
		titleDa: 'Bylagets saglige Kompetence',
		titleSv: 'Byalagets sakliga kompetens',
		printedPages: '343–369',
		pdfPages: '341–367',
	},
	{
		number: 11,
		slug: '11-bylagets-stedlige-og-personelle-kompetence',
		titleDa: 'Bylagets stedlige og personelle Kompetence',
		titleSv: 'Byalagets territoriella och personella kompetens',
		printedPages: '370–396',
		pdfPages: '368–394',
	},
	{
		number: 12,
		slug: '12-bylagets-rettergang',
		titleDa: 'Bylagets Rettergang',
		titleSv: 'Byalagets rättegång',
		printedPages: '397–418',
		pdfPages: '395–416',
	},
]
