'use client';

import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  Footprints, 
  Waves, 
  Activity, 
  Stethoscope, 
  UserRound, 
  Dna,
  Calendar,
  Phone,
  ArrowRight,
  ChevronDown,
  Mail,
  MapPin,
  Star,
  Quote
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import Lenis from 'lenis';

// --- Types ---
interface Service {
  title: string;
  description: string;
  icon: any;
  bulletPoints?: string[];
  color: string;
}

interface PriceItem {
  service: string;
  time: string;
  price: string;
  note?: boolean;
}

interface Testimonial {
  name: string;
  date: string;
  text: string;
  rating: number;
}

const CATEGORIES = [
  "SMsystém", "Mulligan koncept", "Bankovanie", 
  "Terapia pri poruchách vestibulárneho aparátu", "Terapia suchou ihlou",
  "Spiral Dynamic", "Terapia podľa MUDr.Tichého", "Flossing", 
  "Tejpovanie", "Manuálne techniky podľa MUDr.Smíška",
  "Mojžišova metóda", "Terapia pre tehotné", "Oslabené panvové dno", 
  "Diastáza", "Fyzioterapia pre deti od 3 rokov", "Myofascialna terapia"
];

const SERVICES: Service[] = [
  {
    title: "Podologická ambulancia",
    description: "Podologická ambulancia je špecializované pracovisko zamerané na komplexnú starostlivosť o chodidlá. Poskytujeme odbornú diagnostiku, liečbu a prevenciu problémov pohybového aparátu, ktoré začínajú práve v oblasti chodidiel. Mojim cieľom je zlepšiť kvalitu života detí aj dospelých prostredníctvom moderných a účinných metód.",
    bulletPoints: [
      "Riešenie problémov ako ploché nohy, nesprávny vývin klenby či deformácie chodidiel.",
      "Prevencia komplikácií, ktoré môžu ovplyvniť celkový vývoj pohybového aparátu.",
      "VASYLI a FOOTWAVE vložky: Tieto špičkové ortopedické vložky poskytujú podporu chodidlám, pomáhajú zmierňovať bolesti a korigovať nesprávne postavenie chodidla.",
      "Podologická ambulancia je súčasťou širšieho spektra rehabilitačných služieb, čo mi umožňuje prepojiť starostlivosť o chodidlá s fyzioterapiou."
    ],
    icon: Footprints,
    color: "bg-[#ffdfe7]"
  },
  {
    title: "Rázová vlna",
    description: "Indikácie na liečbu rázovou vlnou sú:",
    bulletPoints: [
      "Bolesti v oblasti päty: ostroha pätovej kosti, plantárna fascitída, výrastok na zadnej ploche calcaneu.",
      "Bolesti v oblasti Achillovej šľachy: zápal okolia šľachy, achilodýnia, peritenonitis achillea.",
      "Bolesti úponu šliach v oblasti kolena: takzvané skokanské koleno, bolestivé slabiny (entesopatia adduktorov), bolesť úponu hamstringov.",
      "Bolesti v oblasti ramenného kĺbu: bursitis calcarea, kalcifikujúca tendinitída.",
      "Bolesti úponu šliach v oblasti lakťového kĺbu: epikondylitis (lakťový, golfový lakeť).",
      "Karpálny tunel, exostózy kĺbov ruky, akútne a chronické bolesti chrbta.",
      "Poúrazové stavy, poranenia veľkých svalov, artritída, bursitídy."
    ],
    icon: Waves,
    color: "bg-[#ffffe0]"
  },
  {
    title: "SM systém",
    description: "Metóda sa používa u pacientov s bolesťami chrbtice, s akútnym vyklenutím disku (platničky) a skoliózou. Cvičenie má tiež veľký význam pri prevencii a liečbe porúch veľkých kĺbov.",
    bulletPoints: [
      "Hlavný efekt metódy je vyvolanie trakčnej (naťahovacej) sily v oblasti medzistavcových platničiek.",
      "SM Systém je systematická starostlivosť o pohybový aparát človeka a funkciu vnútorných orgánov.",
      "Prepája rehabilitačnú liečbu s prevenciou, regeneráciou a kondičným tréningom."
    ],
    icon: Activity,
    color: "bg-[#e1f6ff]"
  },
  {
    title: "Terapia vestibulárnych porúch - VERTIGO",
    description: "Najčastejšie sa vyskytuje medzi 50 a 70 rokom života (ženy sú postihnuté 2x častejšie ako muži).",
    bulletPoints: [
      "Spôsobené uvoľnením otolytov (kryštálikov v kanálikoch) a ich následnou sedimentáciou.",
      "Manifestuje sa záchvatmi závratov, ktoré trvajú minúty až hodiny.",
      "Sú sprevádzané vegetatívnymi príznakmi a môže sa vyskytnúť nystagmus."
    ],
    icon: Stethoscope,
    color: "bg-[#edf2ff]"
  },
  {
    title: "Terapia suchou ihlou",
    description: "Vhodná pri liečbe akútnych a chronických bolestí hlavy, krku, krížov, stuhnutého pleca, syndrómu karpálneho tunela a Achillovej šľachy.",
    bulletPoints: [
      "Spastické body sa nachádzajú hlbšie vo svaloch a utláčajú cievy a nervové vlákna.",
      "Ihla naruší stiahnuté alebo prekrížené vlákna a prichádza k okamžitej úľave.",
      "Úľava prichádza okamžite resp. do niekoľkých hodín. Spúšťový bod sa deaktivuje."
    ],
    icon: Dna,
    color: "bg-[#e4ffec]"
  },
  {
    title: "Mulligan koncept",
    description: "Metóda je založená na využití množstva techniek NAG, SNG, MWM.",
    bulletPoints: [
      "Priame pôsobenie zamerané na kĺby a artikulárny systém.",
      "Nepriame pôsobenie vplýva na nervovo-svalovú sústavu.",
      "Najdôležitejšou zásadou metódy je, že pohyb nesmie nikdy vyvolávať dráždenie či bolestivé pocity."
    ],
    icon: UserRound,
    color: "bg-[#edf2ff]"
  }
];

