import logoPng from "./logo_efa7ba7f.webp";
import heroPhoto from "./foto-krupnoe_e32c5ca3.webp";
import masterClassPhoto from "./zagruzhennoe-25-1_13a649e5.webp";
import masterClassSmall from "./zagruzhennoe-kop-1_2e205776.webp";
import bgRibbon from "./fon_bf29d30b.webp";
import zavitushka from "./zavitushka-big_cc3e806a.webp";

import catalogEarrings from "./koltsa_5211744e.webp";
import catalogNecklaceBlue from "./kole-goluboe_11307c65.webp";
import catalogBraceletHand from "./braslet-na-ruke_44eb1a3b.webp";
import catalogRing from "./koltso_82dd6540.webp";
import catalogNecklaceFlower from "./kole-tsvetok_75e8d889.webp";
import catalogBranches from "./vetochki_81d54842.webp";
import catalogBraceletPink from "./braslet-rozovyi_05a2fe61.webp";
import catalogGlaz from "./glaz_65d44c17.webp";
import catalogLemur from "./lemur_7d633385.webp";
import catalogPenguin from "./pingvin_367cd227.webp";

import animalBee from "./pchela_c54da821.webp";
import animalParrotRed from "./krasnyi-popugai_071d4709.webp";
import animalSkat from "./skat_dffd008e.webp";
import animalShark from "./akula_b507c78e.webp";
import animalPenguin2 from "./pingvin_b3d10186.webp";
import animalParrot from "./popugai_f9ec9eee.webp";

import contactsTitle from "./contacts-title_5f8f280c.webp";
import contactsBlock from "./contacts-block_801dcd1f.webp";
import contactsInfo from "./contacts-info_dd286448.webp";

export const IMAGES = {
    logoPng,
    hero: heroPhoto,
    masterClass: { large: masterClassPhoto, small: masterClassSmall },
    decor: { ribbon: bgRibbon, pendant: zavitushka },
    catalog: {
        earrings: catalogEarrings,
        necklaceBlue: catalogNecklaceBlue,
        braceletHand: catalogBraceletHand,
        ring: catalogRing,
        necklaceFlower: catalogNecklaceFlower,
        branches: catalogBranches,
        braceletPink: catalogBraceletPink,
        eye: catalogGlaz,
        lemur: catalogLemur,
        penguin: catalogPenguin,
    },
    figurines: {
        bee: animalBee,
        parrotRed: animalParrotRed,
        ray: animalSkat,
        shark: animalShark,
        penguin2: animalPenguin2,
        parrot: animalParrot,
    },
    contacts: {
        title: contactsTitle,
        block: contactsBlock,
        info: contactsInfo,
    },
} as const;
