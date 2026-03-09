import { create } from "zustand";

const useStore = create((set) => ({
  // Design Settings
  designSettings: {
    position: "top-page",
    template: 1,
    cardBg: "single-bg",
    gradientRange: [0, 50],
    //colors
    singleBgColor: "#ffffff",
    gradeintColor1: "#dddddd",
    gradeintColor2: "#ffffff",
    blurBackground: true,
    cornerRadius: 0,
    borderSize: 0,
    borderColor: "#ffffff",

    textSize: 18,
    textColor: "#202223",
    subheadingSize: 14,
    subheadingColor: "#202223",

    btnColor: "#000000",
    btnTextSize: 14,
    btnTextColor: "#ffffff",
    btnRadius: 0,
  },

  // Content
  content: {
    announcementType: "simple-announce",
    name: "Announcement name",
    title: "Enjoy a 20% discount on all our products!",
    subheading: "",
    icon: "",
    callToAction: "button",
    showCloseIcon: false,
    buttonText: "Shop Now!",
    buttonLink: "#",
    scheduleStart: "right-now",
    scheduleEnd: "never",
  },

  placement: "every",
  placementRules: {
    include_templates: ["index", "product"],
    exclude_templates: ["page.contact"],
  },

  // Action to update a specific field inside designSettings
  updateContent: (field, value) =>
    set((state) => ({
      content: {
        ...state.content, // Spread existing settings so they aren't lost
        [field]: value, // Overwrite the specific field
      },
    })),

  // Action to update a specific field inside designSettings
  updateDesign: (field, value) =>
    set((state) => ({
      designSettings: {
        ...state.designSettings, // Spread existing settings so they aren't lost
        [field]: value, // Overwrite the specific field
      },
    })),

  setPlacement: (value) => set({ placement: value }),
  setPlacementRules: (rules) => set({ placementRules: rules }),

  setAll: (data) =>
    set({
      designSettings:
        typeof data?.designSettings === "string"
          ? JSON.parse(data?.designSettings)
          : data?.designSettings,
      content:
        typeof data?.content === "string"
          ? JSON.parse(data?.content)
          : data?.content,
    }),
}));

export default useStore;
