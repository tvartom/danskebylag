export interface GlossaryEntry {
	da: string
	sv: string
	definition: string
	chapters: number[]
}

export const glossary: GlossaryEntry[] = [
	{
		da: 'Bylag',
		sv: 'Byalag',
		definition: 'Den danska landsbyns gemensamma organisation och rättsliga gemenskap.',
		chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
	},
	{
		da: 'Bystævne',
		sv: 'Bystämma',
		definition: 'Bymöte där alla bymän fattade gemensamma beslut om byns angelägenheter.',
		chapters: [1, 3, 10],
	},
	{
		da: 'Oldermand',
		sv: 'Ålderman',
		definition: 'Byalagets valda ledare som ansvarade för att byns regler följdes.',
		chapters: [1, 3],
	},
	{
		da: 'Vedtægt',
		sv: 'Stadga',
		definition: 'Byalagets lokala bestämmelser och regler, beslutade på bystämman.',
		chapters: [1, 2, 3, 10, 11],
	},
	{
		da: 'Jordfællesskab',
		sv: 'Jordfällesskap',
		definition: 'Det gemensamma brukandet av byns jordresurser under medeltiden och framåt.',
		chapters: [1, 4, 8, 9],
	},
	{
		da: 'Landskifte',
		sv: 'Jordskifte',
		definition: 'Fördelning av byns jordareal mellan dess medlemmar.',
		chapters: [8, 9],
	},
	{
		da: 'Rebning',
		sv: 'Repslagning',
		definition: 'Uppmätning och omfördelning av jord med rep, en medeltida lantmätningsmetod.',
		chapters: [8, 9],
	},
	{
		da: 'Fælled',
		sv: 'Allmänning/fälad',
		definition: 'Gemensam betesmark som delades av byns bönder.',
		chapters: [5],
	},
	{
		da: 'Overdrev',
		sv: 'Utmark',
		definition: 'Ouppodlad mark utanför de odlade fälten, ofta använd som bete.',
		chapters: [5],
	},
	{
		da: 'Vang',
		sv: 'Vång',
		definition: 'Inhägnat åkerfält i byn, del av det medeltida tvåskiftes- eller treskiftessystemet.',
		chapters: [4, 5, 7],
	},
	{
		da: 'Toft',
		sv: 'Tomt',
		definition: 'Gårdstomt i byn, den inhägnade marken närmast bondens hus.',
		chapters: [4],
	},
	{
		da: 'Hegn',
		sv: 'Hägnader/stängsel',
		definition: 'Stängselsystem som skyddade odlad mark mot betande djur.',
		chapters: [7],
	},
	{
		da: 'Markfred',
		sv: 'Markfred',
		definition:
			'Freden som rådde på de odlade fälten under odlingssäsongen, skyddad av stängsel och regler.',
		chapters: [7],
	},
	{
		da: 'Solskifte',
		sv: 'Solskifte',
		definition:
			'Jordfördelningssystem där lotternas ordning följde gårdarnas läge i byn, "efter solens gång".',
		chapters: [8],
	},
	{
		da: 'Bolskifte',
		sv: 'Bolskifte',
		definition: 'Jordfördelning baserad på bol (gårdsenheter) som grund för tilldelning.',
		chapters: [8],
	},
	{
		da: 'Nam',
		sv: 'Nam (utmätning)',
		definition: 'Medeltida exekutionsform där borgenären själv tog gäldenärens egendom.',
		chapters: [12],
	},
	{
		da: 'Pantning',
		sv: 'Pantning',
		definition: 'Beslagtagande av egendom som pant för obetalda böter eller skulder.',
		chapters: [12],
	},
	{
		da: 'Bymand',
		sv: 'Byman',
		definition: 'Fullvärdig medlem av bylaget med rösträtt på bystämman.',
		chapters: [3, 11],
	},
	{
		da: 'Herred',
		sv: 'Härad',
		definition: 'Administrativt och rättsligt distrikt, mellannivå mellan by och landskap.',
		chapters: [1, 10],
	},
	{
		da: 'Landskabslov',
		sv: 'Landskapslag',
		definition: 'De medeltida danska och svenska regionala lagsamlingarna.',
		chapters: [1, 6, 7, 8],
	},
	{
		da: 'Løkke',
		sv: 'Lycka/inhägnad',
		definition: 'Individuellt inhägnad mark, ofta gräsmark, avskild från det gemensamma fältet.',
		chapters: [5],
	},
	{
		da: 'Alsædejord',
		sv: 'Ständigt brukad jord',
		definition: 'Jord som odlades varje år utan träda.',
		chapters: [4],
	},
	{
		da: 'Driftsfællesskab',
		sv: 'Driftsfällesskap',
		definition: 'Gemensam drift av jordbruket där alla bönder måste följa samma odlingsschema.',
		chapters: [4],
	},
	{
		da: 'Stuf',
		sv: 'Stuf',
		definition: 'Jordlott som var undantagen från omfördelning vid rebning.',
		chapters: [9],
	},
	{
		da: 'Særkob',
		sv: 'Särköp',
		definition: 'Individuellt köpt eller förvärvad jord, undantagen från jordfällesskapet.',
		chapters: [9],
	},
	{
		da: 'Innam',
		sv: 'Innam',
		definition: 'Rätt att kvarhålla annans kreatur som kommit in på ens mark.',
		chapters: [12],
	},
	{
		da: 'Aarsskifte',
		sv: 'Årsskifte',
		definition: 'Jordfördelningssystem med årlig omfördelning av odlingslotter.',
		chapters: [8],
	},
]
