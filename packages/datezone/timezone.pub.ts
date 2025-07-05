// UTC Timezones - single source of truth
const UTC_TIMEZONE_NAMES = [
	"Africa/Abidjan",
	"Africa/Accra",
	"Africa/Bamako",
	"Africa/Banjul",
	"Africa/Bissau",
	"Africa/Conakry",
	"Africa/Dakar",
	"Africa/Freetown",
	"Africa/Lome",
	"Africa/Monrovia",
	"Africa/Nouakchott",
	"Africa/Ouagadougou",
	"Africa/Sao_Tome",
	"America/Danmarkshavn",
	"Atlantic/Reykjavik",
	"Atlantic/St_Helena",
	"Etc/GMT",
	"Etc/GMT-0",
	"Etc/GMT+0",
	"Etc/GMT0",
	"Etc/Greenwich",
	"Etc/UCT",
	"Etc/Universal",
	"Etc/UTC",
	"Etc/Zulu",
	"GMT",
	"GMT-0",
	"GMT+0",
	"GMT0",
	"Greenwich",
	"UCT",
	"UTC",
	"Universal",
	"Zulu",
] as const;

// DST Timezones - single source of truth
const DST_TIMEZONE_NAMES = [
	"America/Adak",
	"America/Anchorage",
	"America/Asuncion",
	"America/Bahia_Banderas",
	"America/Boise",
	"America/Cambridge_Bay",
	"America/Campo_Grande",
	"America/Cancun",
	"America/Chicago",
	"America/Chihuahua",
	"America/Cuiaba",
	"America/Denver",
	"America/Detroit",
	"America/Edmonton",
	"America/Glace_Bay",
	"America/Godthab",
	"America/Goose_Bay",
	"America/Grand_Turk",
	"America/Halifax",
	"America/Havana",
	"America/Indiana/Indianapolis",
	"America/Indiana/Knox",
	"America/Indiana/Marengo",
	"America/Indiana/Petersburg",
	"America/Indiana/Tell_City",
	"America/Indiana/Vevay",
	"America/Indiana/Vincennes",
	"America/Indiana/Winamac",
	"America/Inuvik",
	"America/Iqaluit",
	"America/Juneau",
	"America/Kentucky/Louisville",
	"America/Kentucky/Monticello",
	"America/Los_Angeles",
	"America/Matamoros",
	"America/Mazatlan",
	"America/Menominee",
	"America/Merida",
	"America/Metlakatla",
	"America/Mexico_City",
	"America/Miquelon",
	"America/Moncton",
	"America/Monterrey",
	"America/Montevideo",
	"America/Nassau",
	"America/New_York",
	"America/Nome",
	"America/North_Dakota/Beulah",
	"America/North_Dakota/Center",
	"America/North_Dakota/New_Salem",
	"America/Ojinaga",
	"America/Pangnirtung",
	"America/Port-au-Prince",
	"America/Rainy_River",
	"America/Rankin_Inlet",
	"America/Resolute",
	"America/Santiago",
	"America/Sao_Paulo",
	"America/Scoresbysund",
	"America/Sitka",
	"America/St_Johns",
	"America/Tijuana",
	"America/Toronto",
	"America/Vancouver",
	"America/Whitehorse",
	"America/Winnipeg",
	"America/Yakutat",
	"Antarctica/Macquarie",
	"Antarctica/Troll",
	"Asia/Amman",
	"Asia/Beirut",
	"Asia/Damascus",
	"Asia/Famagusta",
	"Asia/Gaza",
	"Asia/Hebron",
	"Asia/Jerusalem",
	"Asia/Nicosia",
	"Asia/Tehran",
	"Atlantic/Azores",
	"Atlantic/Bermuda",
	"Atlantic/Canary",
	"Atlantic/Faroe",
	"Atlantic/Madeira",
	"Australia/Adelaide",
	"Australia/Broken_Hill",
	"Australia/Currie",
	"Australia/Hobart",
	"Australia/Lord_Howe",
	"Australia/Melbourne",
	"Australia/Sydney",
	"Europe/Amsterdam",
	"Europe/Andorra",
	"Europe/Astrakhan",
	"Europe/Athens",
	"Europe/Belgrade",
	"Europe/Berlin",
	"Europe/Bratislava",
	"Europe/Brussels",
	"Europe/Bucharest",
	"Europe/Budapest",
	"Europe/Busingen",
	"Europe/Chisinau",
	"Europe/Copenhagen",
	"Europe/Dublin",
	"Europe/Gibraltar",
	"Europe/Guernsey",
	"Europe/Helsinki",
	"Europe/Isle_of_Man",
	"Europe/Jersey",
	"Europe/Kaliningrad",
	"Europe/Kiev",
	"Europe/Kirov",
	"Europe/Lisbon",
	"Europe/Ljubljana",
	"Europe/London",
	"Europe/Luxembourg",
	"Europe/Madrid",
	"Europe/Malta",
	"Europe/Mariehamn",
	"Europe/Monaco",
	"Europe/Oslo",
	"Europe/Paris",
	"Europe/Podgorica",
	"Europe/Prague",
	"Europe/Riga",
	"Europe/Rome",
	"Europe/Samara",
	"Europe/San_Marino",
	"Europe/Sarajevo",
	"Europe/Saratov",
	"Europe/Simferopol",
	"Europe/Skopje",
	"Europe/Sofia",
	"Europe/Stockholm",
	"Europe/Tallinn",
	"Europe/Tirane",
	"Europe/Ulyanovsk",
	"Europe/Vaduz",
	"Europe/Vienna",
	"Europe/Vilnius",
	"Europe/Volgograd",
	"Europe/Warsaw",
	"Europe/Zagreb",
	"Europe/Zurich",
	"Pacific/Auckland",
	"Pacific/Chatham",
	"Pacific/Easter",
	"Pacific/Fiji",
	"Pacific/Norfolk",
	"US/Alaska",
	"US/Aleutian",
	"US/Central",
	"US/Eastern",
	"US/Mountain",
	"US/Pacific",
] as const;

