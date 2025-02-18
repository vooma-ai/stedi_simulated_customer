export const lookupFunctionalIdentifierCode = (
  transactionSet: string
): string => {
  const code = functionalIdentifierCodeLookup[transactionSet];

  if (code === undefined)
    throw new Error(
      `No functional identifier code found for '${transactionSet}'`
    );

  return code;
};

const functionalIdentifierCodeLookup: Record<string, string | undefined> = {
  "100": "PG",
  "101": "NL",
  "102": "AC",
  "103": "AB",
  "104": "SA",
  "105": "BF",
  "106": "MH",
  "107": "MC",
  "108": "MK",
  "109": "VE",
  "110": "IA",
  "111": "IF",
  "112": "PQ",
  "113": "CL",
  "120": "VC",
  "121": "VS",
  "124": "VD",
  "125": "MR",
  "126": "VA",
  "127": "VB",
  "128": "DI",
  "129": "VH",
  "130": "ED",
  "131": "AK",
  "132": "HU",
  "133": "CW",
  "135": "SL",
  "138": "TT",
  "139": "SL",
  "140": "WA",
  "141": "WA",
  "142": "WA",
  "143": "WA",
  "144": "LT",
  "146": "RY",
  "147": "RZ",
  "148": "IJ",
  "149": "NT",
  "150": "TN",
  "151": "TA",
  "152": "GR",
  "153": "CB",
  "154": "UC",
  "155": "BC",
  "157": "NP",
  "158": "TJ",
  "159": "MP",
  "160": "SJ",
  "161": "TR",
  "163": "AS",
  "170": "ER",
  "175": "FC",
  "176": "FC",
  "179": "EP",
  "180": "AN",
  "185": "RD",
  "186": "UW",
  "187": "AE",
  "188": "EC",
  "189": "AF",
  "190": "SV",
  "191": "SD",
  "194": "GT",
  "195": "LA",
  "196": "PK",
  "197": "TO",
  "198": "ME",
  "199": "TO",
  "200": "ME",
  "201": "ME",
  "202": "MJ",
  "203": "MG",
  "204": "SM",
  "205": "MN",
  "206": "MG",
  "210": "IM",
  "211": "BL",
  "212": "TM",
  "213": "MI",
  "214": "QM",
  "215": "UP",
  "216": "PU",
  "217": "FG",
  "219": "AB",
  "220": "AH",
  "222": "CE",
  "223": "MQ",
  "224": "MA",
  "225": "MY",
  "227": "TU",
  "228": "EN",
  "240": "MZ",
  "242": "DS",
  "244": "PN",
  "245": "ME",
  "248": "SU",
  "249": "AT",
  "250": "PV",
  "251": "CP",
  "252": "IE",
  "255": "UI",
  "256": "PE",
  "259": "MG",
  "260": "MG",
  "261": "ME",
  "262": "ME",
  "263": "ME",
  "264": "MG",
  "265": "TO",
  "266": "MG",
  "267": "AD",
  "268": "PF",
  "269": "HV",
  "270": "HS",
  "271": "HB",
  "272": "LN",
  "273": "ID",
  "274": "PW",
  "275": "PI",
  "276": "HR",
  "277": "HN",
  "278": "HI",
  "280": "VI",
  "283": "TE",
  "284": "IH",
  "285": "CV",
  "286": "KM",
  "288": "WI",
  "290": "CO",
  "300": "RO",
  "301": "RO",
  "303": "RO",
  "304": "SO",
  "309": "AQ",
  "310": "IO",
  "311": "SO",
  "312": "IO",
  "313": "QO",
  "315": "QO",
  "317": "SO",
  "319": "SO",
  "322": "SO",
  "323": "SO",
  "324": "SO",
  "325": "SO",
  "326": "SO",
  "350": "AU",
  "352": "AV",
  "353": "AX",
  "354": "AY",
  "355": "AZ",
  "356": "BA",
  "357": "BB",
  "358": "BD",
  "359": "BG",
  "361": "SO",
  "362": "OC",
  "404": "SR",
  "410": "IR",
  "412": "TB",
  "414": "CR",
  "417": "WB",
  "418": "IC",
  "419": "SR",
  "420": "CH",
  "421": "IS",
  "422": "DM",
  "423": "RL",
  "424": "SB",
  "425": "WT",
  "426": "RW",
  "429": "RU",
  "431": "RM",
  "432": "RX",
  "433": "RH",
  "434": "RJ",
  "435": "RK",
  "436": "LI",
  "437": "RV",
  "440": "WR",
  "451": "EV",
  "452": "PL",
  "453": "ST",
  "455": "PB",
  "456": "EI",
  "460": "TP",
  "463": "TP",
  "466": "TP",
  "468": "TP",
  "470": "RB",
  "475": "SN",
  "485": "TP",
  "486": "TP",
  "490": "TP",
  "492": "TP",
  "494": "TP",
  "500": "MM",
  "501": "WG",
  "503": "PH",
  "504": "CC",
  "511": "RN",
  "517": "MV",
  "521": "AO",
  "527": "MD",
  "536": "LR",
  "540": "ES",
  "561": "D4",
  "567": "D3",
  "568": "D5",
  "601": "SE",
  "603": "EO",
  "620": "EX",
  "625": "WL",
  "650": "MO",
  "715": "GL",
  "753": "RF",
  "754": "RG",
  "805": "CP",
  "806": "PJ",
  "810": "IN",
  "811": "CI",
  "812": "CD",
  "813": "TF",
  "814": "GE",
  "815": "CS",
  "816": "OR",
  "818": "RP",
  "819": "JB",
  "820": "RA",
  "821": "FR",
  "822": "AA",
  "823": "LB",
  "824": "AG",
  "826": "TI",
  "827": "FR",
  "828": "DA",
  "829": "PY",
  "830": "PS",
  "831": "CT",
  "832": "SC",
  "833": "ME",
  "834": "BE",
  "835": "HP",
  "836": "RQ",
  "837": "HC",
  "838": "TD",
  "839": "PK",
  "840": "RQ",
  "841": "SP",
  "842": "NC",
  "843": "RR",
  "844": "CF",
  "845": "PA",
  "846": "IB",
  "847": "MX",
  "848": "MS",
  "849": "CF",
  "850": "PO",
  "851": "LS",
  "852": "PD",
  "853": "RI",
  "854": "DD",
  "855": "PR",
  "856": "SH",
  "857": "BS",
  "858": "SI",
  "859": "FB",
  "860": "PC",
  "861": "RC",
  "862": "SS",
  "863": "RT",
  "864": "TX",
  "865": "CA",
  "866": "SQ",
  "867": "PT",
  "868": "MT",
  "869": "RS",
  "870": "RS",
  "872": "ME",
  "873": "CU",
  "874": "CQ",
  "875": "OG",
  "876": "OG",
  "877": "CJ",
  "878": "QG",
  "879": "QG",
  "880": "GP",
  "881": "CN",
  "882": "IG",
  "883": "DF",
  "884": "MF",
  "885": "UA",
  "886": "UB",
  "887": "CN",
  "888": "QG",
  "889": "QG",
  "890": "D4",
  "891": "UD",
  "892": "WG",
  "893": "AM",
  "894": "DX",
  "895": "DX",
  "896": "QG",
  "897": "SC",
  "920": "GC",
  "924": "GC",
  "925": "GC",
  "926": "GC",
  "928": "AI",
  "940": "OW",
  "943": "AR",
  "944": "RE",
  "945": "SW",
  "947": "AW",
  "990": "GF",
  "993": "NR",
  "996": "FT",
  "997": "FA",
  "998": "AL",
};
