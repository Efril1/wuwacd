type ColorChoice =
  | "primary"
  | "info"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "neutral";

interface CharacterInfo {
  name: string;
  element: string;
  weapon: string;
  about: string;
}

interface Banner {
  targetTime: Date;
  bannerChar: string;
  infoImageDesktop: string;
  infoImageMobile: string;
  infoImageMobile1: string;
  infoImageMobile2: string;
  backgroundVideo: string;
  colorChoice: ColorChoice;
  characterInfo: CharacterInfo;
}

export const useBannerStore = defineStore("banner", () => {
  const banners = ref<Banner[]>([
    {
      targetTime: new Date(Date.UTC(2025, 7, 28, 3, 0, 0)),
      bannerChar: "AUGUSTA",
      infoImageDesktop: "/images/augustacard.webp",
      infoImageMobile: "/images/augustamobile.webp",
      infoImageMobile1: "/images/augustamobile.webp",
      infoImageMobile2: "/images/iuno-mobile.webp",
      backgroundVideo: "/images/augustavid.webm",
      colorChoice: "error",
      characterInfo: {
        name: "Augusta",
        element: "Electro",
        weapon: "Broadblade",
        about: '"All the sun touches is ours to fight for."—Augusta',
      },
    },

    {
      targetTime: new Date(Date.UTC(2025, 8, 17, 3, 0, 0)),
      bannerChar: "IUNO",
      infoImageDesktop: "/images/Iuno_Card.webp",
      infoImageMobile: "/images/iuno-mobile.webp",
      infoImageMobile1: "/images/augustamobile.webp",
      infoImageMobile2: "/images/iuno-mobile.webp",
      backgroundVideo: "/images/iunovid.mp4",
      colorChoice: "secondary",
      characterInfo: {
        name: "Iuno",
        element: "Aero",
        weapon: "Gauntlet",
        about: '"While the moon cycles, I remain the anchor."—Iuno',
      },
    },
  ]);

  const getBanner = (index: number) => {
    return banners.value[index] || banners.value[0];
  };

  return {
    banners,
    getBanner,
  };
});