const PRICES: PriceItem[] = [
  { service: "Vstupné vyšetrenie + terapia", time: "55 min.", price: "60 EUR" },
  { service: "Vstupné vyšetrenie detí do 15r. + terapia", time: "55 min.", price: "40 EUR" },
  { service: "Manuálna terapia a cvičenie", time: "55 min.", price: "40 EUR" },
  { service: "Bezbolestná rázová vlna jedna lokalita + manuálna terapia", time: "55 min.", price: "60 EUR" },
  { service: "Bezbolestná rázová vlna s diatermiou - jedna lokalita", time: "25 min.", price: "35 EUR" },
  { service: "Rehabilitácia detí (do 15 r.)", time: "50 min.", price: "35 EUR" },
  { service: "Konzultácia", time: "30 min.", price: "25 EUR" },
  { service: "Podiatrické vyšetrenie dieťa 3-8 rokov", time: "30 min.", price: "35 EUR" },
  { service: "Podiatrická kontrola", time: "30 min.", price: "30 EUR" },
  { service: "Podiatrické vyšetrenie dieťa do 14r", time: "30 min.", price: "35 EUR" },
  { service: "Podiatrické vyšetrenie dospelý", time: "45 min.", price: "45 EUR" },
  { service: "Podiatrická kontrola dospelý", time: "40 min.", price: "40 EUR" },
  { service: "Nevyužitý termín bez ospravedlnenia", time: "-", price: "20 EUR", note: true },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ing. Lukáš Švončinár",
    date: "2025-04-11",
    rating: 5,
    text: "Veľká spokojnosť – p. Bayerová mala skvelý prístup, všetko mi vysvetlila, zodpovedala otázky a vidno, že jej na ľuďoch naozaj záleží. Je mimoriadne milá, profesionálna a cítiť, že ju jej práca baví."
  },
  {
    name: "Maria Kobelova",
    date: "2025-02-10",
    rating: 5,
    text: "Mala som problém s krčnou chrbticou, jej profesionálnym prístupom ma oslobodila od operácie. Verím, že to tak aj zostane. Plne odporúčam."
  },
  {
    name: "Jana",
    date: "2024-11-15",
    rating: 5,
    text: "Barborka je erudovaná fyzioterapeutka s x-ročnými skúsenosťami. Pomohla mi s problémom, ktorý mi spôsoboval silné migrény. Navštevujem ju pravidelne."
  }
];

