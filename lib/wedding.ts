// All wedding content lives here — edit this file to personalise the site.

export const wedding = {
  bride: {
    first: "Aria",
    full: "Aria Bennett",
    photo: "/images/bride.jpg",
    bio: "Daughter of Mr. & Mrs. Bennett. A lover of old books, sunrise walks and anything with lemon. Aria teaches art and still blushes when Julian sings off-key.",
    instagram: "#",
    facebook: "#",
  },
  groom: {
    first: "Julian",
    full: "Julian Moreau",
    photo: "/images/groom.jpg",
    bio: "Son of Mr. & Mrs. Moreau. An architect by day and an amateur chef by night, Julian believes every great evening ends with dessert — and dancing.",
    instagram: "#",
    facebook: "#",
  },

  // Ceremony start / party end, with the venue's UTC offset.
  start: "2027-06-12T15:00:00+02:00",
  end: "2027-06-12T23:59:00+02:00",
  dateLong: "Saturday · 12 June 2027",
  dateShort: "12 · 06 · 2027",
  venue: "The Glasshouse Garden, Lake Como",
  location: "The Glasshouse Garden, Lake Como, Italy",
  rsvpBy: "1 May 2027",
  hashtag: "#AriaAndJulianForever",
  heroImage: "/images/hero.jpg",
  bannerImage: "/images/banner.jpg",

  quote: ["Two souls with but a single thought,", "two hearts that beat as one."],
  invitation:
    "Together with our families, we joyfully invite you to share in the celebration of our marriage. Your presence would make our day complete.",

  story: [
    {
      date: "Spring 2019",
      title: "First Meeting",
      text: "A rainy afternoon, one umbrella and a café with only one free table. We shared it — and talked until closing.",
      photo: "/images/story-1.jpg",
    },
    {
      date: "Summer 2020",
      title: "First Date",
      text: "A picnic by the river that turned into a sunset, then into stargazing. Neither of us wanted to go home.",
      photo: "/images/story-2.jpg",
    },
    {
      date: "Winter 2025",
      title: "The Proposal",
      text: "Back at that same little café, a ring hidden in a slice of lemon cake. She said yes before he finished asking.",
      photo: "/images/story-3.jpg",
    },
    {
      date: "June 2027",
      title: "Forever Begins",
      text: "And now we can't wait to say “I do” surrounded by the people we love most — you.",
      photo: "/images/story-4.jpg",
    },
  ],

  events: [
    {
      icon: "chapel",
      title: "The Ceremony",
      time: "3:00 PM – 4:00 PM",
      place: "Chapel of San Giovanni",
      address: "Via Regina 12, Lake Como, Italy",
      map: "https://maps.google.com/?q=Lake+Como+Italy",
    },
    {
      icon: "glass",
      title: "Cocktail Hour",
      time: "4:30 PM – 6:00 PM",
      place: "The Lemon Terrace",
      address: "The Glasshouse Garden, Lake Como",
      map: "https://maps.google.com/?q=Lake+Como+Italy",
    },
    {
      icon: "cake",
      title: "Dinner & Party",
      time: "6:30 PM – Late",
      place: "The Grand Glasshouse",
      address: "The Glasshouse Garden, Lake Como",
      map: "https://maps.google.com/?q=Lake+Como+Italy",
    },
  ] as const,
  eventDay: "Saturday, 12 June 2027",
  dressCode: "Garden formal — soft pastels warmly welcomed.",

  // `size` controls the grid tile shape: "tall", "wide" or "normal".
  gallery: [
    { src: "/images/gallery-1.jpg", size: "tall" },
    { src: "/images/gallery-2.jpg", size: "normal" },
    { src: "/images/gallery-3.jpg", size: "normal" },
    { src: "/images/gallery-4.jpg", size: "wide" },
    { src: "/images/gallery-5.jpg", size: "normal" },
    { src: "/images/gallery-6.jpg", size: "normal" },
  ] as const,

  meals: ["Beef", "Fish", "Vegetarian", "Vegan"],
  maxGuests: 4,

  wishes: [
    { name: "Sofia & Marco", message: "So happy for you both! Can't wait to dance the night away by the lake." },
    { name: "Aunt Clara", message: "Wishing you a lifetime of lemon cake and laughter." },
  ],
};

export const initials = `${wedding.bride.first[0]} & ${wedding.groom.first[0]}`;
export const coupleNames = `${wedding.bride.first} & ${wedding.groom.first}`;
