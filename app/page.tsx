'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';

// --- Types ---
interface Service {
  title: string;
  description: string;
  icon: any;
  bulletPoints?: string[];
  color: string;
  iconBg?: string;
  iconColor?: string;
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
  "Diastáza", "Fyzioterapia pre deti od 3 rokov", "Myofasciálna terapia"
];

const PodologickaIcon = () => (
  <svg className="w-11 h-11" viewBox="0 0 76 76" fill="currentColor">
    <path d="M 44.5,18.5C 45.8807,18.5 47,20.2909 47,22.5C 47,24.7091 45.8807,26.5 44.5,26.5C 43.1193,26.5 42,24.7091 42,22.5C 42,20.2909 43.1193,18.5 44.5,18.5 Z M 39.25,19.75C 40.0784,19.75 40.75,20.8693 40.75,22.25C 40.75,23.6307 40.0784,24.75 39.25,24.75C 38.4216,24.75 37.75,23.6307 37.75,22.25C 37.75,20.8693 38.4216,19.75 39.25,19.75 Z M 35,21C 35.8284,21 36.5,21.8954 36.5,23C 36.5,24.1046 35.8284,25 35,25C 34.1716,25 33.5,24.1046 33.5,23C 33.5,21.8954 34.1716,21 35,21 Z M 31.5,23.25C 32.3284,23.25 33,24.1454 33,25.25C 33,26.3546 32.3284,27.25 31.5,27.25C 30.6716,27.25 30,26.3546 30,25.25C 30,24.1454 30.6716,23.25 31.5,23.25 Z M 28.75,26.75C 29.3023,26.75 29.75,27.4216 29.75,28.25C 29.75,29.0784 29.3023,29.75 28.75,29.75C 28.1977,29.75 27.75,29.0784 27.75,28.25C 27.75,27.4216 28.1977,26.75 28.75,26.75 Z M 34,27.5C 43,23 49.2428,31.3086 42,40C 37,46 51.1334,55.5428 42,57.5C 35,59 37.1925,49.8978 35,46C 26,30 34,27.5 34,27.5 Z " />
  </svg>
);

const RazovaVlnaIcon = () => (
  <svg className="w-8 h-8" viewBox="0 -2 20 20" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <g transform="translate(-2 -4)">
      <path d="M21,11c-2.25,0-2.25,2-4.5,2s-2.25-2-4.5-2-2.25,2-4.5,2S5.25,11,3,11" />
      <path d="M3,5C5.25,5,5.25,7,7.5,7S9.75,5,12,5s2.26,2,4.51,2S18.75,5,21,5" />
      <path d="M21,17c-2.25,0-2.25,2-4.5,2s-2.25-2-4.5-2-2.25,2-4.5,2S5.25,17,3,17" />
    </g>
  </svg>
);

const SMSystemIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 58 58" fill="currentColor">
    <path d="M57,3V2.762C57,1.239,55.761,0,54.239,0h-6.478C46.239,0,45,1.239,45,2.762V3c0,1.304,0.836,2.416,2,2.829v9.342 c-1.164,0.413-2,1.525-2,2.829v0.446C45,19.854,46.146,21,47.554,21H50v12c0,8.344-4.467,15.664-11.134,19.695 C41.426,49.858,43,46.114,43,42c0-8.822-7.178-16-16-16s-16,7.178-16,16c0,2.893,0.783,5.601,2.131,7.945 C9.959,46.548,8,42.004,8,37V21h2.446C11.854,21,13,19.854,13,18.446V18c0-1.304-0.836-2.416-2-2.829V5.829 C12.164,5.416,13,4.304,13,3V2.762C13,1.239,11.761,0,10.239,0H3.761C2.239,0,1,1.239,1,2.762V3c0,1.304,0.836,2.416,2,2.829 v9.342C1.836,15.584,1,16.696,1,18v0.446C1,19.854,2.146,21,3.554,21H6v17h0.023C6.547,49.117,15.755,58,27,58 c13.785,0,25-11.215,25-25V21h2.446C55.854,21,57,19.854,57,18.446V18c0-1.304-0.836-2.416-2-2.829V5.829 C56.164,5.416,57,4.304,57,3z M3.554,19C3.249,19,3,18.752,3,18.446V18c0-0.552,0.449-1,1-1h1v-2c0.552,0,1-0.448,1-1 s-0.448-1-1-1v-2c0.552,0,1-0.448,1-1S5.552,9,5,9V7c0.552,0,1-0.448,1-1S5.552,5,5,5V4H4C3.449,4,3,3.552,3,3V2.762 C3,2.342,3.341,2,3.761,2h6.478C10.659,2,11,2.342,11,2.762V3c0,0.552-0.449,1-1,1H9v1C8.448,5,8,5.448,8,6s0.448,1,1,1v2 c-0.552,0-1,0.448-1,1s0.448,1,1,1v2c-0.552,0-1,0.448-1,1s0.448,1,1,1v2h1c0.551,0,1,0.448,1,1v0.446 C11,18.752,10.751,19,10.446,19H3.554z M13,42c0-7.72,6.28-14,14-14s14,6.28,14,14c0,2.137-0.496,4.156-1.356,5.97 C39.869,47.015,40,46.023,40,45c0-7.168-5.832-13-13-13s-13,5.832-13,13c0,1.023,0.131,2.015,0.356,2.97 C13.496,46.156,13,44.137,13,42z M27,56c-0.379,0-0.749-0.035-1.123-0.057C20.337,55.379,16,50.686,16,45c0-6.065,4.935-11,11-11 s11,4.935,11,11S33.065,56,27,56z M53,7v2c-0.552,0-1,0.448-1,1s0.448,1,1,1v2c-0.552,0-1,0.448-1,1s0.448,1,1,1v2h1 c0.551,0,1,0.448,1,1v0.446C55,18.752,54.751,19,54.446,19h-6.893C47.249,19,47,18.752,47,18.446V18c0-0.552,0.449-1,1-1h1v-2 c0.552,0,1-0.448,1-1s-0.448-1-1-1v-2c0.552,0,1-0.448,1-1s-0.448-1-1-1V7c0.552,0,1-0.448,1-1s-0.448-1-1-1V4h-1 c-0.551,0-1-0.448-1-1V2.762C47,2.342,47.341,2,47.761,2h6.478C54.659,2,55,2.342,55,2.762V3c0,0.552-0.449,1-1,1h-1v1 c-0.552,0-1,0.448-1,1S52.448,7,53,7z" />
  </svg>
);

const SuchaIhlaIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 30.231 30.231" fill="currentColor">
    <path d="M25.343,3.585c-0.502-0.677-1.528-1.212-2.636-1.397c0.168-0.746-0.146-1.544-0.846-1.947 c-0.854-0.495-1.951-0.202-2.445,0.655c-0.098,0.169-0.741,1.425-1.702,3.314c-1.646-0.354-3.277-0.68-4.625-0.796 c-1.282-0.111-3.016-0.12-3.276,1.08c-0.354,1.631,2.031,3.647,4.813,5.799c-0.618,1.221-1.263,2.496-1.917,3.788 c-2.15-1.01-3.904-1.625-4.68-0.821c-1.085,1.124-0.127,2.754,0.98,4.642c0.316,0.538,0.641,1.093,0.931,1.656 c-2.925,5.784-5.393,10.673-5.393,10.673s2.715-4.145,6.033-9.217c0.536,1.536,0.556,3.084-0.81,4.496 c-0.114,0.118-0.111,0.307,0.007,0.422c0.019,0.017,0.038,0.032,0.059,0.043c0.116,0.066,0.267,0.049,0.363-0.051 c1.708-1.767,1.523-3.702,0.784-5.528c1.045-1.598,2.139-3.271,3.221-4.928c0.023,0.012,0.046,0.023,0.067,0.034 c3.134,1.549,6.093,3.012,6.941,1.491c0.838-1.499-1.493-3.516-4.291-5.687c1.478-2.264,2.812-4.311,3.809-5.843 c2.45,0.494,4.011,0.665,4.53,0.084C25.796,4.954,25.825,4.239,25.343,3.585z M10.268,18.906c-0.243-0.448-0.499-0.887-0.745-1.305 c-0.984-1.678-1.836-3.127-1.066-3.925c0.508-0.526,2.205,0.113,3.981,0.939C11.711,16.054,10.979,17.499,10.268,18.906z M20.692,16.703c-0.572,1.025-3.668-0.506-6.156-1.734c-0.001,0-0.002-0.001-0.003-0.001c0.701-1.073,1.394-2.134,2.061-3.156 C19.005,13.684,21.29,15.633,20.692,16.703z M14.9,9.753c-2.426-1.883-4.78-3.868-4.505-5.13c0.12-0.547,1.008-0.754,2.642-0.613 c1.272,0.111,2.823,0.416,4.396,0.753C16.714,6.177,15.844,7.891,14.9,9.753z M19.557,4.612c-0.093-0.021-0.184-0.04-0.273-0.06 c-0.26-0.462,0.674-2.803,0.908-3.208c0.246-0.428,0.795-0.575,1.223-0.328c0.39,0.224,0.529,0.691,0.371,1.096 c-0.512,0.014-1.016,0.108-1.469,0.319c-0.15,0.069-0.216,0.246-0.146,0.396c0.067,0.149,0.247,0.215,0.396,0.145 c0.252-0.117,0.53-0.181,0.813-0.222C20.881,3.404,20.028,4.401,19.557,4.612z M24.819,5.151c-0.322,0.358-1.943,0.129-3.74-0.225 c0.769-1.182,1.271-1.962,1.404-2.181c0.993,0.135,1.938,0.599,2.379,1.196C25.179,4.369,25.165,4.764,24.819,5.151z" />
  </svg>
);

const MulliganConceptIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 512.001 512.001" fill="currentColor">
    <path d="M196.371,242.536l-78.681,10.473v5.144h0.234c64.986,0.001,14.168-0.083,82.216-0.083L196.371,242.536z" />
    <circle cx="162.185" cy="34.967" r="34.967" />
    <path d="M244.139,196.35c-2.191-9.034-10.28-15.234-19.349-15.234c-1.86,0,1.152-0.33-44.664,5.77 c-2.324,18.791-19.826,32.5-38.928,29.745l-51.158-7.348c-1.185,3.034-1.645,6.4-1.185,9.858 c1.453,10.916,11.482,18.588,22.385,17.125l98.387-13.097l8.465,34.902h3.408c5.754-9.274,13.421-17.244,22.604-23.422 c2.634-1.772,5.362-3.363,8.161-4.787L244.139,196.35z" />
    <path d="M375.564,240.004c-0.324-0.001-87.86,0-88.184,0c-21.882-0.002-41.564,11.783-51.819,30.332l138.258,13.11H208.767 c-9.171,0-16.607,7.435-16.607,16.607s7.436,16.607,16.607,16.607c183.103,0,176.889-0.12,176.889-0.12 c11.374,0.145,21.085-9.138,21.146-20.908l0.122-23.724C407.014,254.522,392.973,240.093,375.564,240.004z" />
    <path d="M184.102,276.4c-2.831,0-141.209,0-148.547,0c-11.006,0-19.93,8.923-19.93,19.93c0,11.006,8.923,19.93,19.93,19.93 c4.877,0,137.306,0,142.559,0c-2.315-3.971-3.819-8.499-4.249-13.381C172.956,292.548,177.035,282.935,184.102,276.4z" />
    <path d="M509.281,351.49c0-9.53-7.727-17.256-17.256-17.256c-11.964,0-458.758,0-472.05,0c-9.529,0-17.256,7.725-17.256,17.256 c0,8.092,5.578,14.863,13.093,16.728c-0.001,0.084-0.007,0.165-0.007,0.249v111.556c0,17.632,14.346,31.978,31.978,31.978 c9.529,0,17.256-7.725,17.256-17.256c0-8.67-6.393-15.845-14.722-17.07V371.001h411.365v106.675 c-8.329,1.225-14.722,8.401-14.722,17.07c0,9.53,7.727,17.256,17.256,17.256c17.633,0,31.978-14.346,31.978-31.978V368.467 c0-0.084-0.006-0.165-0.007-0.249C503.702,366.353,509.281,359.582,509.281,351.49z" />
    <path d="M277.598,142.407L219.309,85.84c-3.148-3.055-7.362-4.764-11.748-4.764c-23.383,0-68.586,0-90.75,0 c-5.624,0-10.879,2.803-14.011,7.474l-32.611,48.624c-0.002,0.002-16.642,24.814-16.642,24.814 c-3.641,5.43-3.815,12.556-0.399,18.167c2.542,4.176,6.916,7.196,12.013,7.928l78.519,11.277 c9.244,1.328,17.782-5.12,19.097-14.301c1.324-9.223-5.078-17.773-14.301-19.098l-51.961-7.463 c10.728-15.996,10.358-15.444,21.176-31.574v16.99l33.264,4.777c12.395,1.779,22.336,9.954,26.865,20.899l29.231-4.536v-44.095 l38.237,37.108l-4.524,9.176c9.955,4.699,17.591,13.7,20.331,24.995l1.637,6.749l18.248-37.013 C284.217,155.409,282.85,147.505,277.598,142.407z" />
    <path d="M496.822,289.908c-0.475-2.971-3.042-5.244-6.147-5.244h-11.107c8.481-6.362,13.997-16.473,14.067-27.893 c0.12-19.398-15.508-35.22-34.906-35.34c-0.075,0-0.148-0.001-0.222-0.001c-19.295,0.001-34.998,15.583-35.118,34.906 c-0.072,11.576,5.467,21.876,14.066,28.328h-7.94c-3.442,0-6.232,2.79-6.232,6.232c0,3.883,0,14.279,0,18.036 c0.002,3.443,2.793,6.234,6.235,6.234h61.158c3.442,0,6.232-2.79,6.232-6.232C496.908,289.819,496.963,290.785,496.822,289.908z" />
  </svg>
);

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
    icon: PodologickaIcon,
    color: "bg-[#ffdfe7]",
    iconBg: "bg-[#fe5151]",
    iconColor: "text-white"
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
    icon: RazovaVlnaIcon,
    color: "bg-[#ffffe0]",
    iconBg: "bg-[#ffee2f]",
    iconColor: "text-[#002a66]"
  },
  {
    title: "SM systém",
    description: "Metóda sa používa u pacientov s bolesťami chrbtice, s akútnym vyklenutím disku (platničky) a skoliózou. Cvičenie má tiež veľký význam pri prevencii a liečbe porúch veľkých kĺbov.",
    bulletPoints: [
      "Hlavný efekt metódy je vyvolanie trakčnej (naťahovacej) sily v oblasti medzistavcových platničiek.",
      "SM Systém je systematická starostlivosť o pohybový aparát človeka a funkciu vnútorných orgánov.",
      "Prepája rehabilitačnú liečbu s prevenciou, regeneráciou a kondičným tréningom."
    ],
    icon: SMSystemIcon,
    color: "bg-[#e1f6ff]",
    iconBg: "bg-[#b2eafe]",
    iconColor: "text-[#002a66]"
  },
  {
    title: "Terapia vestibulárnych porúch - Vertigo",
    description: "Najčastejšie sa vyskytuje medzi 50 a 70 rokom života (ženy sú postihnuté 2x častejšie ako muži).",
    bulletPoints: [
      "Spôsobené uvoľnením otolytov (kryštálikov v kanálikoch) a ich následnou sedimentáciou.",
      "Manifestuje sa záchvatmi závratov, ktoré trvajú minúty až hodiny.",
      "Sú sprevádzané vegetatívnymi príznakmi a môže sa vyskytnúť nystagmus."
    ],
    icon: Stethoscope,
    color: "bg-[#edf2ff]",
    iconBg: "bg-white",
    iconColor: "text-[#003a8c]"
  },
  {
    title: "Terapia suchou ihlou",
    description: "Vhodná pri liečbe akútnych a chronických bolestí hlavy, krku, krížov, stuhnutého pleca, syndrómu karpálneho tunela a Achillovej šľachy.",
    bulletPoints: [
      "Spastické body sa nachádzajú hlbšie vo svaloch a utláčajú cievy a nervové vlákna.",
      "Ihla naruší stiahnuté alebo prekrížené vlákna a prichádza k okamžitej úľave.",
      "Úľava prichádza okamžite resp. do niekoľkých hodín. Spúšťový bod sa deaktivuje."
    ],
    icon: SuchaIhlaIcon,
    color: "bg-[#e4ffec]",
    iconBg: "bg-[#024b10]",
    iconColor: "text-white"
  },
  {
    title: "Mulligan koncept",
    description: "Metóda je založená na využití množstva techniek NAG, SNG, MWM.",
    bulletPoints: [
      "Priame pôsobenie zamerané na kĺby a artikulárny systém.",
      "Nepriame pôsobenie vplýva na nervovo-svalovú sústavu.",
      "Najdôležitejšou zásadou metódy je, že pohyb nesmie nikdy vyvolávať dráždenie či bolestivé pocity."
    ],
    icon: MulliganConceptIcon,
    color: "bg-[#edf2ff]",
    iconBg: "bg-[#013588]",
    iconColor: "text-white"
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
  "/PHOTO-2025-03-19-17-57-52-3.jpg"
];