const SLIDER_IMAGES = [
  "/PHOTO-2025-03-19-17-57-52.jpg",
  "/PHOTO-2025-03-19-17-57-52-2.jpg",
  "/PHOTO-2025-03-19-17-57-52-3.jpg",
  "/72327360_2330981777119794_5927892305498341376_n.jpg"
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("SMsystém");
  const [scrolled, setScrolled] = useState(false);
  const [sliderIdx, setSliderIdx] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* --- Navigation --- */}
      <header className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-20 flex items-center shadow-sm",
        scrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-100" : "bg-transparent border-transparent"
      )}>
        <nav className="max-w-[90vw] mx-auto w-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image 
              src="/images/logo.png" 
              alt="Logo" 
              width={40} 
              height={40} 
              className={cn("w-10 h-10 object-contain", !scrolled && "brightness-0 invert")} 
            />
            <span className={cn("text-xl font-bold tracking-tight", scrolled ? "text-[#003a8c]" : "text-white")}>
              FyzioTT
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-8">
            {["SLUŽBY", "O MNE", "RECENZIE", "GALÉRIA", "KONTAKT"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className={cn(
                  "text-xs font-bold tracking-widest transition-colors uppercase", 
                  scrolled ? "text-gray-600 hover:text-[#003a8c]" : "text-white/80 hover:text-white"
                )}
              >
                {item}
              </a>
            ))}
          </div>
          <button className={cn(
            "px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-xl",
            scrolled ? "bg-[#004d2e] text-white" : "bg-white text-[#003a8c]"
          )}>
            Objednať
          </button>
        </nav>
      </header>

      {/* --- Hero Section --- */}
      <section className="relative h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/59994593_2227150874169552_8498053000881766400_n.jpg" 
            alt="Hero Background" 
            fill 
            className="object-cover brightness-[0.7] contrast-[1.1]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-[90vw] mx-auto px-6 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-[90vw] text-white"
          >
            <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-4">
              FyzioTT<br />
              <span className="text-4xl md:text-6xl font-light">Barbora Bayerová</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg leading-relaxed">
              Zaoberám sa diagnostikou, liečbou a prevenciou porúch pohybového systému človeka.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#kontakt" className="bg-[#003a8c] text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-[#002a66] transition-all group no-underline text-center">
                Kontakt
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/20">
              <div>
                <div className="text-4xl font-bold">12</div>
                <div className="text-xs tracking-widest uppercase text-gray-300 font-bold">Rokov skúseností</div>
              </div>
              <div>
                <div className="text-4xl font-bold">1000+</div>
                <div className="text-xs tracking-widest uppercase text-gray-300 font-bold">Spokojných pacientov</div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white w-8 h-8 opacity-50" />
        </div>
      </section>

      {/* --- Services Section --- */}
      <section className="py-24 bg-[#fcf9f9]" id="služby">
        <div className="max-w-[90vw] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-bold tracking-[0.2em] text-[#003a8c] uppercase mb-4 block">S čím Vám viem Pomôcť?</span>
            <h2 className="text-5xl font-bold text-[#003a8c]">Naše služby</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-20 max-w-[90vw] mx-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "chip text-[12px]",
                  activeCategory === cat 
                    ? "bg-[#003a8c] text-white scale-105" 
                    : "bg-white text-gray-600 hover:bg-gray-100"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                className={cn(
                  "relative p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group border border-transparent hover:border-[#003a8c]/10",
                  service.color
                )}
              >
                <div className="mb-8 w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:rotate-6 transition-transform">
                  <service.icon className="w-8 h-8 text-[#003a8c]" />
                </div>
                <h3 className="text-2xl font-bold text-[#003a8c] mb-6">{service.title}</h3>
                <p className="text-[15px] text-gray-900 leading-relaxed mb-8 font-medium italic">
                  {service.description}
                </p>
                <ul className="space-y-4">
                  {service.bulletPoints?.map((point, pIdx) => (
                    <li key={pIdx} className="flex gap-4 text-sm text-gray-800 font-semibold leading-relaxed">
                      <div className="w-2 h-2 rounded-full bg-[#003a8c] mt-2 shrink-0 opacity-40" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- O mne Section --- */}
      <section className="py-24 bg-white" id="o-mne">
        <div className="max-w-[90vw] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-[#ffdfe7] rounded-[60px] rotate-6 scale-95" />
              <div className="relative h-full w-full bg-gray-100 rounded-[60px] overflow-hidden shadow-2xl">
                 <Image 
                   src="/66371453_2268372556714050_8509381629959995392_n.jpg" 
                   alt="Barbora Bayerová" 
                   fill 
                   className="object-cover"
                 />
              </div>
            </div>
            <div>
              <span className="text-sm font-bold tracking-[0.2em] text-[#003a8c] uppercase mb-4 block">Spoznajte ma</span>
              <h2 className="text-5xl font-bold text-[#003a8c] mb-8">O mne</h2>
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p>
                  Fyzioterapii sa venujem od r. 2010. Mojou najobľúbenejšou diagnózou sú poruchy pohybového aparátu, poruchy platničiek a poruchy vestibulárneho aparátu **VERTIGO**.
                </p>
                <p>
                  Rada ponúkam klientom starostlivosť takú, akú by som sama vyžadovala. Fyzioterapia nie je len o uvoľnení bolesti, ale aj o dôkladnom vypočutí klienta.
                </p>
                <p className="bg-[#e4ffec] p-8 rounded-2xl border-l-4 border-green-500 font-bold italic text-[#003a8c]">
                  "Moja práca nie je práca, ale vášeň a hobby."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Cenník Section --- */}
      <section className="py-24 bg-[#fffcf9]">
        <div className="max-w-[90vw] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-[#003a8c] mb-6">Cenník</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Table */}
            <div className="lg:col-span-7 bg-white rounded-[40px] overflow-hidden border border-orange-100 shadow-xl">
              <div className="grid grid-cols-12 bg-gray-50 p-4 font-bold text-[#003a8c] uppercase text-[10px] tracking-widest border-b border-gray-100">
                <div className="col-span-8 md:col-span-9">Služba</div>
                <div className="col-span-2 md:col-span-2 text-center">Čas</div>
                <div className="col-span-2 md:col-span-1 text-right">Cena</div>
              </div>
              
              <div className="divide-y divide-gray-50 px-2">
                {PRICES.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "grid grid-cols-12 py-3 px-3 items-center hover:bg-gray-50 transition-all rounded-xl",
                      item.note ? "text-red-500 bg-red-50/20" : "text-gray-800"
                    )}
                  >
                    <div className="col-span-8 md:col-span-9 text-[13px] font-bold">{item.service}</div>
                    <div className="col-span-2 md:col-span-2 text-center text-[12px] font-semibold text-gray-400">{item.time}</div>
                    <div className="col-span-2 md:col-span-1 text-right text-[13px] font-black text-[#003a8c]">{item.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider / Infographic */}
            <div className="lg:col-span-5">
               <div className="relative group">
                  <div className="aspect-[3/4] bg-white rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 p-8 flex flex-col justify-between">
                     <div className="text-center">
                        <span className="text-red-500 font-black text-xs uppercase tracking-widest mb-2 block">Novinka</span>
                        <h3 className="text-3xl font-bold text-[#003a8c] mb-2 leading-tight">Indikácie<br/><span className="text-red-500">ShockWave</span> Dual Power</h3>
                     </div>
                     <div className="relative flex-grow my-8 flex items-center justify-center overflow-hidden rounded-2xl">
                        <Image 
                          src={SLIDER_IMAGES[sliderIdx]} 
                          alt="Therapy" 
                          fill 
                          className="object-cover transition-all duration-700"
                          key={sliderIdx}
                        />
                     </div>
                     <div className="flex justify-between items-center text-[#003a8c]">
                        <button 
                          onClick={() => setSliderIdx((prev) => (prev - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length)}
                          className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                        >
                           <ChevronDown className="rotate-90 w-5 h-5" />
                        </button>
                        <div className="flex gap-1.5">
                           {SLIDER_IMAGES.map((_, i) => (
                             <div key={i} className={cn("w-2 h-2 rounded-full transition-all", i === sliderIdx ? "bg-[#003a8c] w-4" : "bg-gray-200")} />
                           ))}
                        </div>
                        <button 
                          onClick={() => setSliderIdx((prev) => (prev + 1) % SLIDER_IMAGES.length)}
                          className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
                        >
                           <ChevronDown className="-rotate-90 w-5 h-5" />
                        </button>
                     </div>
                  </div>
               </div>
               <div className="mt-8 p-6 bg-blue-50/50 rounded-3xl border border-blue-100 text-[#003a8c] text-[13px] font-bold text-center">
                   Moderná liečba s bezkonkurenčnými výsledkami.
               </div>
            </div>
          </div>

          <div className="mt-10 text-center text-sm text-[#003a8c] font-bold space-y-2">
            <p className="flex items-center justify-center gap-2">
              <Activity className="w-4 h-4" />
              Termín je nutné odhlásiť 24h pred príchodom.
            </p>
            <p className="opacity-50">Cenník je platný od 1.3.2025</p>
          </div>
        </div>
      </section>

      {/* --- Recenzie Section --- */}
      <section className="py-24 bg-white" id="recenzie">
        <div className="max-w-[90vw] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-bold tracking-[0.2em] text-[#003a8c] uppercase mb-4 block">Čo hovoria moji pacienti?</span>
            <h2 className="text-5xl font-bold text-[#003a8c]">Recenzie</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-gray-50 p-8 rounded-[40px] relative overflow-hidden flex flex-col justify-between h-full"
              >
                <Quote className="absolute -top-4 -right-4 w-24 h-24 text-gray-200/50" />
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-8 italic relative z-10 font-medium">
                    "{t.text}"
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#003a8c] font-bold shadow-sm">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#003a8c] text-sm">{t.name}</h4>
                    <p className="text-xs text-gray-400 font-bold">{t.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Galéria Section --- */}
      <section className="py-24 bg-[#fcf9f9]" id="galéria">
         <div className="max-w-[90vw] mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-sm font-bold tracking-[0.2em] text-[#003a8c] uppercase mb-4 block">Ako to u nás vyzerá</span>
              <h2 className="text-5xl font-bold text-[#003a8c]">Galéria</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                 "/59051901_2223437327874240_3056874236271394816_n.jpg",
                 "/59354416_2223436807874292_7651254341109547008_n.jpg",
                 "/59614536_2223432584541381_1606870526700027904_n.jpg",
                 "/59734672_2227150837502889_5521146361262637056_n.jpg",
                 "/PHOTO-2025-03-19-17-57-52-2.jpg",
                 "/PHOTO-2025-03-19-17-57-52-3.jpg",
                 "/72327360_2330981777119794_5927892305498341376_n.jpg",
                 "/121977475_2629636373920998_8289672502895399221_n.jpg"
               ].map((src, i) => (
                 <div key={i} className="relative aspect-square bg-gray-200 rounded-3xl overflow-hidden hover:opacity-80 transition-opacity cursor-pointer shadow-sm border border-gray-100">
                    <Image src={src} alt={`Realizácia ${i+1}`} fill className="object-cover" />
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- Kontakt Section --- */}
      <section className="py-24 bg-white" id="kontakt">
        <div className="max-w-[90vw] mx-auto px-6">
          <div className="bg-[#003a8c] rounded-[60px] p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full -mr-20 -mt-20 blur-3xl" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
              <div>
                <h2 className="text-5xl font-bold mb-8">Kontakt</h2>
                <div className="space-y-8">
                  <div className="flex gap-6 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                      <UserRound className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Meno</h4>
                      <p className="text-xl font-bold">Mgr. Barbora Bayerová</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-6 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Adresa</h4>
                      <p className="text-xl font-bold">Ulica Bočná 1851/12<br />917 02 Trnava</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Telefón</h4>
                      <p className="text-xl font-bold cursor-pointer hover:text-blue-300 transition-colors">+421 908 028 601</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Email</h4>
                      <p className="text-xl font-bold cursor-pointer hover:text-blue-300 transition-colors">fyziott@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 rounded-[40px] p-8 border border-white/10 flex flex-col justify-center items-center text-center">
                 <Calendar className="w-16 h-16 mb-6 text-blue-200" />
                 <h3 className="text-2xl font-bold mb-4">Máte otázky?</h3>
                 <p className="text-blue-100/70 mb-8 max-w-xs">Poraďte sa so mnou o svojich ťažkostiach a nájdime riešenie spoločne.</p>
                 <button className="w-full bg-white text-[#003a8c] py-5 rounded-full font-bold hover:scale-[1.02] transition-transform shadow-2xl">
                    Dohodnúť si termín
                 </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-[#002a66] text-white py-16">
        <div className="max-w-[90vw] mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
              <div>
                <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                  <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="w-10 h-10 object-contain brightness-0 invert" />
                  <span className="text-2xl font-bold">FyzioTT</span>
                </div>
                <p className="text-blue-100/50 text-sm italic">"Moja práca nie je práca, ale vášeň a hobby."</p>
              </div>
              <div>
                <p className="font-bold text-sm tracking-widest uppercase text-blue-100/30 mb-2">Tvorba stránky</p>
                <p className="text-lg font-bold">AEB Digital</p>
              </div>
           </div>
           
           <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-blue-100/30 uppercase tracking-widest">
              <p>Barbora Moravčíková Fyziott</p>
              <p>© Mgr. Barbora Bayerová {new Date().getFullYear()}</p>
              <a href="#" className="hover:text-white transition-colors">Ochrana osobných údajov</a>
           </div>

           <div className="mt-8 flex justify-center">
              <button className="text-[10px] text-blue-100/20 uppercase tracking-[0.2em] hover:text-white transition-colors">
                Revisit consent
              </button>
           </div>
        </div>
      </footer>
    </div>
  );
}
