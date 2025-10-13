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

// Updated Banner type to support dynamic keys like infoImageMobile1, infoImageMobile2...
interface Banner {
  targetTime: Date;
  bannerChar: string;
  infoImageDesktop: string;
  infoImageMobile: string;
  backgroundVideo: string;
  colorChoice: ColorChoice;
  characterInfo: CharacterInfo;

  // Index signature for dynamic keys (like infoImageMobile1, infoImageMobile2, etc.)
  [key: `infoImageMobile${number}`]: string;
}

export const useBannerStore = defineStore("banner", () => {
  const banners = ref<Banner[]>([
    {
      targetTime: new Date(Date.UTC(2025, 9, 30, 3, 0, 0)),
      bannerChar: "QIYUAN",
      infoImageDesktop: "/images/qiyuancard.png",
      infoImageMobile: "/images/qiyuanwp.png",
      infoImageMobile1: "/images/qiyuanwp.png",
      infoImageMobile2: "/images/qiyuancard.png",
      backgroundVideo: "/images/qiyuanwp.png",
      colorChoice: "info",
      characterInfo: {
        name: "Qiyuan",
        element: "Aero",
        weapon: "Sword",
        about: '"One strike, to settle it all.."-Qiyuan',
      },
    },
   
    {
      targetTime: new Date(Date.UTC(2025, 10, 19, 3, 0, 0)),
      bannerChar: "Buling",
      infoImageDesktop: "/images/chisacard.webp",
      infoImageMobile: "/images/chisawp.png",
      infoImageMobile1: "/images/qiyuanwp.png",
      infoImageMobile2: "/images/chisawp.png",
      backgroundVideo: "/images/chisawp.png",
      colorChoice: "warning",
      characterInfo: {
        name: "Chisa",
        element: "Havoc",
        weapon: "Broadblade",
        about: 'Chisa is an upcoming Resonator in Wuthering Waves',
      },
    },
  ]);

  const getBanner = (index: number) => {
    return banners.value[index] || banners.value[0];
  };

  const bannersCount = computed(() => banners.value.length);

  return {
    banners,
    getBanner,
    bannersCount,
  };
});