const HERO_IMAGES = [
  "/59994593_2227150874169552_8498053000881766400_n.jpg",
  "/59051901_2223437327874240_3056874236271394816_n.jpg"
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("SMsystém");
  const [scrolled, setScrolled] = useState(false);
  const [sliderIdx, setSliderIdx] = useState(0);
  const [heroIdx, setHeroIdx] = useState(0);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const interval = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
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
          <a href="#" className="flex items-center gap-4 no-underline group shrink-0 relative py-2">
            <div className={cn(
              "relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 transition-all duration-300 shadow-2xl bg-white flex-shrink-0 translate-y-3 sm:translate-y-5",
              scrolled ? "border-[#003a8c]/10 scale-90" : "border-white/40 scale-100"
            )}>
              <Image 
                src="/logo_barbora.png" 
                alt="Logo" 
                fill
                className="object-cover p-1" 
              />
            </div>
            <span className={cn(
              "text-3xl font-extrabold tracking-tighter transition-colors hidden sm:block",
              scrolled ? "text-[#003a8c]" : "text-white"
            )}>
              FyzioTT
            </span>
          </a>
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
      <section ref={heroRef} className="relative h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence>
            <motion.div 
              key={heroIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ y }}
              className="absolute inset-0"
            >
              <Image 
                src={HERO_IMAGES[heroIdx]} 
                alt="Hero Background" 
                fill 
                className="object-cover brightness-[0.7] contrast-[1.1] scale-110"
                priority
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />
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
                <div className={cn(
                  "mb-8 w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm group-hover:rotate-6 transition-transform",
                  service.iconBg || "bg-white"
                )}>
                  <service.icon className={cn("w-8 h-8", service.iconColor || "text-[#003a8c]")} />
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
            <div className="relative aspect-[4/3] w-full mx-auto lg:mx-0">
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
                  Fyzioterapii sa venujem od r. 2010. Mojou najobľúbenejšou diagnózou sú poruchy pohybového aparátu, poruchy platničiek a poruchy vestibulárneho aparátu Vertigo.
                </p>
                <p>
                  Rada ponúkam klientom starostlivosť takú, akú by som sama vyžadovala. Fyzioterapia nie je len o uvoľnení bolesti, ale aj o dôkladnom vypočutí klienta.
                </p>
                <p className="text-[#003a8c] font-bold italic text-xl border-l-4 border-[#003a8c] pl-6 py-2">
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
                     <div className="relative flex-grow flex items-center justify-center overflow-hidden rounded-2xl">
                        <Image 
                          src={SLIDER_IMAGES[sliderIdx]} 
                          alt="Therapy" 
                          fill 
                          className="object-cover transition-all duration-700"
                          key={sliderIdx}
                        />
                     </div>
                     <div className="flex justify-between items-center text-[#003a8c] mt-4">
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
              
              <div className="bg-white/5 rounded-[40px] overflow-hidden border border-white/10 h-[450px] relative group">
                 <iframe 
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1314.9392261208034!2d17.5843105!3d48.377508099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476b5fb02136a8a3%3A0xb38a048970b795ee!2sFyzio%20TT!5e0!3m2!1ssk!2ssk!4v1711000000000!5m2!1ssk!2ssk" 
                   width="100%" 
                   height="100%" 
                   style={{ border: 0 }} 
                   allowFullScreen 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                   className="transition-all duration-700"
                 />
                 <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold border border-white/20 pointer-events-none">
                    Bočná 12, Trnava
                 </div>
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
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm border border-white/10">
                    <Image src="/logo_barbora.png" alt="Logo" fill className="object-cover p-1" />
                  </div>
                  <span className="text-2xl font-bold">FyzioTT</span>
                </div>
                <div className="text-white/80 text-sm space-y-1.5 mt-4">
                  <p className="font-bold text-white">Mgr. Barbora Bayerová</p>
                  <p>Ulica Bočná 1851/12, 917 02 Trnava</p>
                  <p className="hover:text-white transition-colors cursor-pointer">+421 908 028 601</p>
                  <p className="hover:text-white transition-colors cursor-pointer">fyziott@gmail.com</p>
                </div>
              </div>

           </div>
           
           <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-bold text-blue-100/30 uppercase tracking-widest">
              <p>Barbora Moravčíková Fyziott</p>
              <p>© Mgr. Barbora Bayerová {new Date().getFullYear()}</p>
              <a href="#" className="hover:text-white transition-colors">Ochrana osobných údajov</a>
           </div>

            <div className="mt-8 flex justify-center">
               <a 
                 href="https://aebdigital.sk" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="text-xs text-white/50 hover:text-white font-bold uppercase tracking-[0.2em] transition-all no-underline"
               >
                 Tvorba webu - AEB Digital
               </a>
            </div>
        </div>
      </footer>
    </div>
  );
}
