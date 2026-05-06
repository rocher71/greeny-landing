export type Locale = "ko" | "en";

export interface PlantData {
  emoji: string;
  name: string;
  scientific: string;
  difficulty: string;
  diffStyle: { bg: string; fg: string };
  water: string;
  light: string;
  desc: string;
}

export interface LibraryPlantData {
  name: string;
  sci: string;
  diffLabel: string;
  water: string;
  light: string;
}

export interface Translations {
  meta: {
    title: string;
    description: string;
    siteName: string;
  };
  hero: {
    headline: string;
    sub: string;
    brandName: string;
    cta: string;
    scrollHint: string;
  };
  scrollShowcase: {
    scenes: Array<{
      tag: string;
      title: string;
      desc: string;
    }>;
    scene0Preview: {
      plantMsg1: string;
      userMsg: string;
      plantMsg2: string;
    };
    scene1Preview: {
      notifLabel1: string;
      notifTitle1: string;
      notifBody1: string;
      tipLabel: string;
      tipTitle: string;
    };
    scene2Preview: {
      personalityLabel: string;
      traits: string[];
      chatCountPre: string;
      chatCount: string;
      chatCountPost: string;
      chatSub: string;
    };
  };
  chatDemo: {
    sectionLabel: string;
    headline: string;
    subtext: string;
    inputPlaceholder: string;
    bottomCta: string;
    characters: Array<{
      name: string;
      label: string;
      messages: Array<{ from: "plant" | "user"; text: string }>;
    }>;
  };
  garden: {
    sectionLabel: string;
    headline: string;
    desc: string;
    plants: Array<{ name: string; trait: string }>;
    stats: Array<{ emoji: string; label: string; value: string }>;
  };
  plantGuide: {
    sectionLabel: string;
    headline: string;
    desc: string;
    libraryLabel: string;
    detailLabel: string;
    gridPreviewLabel: string;
    showMore: string;
    showMoreCount: string;
    collapse: string;
    comingSoon: string;
    features: Array<{ emoji: string; title: string; desc: string }>;
    plants: PlantData[];
    libraryScreen: {
      greeting: string;
      title: string;
      searchPlaceholder: string;
      featuredLabel: string;
      featuredTitle: string;
      featuredDesc: string;
      allPlantsTitle: string;
      sortLabel: string;
      plants: LibraryPlantData[];
    };
    detailScreen: {
      categoryTag: string;
      difficultyTag: string;
      plantName: string;
      ratingLabel: string;
      waterLabel: string;
      waterValue: string;
      waterSub: string;
      sunLabel: string;
      sunValue: string;
      sunSub: string;
      tempLabel: string;
      tempValue: string;
      tempSub: string;
      careGuideTitle: string;
      careItems: Array<{ t: string; d: string }>;
      plantSaysLabel: string;
      plantSaysMsg: string;
      plantSaysCta: string;
      tagsTitle: string;
      tags: string[];
      addToGardenCta: string;
    };
    tabBar: {
      home: string;
      book: string;
      chat: string;
      me: string;
    };
  };
  features: {
    sectionLabel: string;
    headline: string;
    items: Array<{ emoji: string; color: string; bg: string; title: string; desc: string }>;
  };
  pain: {
    sectionLabel: string;
    headline: string;
    closing: string;
    items: Array<{ emoji: string; title: string; desc: string }>;
  };
  howItWorks: {
    sectionLabel: string;
    headline: string;
    subtext: string;
    steps: Array<{ emoji: string; text: string }>;
  };
  cta: {
    headline: string;
    subtext: string;
    button: string;
  };
  downloadModal: {
    tagline: string;
    divider: string;
    emailTab: string;
    phoneTab: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    marketingTitle: string;
    marketingOptional: string;
    marketingDesc: string;
    submitLoading: string;
    submitButton: string;
    privacyNote: string;
    privacyHighlight: string;
    doneTitle: string;
    doneDesc: string;
    appComingSoon: string;
    errors: {
      INVALID_EMAIL: string;
      INVALID_PHONE: string;
      DUPLICATE_CONTACT: string;
      SERVER_ERROR: string;
    };
    success: string;
  };
  waitlistForm: {
    placeholder: string;
    submit: string;
    submitLoading: string;
    done: string;
  };
  floatingCta: {
    button: string;
  };
}
