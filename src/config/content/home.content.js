// src/config/content/home.content.js
import sunliveGroupLogo from "../../assets/logos/sunlive-group.png";
import continentalCupLogo from "../../assets/logos/continental-cup.png";
import velodromoLogo from "../../assets/logos/velodromo.png";
import anadiaLogo from "../../assets/logos/anadia.png";
import estalagemLogo from "../../assets/logos/estalagem.png";

import heroBackground from "../../assets/backgrounds/foto-fundo-1.png";
import lucasPhoto from "../../assets/person/lucas.jpg";
import velodromeBackground from "../../assets/backgrounds/fundo-velodromo.jpg";
import hotelBackground from "../../assets/backgrounds/fundo-entrada-estalagem.jpg";
import sunliveBackground from "../../assets/backgrounds/fundo-piscina.jpg";

import posterImage from "../../assets/poster/poster.png";

export const homeContent = {
  header: {
    logo: {
      src: sunliveGroupLogo,
      alt: "Sunlive Group logo",
    },
    navItems: [
      { id: "home", label: "HOME", targetId: "home", variant: "default" },
      { id: "cup", label: "CUP", targetId: "cup", variant: "default" },
      {
        id: "venue",
        label: "THE VENUE",
        targetId: "venue",
        variant: "default",
      },
      {
        id: "hotel-rest",
        label: "HOTEL/REST",
        targetId: "hotel-rest",
        variant: "default",
      },
      {
        id: "sunlive",
        label: "SUNLIVE",
        targetId: "sunlive",
        variant: "default",
      },
      {
        id: "contacts",
        label: "CONTACTS",
        targetId: "contacts",
        variant: "default",
      },
    ],
  },

  hero: {
    id: "home",
    background: {
      src: heroBackground,
      alt: "Gymnastics training session at Continental Cup venue",
    },
    titleLines: ["International", "Continental Cup"],
    poweredBy: "powered by Sunlive Malta",
    location: "ANADIA – PORTUGAL",
    dates: "27th – 29th November, 2026",
    ctas: {
      poster: { id: "poster", label: "Poster" },
      registration: { id: "registration", label: "Registration" },
    },
    poster: {
      src: posterImage,
      alt: "Continental Cup poster",
    },
  },

  messageSection: {
    id: "cup-message",
    paragraphs: [
      "Sunlive Group sparks innovation, and now, it's your chance to dive into a fresh concept. Engage in a thrilling competition, preceded by refining your skills with esteemed coaches and acclaimed athletes.",
      "Our goal: co-create a competition that fuels growth and amplifies your natural prowess. Let's forge ahead together, always reaching for better!",
    ],
    author: {
      name: "Lucas Gonzalez",
      role: "CEO Sunlive Group",
      photo: {
        src: lucasPhoto,
        alt: "Lucas Gonzalez, CEO Sunlive Group",
      },
    },
  },

  competitionSection: {
    id: "cup",
    badge: "Another unique gymnastics experience!!!",
    title: "The Continental Cup 2026 MAG and WAG International competition",
    paragraphs: [
      "Get ready for an exciting event in the world of gymnastics! The Continental Cup MAG and WAG international competition is just around the corner, taking place from November 27th to 29th.",
      "Don’t miss this opportunity to witness top-level athletes in action and celebrate the artistry and skill of gymnastics alongside an electrifying crowd.",
    ],

    mainCtas: {
      registrationForm: { id: "registration-form", label: "Registration form" },
    },

    downloadNote:
      "After filling out the registration form, download the files (WAG or MAG) and send them, properly completed, to malta@sunlive.pt. Thank you.",

    // ✅ agora com links para os zips em /public/downloads
    categoryCtas: {
      mag: {
        id: "mag-file",
        label: "MAG",
        href: "/downloads/continental-cup-2026-mag.zip",
        filename: "Continental Cup 2026 - MAG",
      },
      wag: {
        id: "wag-file",
        label: "WAG",
        href: "/downloads/continental-cup-2026-wag.zip",
        filename: "Continental Cup 2026 - WAG",
      },
    },

    registrationModal: {
      title: "Sunlive International Continental Cup 2026",
      subtitle: "Anadia – PORTUGAL | 27th – 29th November, 2026",
      sections: [
        {
          title: "Delegation Info",
          fields: [
            {
              name: "federationClub",
              label: "Federation / Club",
              type: "text",
              required: true,
            },
            { name: "country", label: "Country", type: "text", required: true },
          ],
        },
        {
          title: "Transport Info",
          fields: [
            {
              name: "transport",
              label: "Transport",
              type: "radio",
              required: true,
              options: [
                { value: "airplane", label: "Airplane" },
                { value: "car", label: "Car" },
              ],
            },
            {
              name: "flightNrArrival",
              label: "Flight Nr Arrival",
              type: "text",
              required: true,
            },
            {
              name: "flightNrDeparture",
              label: "Flight Nr Departure",
              type: "text",
              required: true,
            },
            {
              name: "arrivalTime",
              label: "Arrival Time",
              type: "time",
              required: true,
            },
            {
              name: "departureTime",
              label: "Departure Time",
              type: "time",
              required: true,
            },
            {
              name: "dayOfArrival",
              label: "Day of Arrival",
              type: "date",
              required: true,
            },
            {
              name: "dayOfDeparture",
              label: "Day of Departure",
              type: "date",
              required: true,
            },
          ],
        },
        {
          title: "Personal contacts",
          fields: [
            {
              name: "contactName",
              label: "Name",
              type: "text",
              required: true,
            },
            {
              name: "phoneNumber",
              label: "Phone number (country code) phone number",
              type: "tel",
              required: true,
            },
            { name: "email", label: "Email", type: "email", required: false },
          ],
        },
      ],
    },
  },

  orgPartnersSection: {
    id: "org-partners",
    organizationTitle: "ORGANIZATION",
    partnersTitle: "PARTNERS",
    organization: [
      { src: sunliveGroupLogo, alt: "Sunlive Group" },
      { src: continentalCupLogo, alt: "Continental Cup" },
    ],
    partners: [
      { src: velodromoLogo, alt: "Velodromo" },
      { src: anadiaLogo, alt: "Anadia" },
      { src: estalagemLogo, alt: "Estalagem" },
    ],
  },

  venueSection: {
    id: "venue",
    background: {
      src: velodromeBackground,
      alt: "Velodrome of Sangalhos high performance gymnastics center",
    },
    title: "Velodrome of Sangalhos",
    subtitle: "ANADIA - HIGH PERFORMANCE CENTER",
    paragraphs: [
      "The High Performance Center in Anadia is a top multi-sports venue. Within the velodrome, we have almost 3000 square meters with all the equipment for every Gymnastics Disciplines. This was the home of several FIG World Challenge Cup in the last few years, as lots of other international and national competitions.",
      "This is one of the most wanted Gym Centers in Europe for high-level teams camps. Top National teams like Great Britain, Brazil, France, Belgium, Switzerland and many other national teams and clubs made from off-season camps to specific preparation for olympics or world championships in this venue.",
      "It’s a fully equiped gym with 2 official floors, 2 very comfortable pit zones, all the apparatus to official mats and to the pit, trampolines, fastrack, etc. Obviously, every WAG equipment will be set for our camp.",
    ],
    addressTitle: "Address:",
    addressLines: [
      "Rua Ivo Neves",
      "3780-524 Sangalhos",
      "GPS: N: 40º28'46, W: 8º28'27",
    ],
  },

  hotelSection: {
    id: "hotel-rest",
    background: {
      src: hotelBackground,
      alt: "Sangalhos Hotel & Restaurant front view",
    },
    title: "Sangalhos Hotel & Restaurant",
    video: {
      src: "https://www.youtube.com/embed/dx5Nh5CVdZ0?rel=0",
      title: "Sangalhos Hotel & Restaurant – Sunlive",
    },
    addressTitle: "Address:",
    addressLines: [
      "Rua Narciso da Marça",
      "3780-101 Sangalhos - Anadia",
      "GPS: 40º28' 37.88\"N, 8º27' 34.14\"W",
      "Phone: +351 234 745 133",
    ],
    website: {
      label: "Website",
      href: "https://www.estalagem.sunlive.pt/",
    },
  },

  sunliveSection: {
    id: "sunlive",
    background: {
      src: sunliveBackground,
      alt: "Sunlive Group hotel pool area",
    },
    title: "Sunlive Group",
    paragraphs: [
      "Nowadays we are a company performing on a wider range of solutions on several areas, working within a solid network with different partnerships, developed through the contacts in our Hotel in Portugal with our clients, allowing us to respond into several business opportunities.",
    ],
    video: {
      src: "https://www.youtube.com/embed/57JDgG7vKr8?rel=0",
      title: "SUNLIVE GROUP – Presentation",
    },
    pdf: {
      label: "Presentation PDF",
      href: "/books/sunlive_apresentation.pdf",
    },
  },

  contactsSection: {
    id: "contacts",
    address: {
      title: "Sunlive Group Address",
      lines: ["Rua Narciso da Marça", "3780-101 Sangalhos"],
    },
    eventManager: {
      title: "Event Manager",
      name: "Francesca Borg",
      phoneLabel: "Phone:",
      phoneValue: "(+356) 99164245",
      emailLabel: "E-mail:",
      emailValue: "malta@sunlive.pt",
    },
    links: {
      title: "Links",
      items: [
        { label: "Cup", type: "internal", targetId: "cup" },
        {
          label: "Sunlive Group",
          type: "external",
          href: "https://www.facebook.com/sunlive07/",
        },
        {
          label: "Sangalhos Hotel",
          type: "external",
          href: "https://www.estalagem.sunlive.pt/",
        },
        {
          label: "Instagram",
          type: "external",
          href: "https://www.instagram.com/sunlive.group/",
        },
      ],
    },
    gdpr: {
      label: "GDPR – General Data Protection Regulation",
      href: "https://sunlive.pt/en/rgpd",
    },
    map: {
      title: "Sunlive – Investimentos Imobiliários",
      src: "https://www.openstreetmap.org/export/embed.html?bbox=-8.469518%2C40.466923%2C-8.449518%2C40.486923&layer=mapnik&marker=40.476923%2C-8.459518",
    },
  },

  footer: {
    id: "footer",
    siteLabel: "www.continentalcup.sunlive.pt",
    homeTargetId: "home",
    copyright: "© Copyright 2026 Sunlive - All Rights Reserved",
  },
};
