import { create } from "zustand";

const useStore = create((set) => ({
  uploadFile: null,
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
    bgImageUrl: "https://vamxifegjdrgriapwsjg.supabase.co/storage/v1/object/public/main/bg-images/bg-3.jpg",
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
    include_templates: [],
    exclude_templates: [],
  },

  // Now an Array of announcement objects
  multiContent: [
    {
      id: crypto.randomUUID(), // Unique ID for keying
      title: "Enjoy 20% off your purchase!",
      subheading: "",
      icon: "",
      callToAction: "button",
      showCloseIcon: false,
      buttonText: "Shop Now!",
      buttonLink: "#",
    },
    {
      id: crypto.randomUUID(), // Unique ID for keying
      title: "Enjoy 20% off your purchase!",
      subheading: "",
      icon: "",
      callToAction: "button",
      showCloseIcon: false,
      buttonText: "Shop Now!",
      buttonLink: "#",
    },
  ],

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
  setUploadFile: (value) => set({ uploadFile: value }),

  // Actions for multi update contents

  // Update a specific field for a specific announcement index
  updateContentAt: (index, field, value) =>
    set((state) => {
      const newContents = [...state.multiContent];
      newContents[index] = { ...newContents[index], [field]: value };
      return { multiContent: newContents };
    }),

  addContent: () =>
    set((state) => ({
      multiContent: [
        ...state.multiContent,
        {
          id: crypto.randomUUID(), // Unique ID for keying
          title: "Enjoy a 20% discount!",
          subheading: "",
          icon: "",
          callToAction: "button",
          showCloseIcon: false,
          buttonText: "Shop Now!",
          buttonLink: "#",
        },
      ],
    })),

  // Remove an announcement
  removeContent: (index) =>
    set((state) => ({
      multiContent: state.multiContent?.filter((_, i) => i !== index),
    })),

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