// Extract TypeScript types from the arrays
export type UTCTimeZone = (typeof UTC_TIMEZONE_NAMES)[number];
export type DSTTimeZone = (typeof DST_TIMEZONE_NAMES)[number];

// Other timeZones (neither UTC nor DST) - defined as TypeScript union type only
export type OtherTimeZone =
	| "Africa/Addis_Ababa"
	| "Africa/Algiers"
	| "Africa/Asmara"
	| "Africa/Bangui"
	| "Africa/Blantyre"
	| "Africa/Brazzaville"
	| "Africa/Bujumbura"
	| "Africa/Cairo"
	| "Africa/Casablanca"
	| "Africa/Ceuta"
	| "Africa/Dar_es_Salaam"
	| "Africa/Djibouti"
	| "Africa/Douala"
	| "Africa/El_Aaiun"
	| "Africa/Gaborone"
	| "Africa/Harare"
	| "Africa/Johannesburg"
	| "Africa/Juba"
	| "Africa/Kampala"
	| "Africa/Khartoum"
	| "Africa/Kigali"
	| "Africa/Kinshasa"
	| "Africa/Lagos"
	| "Africa/Libreville"
	| "Africa/Luanda"
	| "Africa/Lubumbashi"
	| "Africa/Lusaka"
	| "Africa/Malabo"
	| "Africa/Maputo"
	| "Africa/Maseru"
	| "Africa/Mbabane"
	| "Africa/Mogadishu"
	| "Africa/Nairobi"
	| "Africa/Ndjamena"
	| "Africa/Niamey"
	| "Africa/Porto-Novo"
	| "Africa/Tripoli"
	| "Africa/Tunis"
	| "Africa/Windhoek"
	| "America/Anguilla"
	| "America/Antigua"
	| "America/Araguaina"
	| "America/Argentina/Buenos_Aires"
	| "America/Argentina/Catamarca"
	| "America/Argentina/Cordoba"
	| "America/Argentina/Jujuy"
	| "America/Argentina/La_Rioja"
	| "America/Argentina/Mendoza"
	| "America/Argentina/Rio_Gallegos"
	| "America/Argentina/Salta"
	| "America/Argentina/San_Juan"
	| "America/Argentina/San_Luis"
	| "America/Argentina/Tucuman"
	| "America/Argentina/Ushuaia"
	| "America/Aruba"
	| "America/Atikokan"
	| "America/Bahia"
	| "America/Barbados"
	| "America/Belem"
	| "America/Belize"
	| "America/Blanc-Sablon"
	| "America/Boa_Vista"
	| "America/Bogota"
	| "America/Buenos_Aires"
	| "America/Caracas"
	| "America/Catamarca"
	| "America/Cayenne"
	| "America/Cayman"
	| "America/Coral_Harbour"
	| "America/Cordoba"
	| "America/Costa_Rica"
	| "America/Creston"
	| "America/Curacao"
	| "America/Dawson"
	| "America/Dawson_Creek"
	| "America/Dominica"
	| "America/Eirunepe"
	| "America/El_Salvador"
	| "America/Fort_Nelson"
	| "America/Fortaleza"
	| "America/Grenada"
	| "America/Guadeloupe"
	| "America/Guatemala"
	| "America/Guayaquil"
	| "America/Guyana"
	| "America/Hermosillo"
	| "America/Indianapolis"
	| "America/Jamaica"
	| "America/Jujuy"
	| "America/Knox_IN"
	| "America/Kralendijk"
	| "America/La_Paz"
	| "America/Lima"
	| "America/Louisville"
	| "America/Lower_Princes"
	| "America/Maceio"
	| "America/Managua"
	| "America/Manaus"
	| "America/Marigot"
	| "America/Martinique"
	| "America/Mendoza"
	| "America/Montreal"
	| "America/Montserrat"
	| "America/Nipigon"
	| "America/Noronha"
	| "America/Panama"
	| "America/Paramaribo"
	| "America/Phoenix"
	| "America/Port_of_Spain"
	| "America/Porto_Acre"
	| "America/Porto_Velho"
	| "America/Puerto_Rico"
	| "America/Punta_Arenas"
	| "America/Recife"
	| "America/Regina"
	| "America/Rio_Branco"
	| "America/Rosario"
	| "America/Santa_Isabel"
	| "America/Santarem"
	| "America/Santo_Domingo"
	| "America/Shiprock"
	| "America/St_Barthelemy"
	| "America/St_Kitts"
	| "America/St_Lucia"
	| "America/St_Thomas"
	| "America/St_Vincent"
	| "America/Swift_Current"
	| "America/Tegucigalpa"
	| "America/Thule"
	| "America/Thunder_Bay"
	| "America/Tortola"
	| "America/Virgin"
	| "America/Yellowknife"
	| "Antarctica/Casey"
	| "Antarctica/Davis"
	| "Antarctica/DumontDUrville"
	| "Antarctica/Mawson"
	| "Antarctica/McMurdo"
	| "Antarctica/Palmer"
	| "Antarctica/Rothera"
	| "Antarctica/South_Pole"
	| "Antarctica/Syowa"
	| "Antarctica/Vostok"
	| "Arctic/Longyearbyen"
	| "Asia/Aden"
	| "Asia/Almaty"
	| "Asia/Anadyr"
	| "Asia/Aqtau"
	| "Asia/Aqtobe"
	| "Asia/Ashgabat"
	| "Asia/Ashkhabad"
	| "Asia/Atyrau"
	| "Asia/Baghdad"
	| "Asia/Bahrain"
	| "Asia/Baku"
	| "Asia/Bangkok"
	| "Asia/Barnaul"
	| "Asia/Bishkek"
	| "Asia/Brunei"
	| "Asia/Calcutta"
	| "Asia/Chita"
	| "Asia/Choibalsan"
	| "Asia/Chongqing"
	| "Asia/Chungking"
	| "Asia/Colombo"
	| "Asia/Dacca"
	| "Asia/Dhaka"
	| "Asia/Dili"
	| "Asia/Dubai"
	| "Asia/Dushanbe"
	| "Asia/Harbin"
	| "Asia/Ho_Chi_Minh"
	| "Asia/Hong_Kong"
	| "Asia/Hovd"
	| "Asia/Irkutsk"
	| "Asia/Istanbul"
	| "Asia/Jakarta"
	| "Asia/Jayapura"
	| "Asia/Kabul"
	| "Asia/Kamchatka"
	| "Asia/Karachi"
	| "Asia/Kashgar"
	| "Asia/Kathmandu"
	| "Asia/Katmandu"
	| "Asia/Khandyga"
	| "Asia/Kolkata"
	| "Asia/Krasnoyarsk"
	| "Asia/Kuala_Lumpur"
	| "Asia/Kuching"
	| "Asia/Kuwait"
	| "Asia/Macao"
	| "Asia/Macau"
	| "Asia/Magadan"
	| "Asia/Makassar"
	| "Asia/Manila"
	| "Asia/Muscat"
	| "Asia/Novokuznetsk"
	| "Asia/Novosibirsk"
	| "Asia/Omsk"
	| "Asia/Oral"
	| "Asia/Phnom_Penh"
	| "Asia/Pontianak"
	| "Asia/Pyongyang"
	| "Asia/Qatar"
	| "Asia/Qostanay"
	| "Asia/Qyzylorda"
	| "Asia/Rangoon"
	| "Asia/Riyadh"
	| "Asia/Saigon"
	| "Asia/Sakhalin"
	| "Asia/Samarkand"
	| "Asia/Seoul"
	| "Asia/Shanghai"
	| "Asia/Singapore"
	| "Asia/Srednekolymsk"
	| "Asia/Taipei"
	| "Asia/Tashkent"
	| "Asia/Tbilisi"
	| "Asia/Tel_Aviv"
	| "Asia/Thimbu"
	| "Asia/Thimphu"
	| "Asia/Tokyo"
	| "Asia/Tomsk"
	| "Asia/Ujung_Pandang"
	| "Asia/Ulaanbaatar"
	| "Asia/Ulan_Bator"
	| "Asia/Urumqi"
	| "Asia/Ust-Nera"
	| "Asia/Vientiane"
	| "Asia/Vladivostok"
	| "Asia/Yakutsk"
	| "Asia/Yangon"
	| "Asia/Yekaterinburg"
	| "Asia/Yerevan"
	| "Atlantic/Cape_Verde"
	| "Atlantic/Faeroe"
	| "Atlantic/Jan_Mayen"
	| "Atlantic/South_Georgia"
	| "Atlantic/Stanley"
	| "Australia/ACT"
	| "Australia/Brisbane"
	| "Australia/Canberra"
	| "Australia/Darwin"
	| "Australia/Eucla"
	| "Australia/LHI"
	| "Australia/Lindeman"
	| "Australia/NSW"
	| "Australia/North"
	| "Australia/Perth"
	| "Australia/Queensland"
	| "Australia/South"
	| "Australia/Tasmania"
	| "Australia/Victoria"
	| "Australia/West"
	| "Australia/Yancowinna"
	| "Brazil/Acre"
	| "Brazil/DeNoronha"
	| "Brazil/East"
	| "Brazil/West"
	| "CET"
	| "CST6CDT"
	| "Canada/Atlantic"
	| "Canada/Central"
	| "Canada/Eastern"
	| "Canada/Mountain"
	| "Canada/Newfoundland"
	| "Canada/Pacific"
	| "Canada/Saskatchewan"
	| "Canada/Yukon"
	| "Chile/Continental"
	| "Chile/EasterIsland"
	| "Cuba"
	| "EET"
	| "EST"
	| "EST5EDT"
	| "Egypt"
	| "Eire"
	| "Etc/GMT+1"
	| "Etc/GMT+10"
	| "Etc/GMT+11"
	| "Etc/GMT+12"
	| "Etc/GMT+2"
	| "Etc/GMT+3"
	| "Etc/GMT+4"
	| "Etc/GMT+5"
	| "Etc/GMT+6"
	| "Etc/GMT+7"
	| "Etc/GMT+8"
	| "Etc/GMT+9"
	| "Etc/GMT-1"
	| "Etc/GMT-10"
	| "Etc/GMT-11"
	| "Etc/GMT-12"
	| "Etc/GMT-13"
	| "Etc/GMT-14"
	| "Etc/GMT-2"
	| "Etc/GMT-3"
	| "Etc/GMT-4"
	| "Etc/GMT-5"
	| "Etc/GMT-6"
	| "Etc/GMT-7"
	| "Etc/GMT-8"
	| "Etc/GMT-9"
	| "Europe/Belfast"
	| "Europe/Minsk"
	| "Europe/Moscow"
	| "Europe/Tiraspol"
	| "Europe/Uzhgorod"
	| "Europe/Vatican"
	| "Europe/Zaporozhye"
	| "GB"
	| "GB-Eire"
	| "HST"
	| "Hongkong"
	| "Iceland"
	| "Indian/Antananarivo"
	| "Indian/Chagos"
	| "Indian/Christmas"
	| "Indian/Cocos"
	| "Indian/Comoro"
	| "Indian/Kerguelen"
	| "Indian/Mahe"
	| "Indian/Maldives"
	| "Indian/Mauritius"
	| "Indian/Mayotte"
	| "Indian/Reunion"
	| "Iran"
	| "Israel"
	| "Jamaica"
	| "Japan"
	| "Kwajalein"
	| "Libya"
	| "MET"
	| "MST"
	| "MST7MDT"
	| "Mexico/BajaNorte"
	| "Mexico/BajaSur"
	| "Mexico/General"
	| "NZ"
	| "NZ-CHAT"
	| "Navajo"
	| "PRC"
	| "PST8PDT"
	| "Pacific/Apia"
	| "Pacific/Bougainville"
	| "Pacific/Chuuk"
	| "Pacific/Efate"
	| "Pacific/Enderbury"
	| "Pacific/Fakaofo"
	| "Pacific/Funafuti"
	| "Pacific/Galapagos"
	| "Pacific/Gambier"
	| "Pacific/Guadalcanal"
	| "Pacific/Guam"
	| "Pacific/Honolulu"
	| "Pacific/Johnston"
	| "Pacific/Kiritimati"
	| "Pacific/Kosrae"
	| "Pacific/Kwajalein"
	| "Pacific/Majuro"
	| "Pacific/Marquesas"
	| "Pacific/Midway"
	| "Pacific/Nauru"
	| "Pacific/Niue"
	| "Pacific/Noumea"
	| "Pacific/Pago_Pago"
	| "Pacific/Palau"
	| "Pacific/Pitcairn"
	| "Pacific/Pohnpei"
	| "Pacific/Ponape"
	| "Pacific/Port_Moresby"
	| "Pacific/Rarotonga"
	| "Pacific/Saipan"
	| "Pacific/Samoa"
	| "Pacific/Tahiti"
	| "Pacific/Tarawa"
	| "Pacific/Tongatapu"
	| "Pacific/Truk"
	| "Pacific/Wake"
	| "Pacific/Wallis"
	| "Pacific/Yap"
	| "Poland"
	| "Portugal"
	| "ROC"
	| "ROK"
	| "Turkey"
	| "US/Arizona"
	| "US/East-Indiana"
	| "US/Hawaii"
	| "US/Indiana-Starke"
	| "US/Michigan"
	| "US/Pacific-New"
	| "US/Samoa"
	| "W-SU"
	| "WET";

// Complete TimeZone type - each timeZone appears only once
export type TimeZone = UTCTimeZone | DSTTimeZone | OtherTimeZone;

// Create Sets for O(1) lookup performance
const UTC_TIMEZONES = new Set(UTC_TIMEZONE_NAMES);
const DST_TIMEZONES = new Set(DST_TIMEZONE_NAMES);

/**
 * Checks if utc.
 *
 * @param timeZone - The IANA timeZone identifier to check
 * @returns `true` if the timeZone is UTC, `false` otherwise
 * @see https://datezone.dev/docs/reference/timezone#isUTC
 */
export function isUTC(timeZone: TimeZone): boolean {
	return UTC_TIMEZONES.has(timeZone as UTCTimeZone);
}

/**
 * Checks if dst.
 *
 * @param timeZone - The IANA timeZone identifier to check
 * @returns `true` if the timeZone is a DST timeZone, `false` otherwise
 * @see https://datezone.dev/docs/reference/timezone#isDST
 */
export function isDST(timeZone: TimeZone): boolean {
	return DST_TIMEZONES.has(timeZone as DSTTimeZone);
}
