const stopWords = [
  "a",
  "acaba",
  "altı",
  "altmış",
  "ama",
  "ancak",
  "arada",
  "artık",
  "asla",
  "aslında",
  "aslında",
  "ayrıca",
  "az",
  "bana",
  "bazen",
  "bazı",
  "bazıları",
  "belki",
  "ben",
  "benden",
  "beni",
  "benim",
  "beri",
  "beş",
  "bile",
  "bilhassa",
  "bin",
  "bir",
  "biraz",
  "birçoğu",
  "birçok",
  "biri",
  "birisi",
  "birkaç",
  "birşey",
  "biz",
  "bizden",
  "bize",
  "bizi",
  "bizim",
  "böyle",
  "böylece",
  "bu",
  "buna",
  "bunda",
  "bundan",
  "bunlar",
  "bunları",
  "bunların",
  "bunu",
  "bunun",
  "burada",
  "bütün",
  "çoğu",
  "çoğunu",
  "çok",
  "çünkü",
  "da",
  "daha",
  "dahi",
  "dan",
  "de",
  "defa",
  "değil",
  "diğer",
  "diğeri",
  "diğerleri",
  "diye",
  "doksan",
  "dokuz",
  "dolayı",
  "dolayısıyla",
  "dört",
  "e",
  "edecek",
  "eden",
  "ederek",
  "edilecek",
  "ediliyor",
  "edilmesi",
  "ediyor",
  "eğer",
  "elbette",
  "elli",
  "en",
  "etmesi",
  "etti",
  "ettiği",
  "ettiğini",
  "fakat",
  "falan",
  "filan",
  "gene",
  "gereği",
  "gerek",
  "gibi",
  "göre",
  "hala",
  "halde",
  "halen",
  "hangi",
  "hangisi",
  "hani",
  "hatta",
  "hem",
  "henüz",
  "hep",
  "hepsi",
  "her",
  "herhangi",
  "herkes",
  "herkese",
  "herkesi",
  "herkesin",
  "hiç",
  "hiçbir",
  "hiçbiri",
  "i",
  "ı",
  "için",
  "içinde",
  "iki",
  "ile",
  "ilgili",
  "ise",
  "işte",
  "itibaren",
  "itibariyle",
  "kaç",
  "kadar",
  "karşın",
  "kendi",
  "kendilerine",
  "kendine",
  "kendini",
  "kendisi",
  "kendisine",
  "kendisini",
  "kez",
  "ki",
  "kim",
  "kime",
  "kimi",
  "kimin",
  "kimisi",
  "kimse",
  "kırk",
  "madem",
  "mi",
  "mı",
  "milyar",
  "milyon",
  "mu",
  "mü",
  "nasıl",
  "ne",
  "neden",
  "nedenle",
  "nerde",
  "nerede",
  "nereye",
  "neyse",
  "niçin",
  "nin",
  "nın",
  "niye",
  "nun",
  "nün",
  "o",
  "öbür",
  "olan",
  "olarak",
  "oldu",
  "olduğu",
  "olduğunu",
  "olduklarını",
  "olmadı",
  "olmadığı",
  "olmak",
  "olması",
  "olmayan",
  "olmaz",
  "olsa",
  "olsun",
  "olup",
  "olur",
  "olur",
  "olursa",
  "oluyor",
  "on",
  "ön",
  "ona",
  "önce",
  "ondan",
  "onlar",
  "onlara",
  "onlardan",
  "onları",
  "onların",
  "onu",
  "onun",
  "orada",
  "öte",
  "ötürü",
  "otuz",
  "öyle",
  "oysa",
  "pek",
  "rağmen",
  "sana",
  "sanki",
  "sanki",
  "şayet",
  "şekilde",
  "sekiz",
  "seksen",
  "sen",
  "senden",
  "seni",
  "senin",
  "şey",
  "şeyden",
  "şeye",
  "şeyi",
  "şeyler",
  "şimdi",
  "siz",
  "siz",
  "sizden",
  "sizden",
  "size",
  "sizi",
  "sizi",
  "sizin",
  "sizin",
  "sonra",
  "şöyle",
  "şu",
  "şuna",
  "şunları",
  "şunu",
  "ta",
  "tabii",
  "tam",
  "tamam",
  "tamamen",
  "tarafından",
  "trilyon",
  "tüm",
  "tümü",
  "u",
  "ü",
  "üç",
  "un",
  "ün",
  "üzere",
  "var",
  "vardı",
  "ve",
  "veya",
  "ya",
  "yani",
  "yapacak",
  "yapılan",
  "yapılması",
  "yapıyor",
  "yapmak",
  "yaptı",
  "yaptığı",
  "yaptığını",
  "yaptıkları",
  "ye",
  "yedi",
  "yerine",
  "yetmiş",
  "yi",
  "yı",
  "yine",
  "yirmi",
  "yoksa",
  "yu",
  "yüz",
  "zaten",
  "zira",
];
