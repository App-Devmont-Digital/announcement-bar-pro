/* ─────────────────────────────────────────
   Styles object
───────────────────────────────────────── */
export const styles = {
  pageWrapper: {
    backgroundColor: "#f1f1f1",
    minHeight: "100vh",
    // fontFamily: '"Raleway", sans-serif !important',
    margin: "20px 0 40px",
  },

  mainTitle: {
    fontWeight: "700",
    fontSize: "13px",
    color: "#303030",
    margin: "0",
    fontFamily: '"Inter", sans-serif',
    // fontFamily: '"Raleway", sans-serif',
  },

  /* Top bar */
  topBar: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e1e3e5",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  topBarLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  label: {
    fontSize: "13px",
    color: "#303030",
    fontWeight: "600",
    margin: 0,
    paddingBottom: "1.5px",

    // paddingBottom:'5px'
  },
  labelDetail: {
    fontSize: "13px",
    color: "#5f5f5f",
  },

  /* Page container */

  /* Upgrade banner */
  upgradeBanner: {
    backgroundColor: "#fdf3d0",
    border: "1px solid #e1b878",
    borderRadius: "8px",
    padding: "14px 16px",
    marginBottom: "16px",
  },
  upgradeBannerInner: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
  },
  warningIcon: {
    fontSize: "16px",
    color: "#916a00",
    marginTop: "2px",
  },
  upgradeBannerTitle: {
    fontWeight: "600",
    fontSize: "14px",
    margin: "0 0 6px 0",
    color: "#303030",
  },
  upgradeList: {
    margin: "0",
    paddingLeft: "18px",
    fontSize: "14px",
    color: "#303030",
    lineHeight: "1.7",
  },

  /* Two-column grid */
  twoCol: {
    display: "grid",
    gridTemplateColumns: "420px 1fr",
    gap: "16px",
    alignItems: "start",
  },

  /* Left panel card */
  leftPanel: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    border: "1px solid #D6D3D3",
    overflow: "hidden",
  },

  /* Tab strip — custom, no Polaris web component equivalent */
  tabsBar: {
    display: "flex",
    backgroundColor: "#fff",
    padding: "16px",
    gap: "10px",
  },
  tabBtn: {
    flex: 1,
    padding: "6px 4px",
    border: "none",
    // borderBottom: "2px solid transparent",
    background: "#dedede",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    color: "#303030",
    transition: "color .15s, border-color .15s",
    borderRadius: "2px",
    fontFamily: '"Inter", sans-serif',
    borderRadius: "6px",
    backgroundColor: "#F0F0F0",
  },
  tabBtnActive: {
    fontWeight: "500",
    color: "#fff",
    marginBottom: "-1px",
    backgroundColor: "#424242",
  },

  /* Scrollable panel body */
  leftBody: {
    // overflowY: "auto",
    // maxHeight: "calc(100vh - 190px)",
  },

  /* Section padding wrapper */
  section: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    // gap: "12px",
  },

  /* Thin divider line */
  divider: {
    height: "1px",
    backgroundColor: "#e1e3e5",
  },

  /* Radio group container */
  radioGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  /* Row that sits a radio next to a badge */
  radioWithBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  /* Generic field wrapper */
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  /* Row label + badge */
  rowWithBadge: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },

  /* Icon picker layout */
  iconRow: {
    display: "grid",
    gridTemplateColumns: "64px 1fr",
    gap: "10px",
    alignItems: "start",
  },
  iconPreviewBox: {
    width: "64px",
    height: "64px",
    border: "1px solid #e1e3e5",
    borderRadius: "8px",
    backgroundColor: "#f9fafb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  removeIcon: {
    position: "absolute",
    top: "1px",
    left: "1px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding:'0'
  },
  iconButtons: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
    paddingTop: "10px",
  },
  link: {
    color: "#2c6ecb",
    textDecoration: "none",
  },

  /* Scheduling sub-blocks */
  scheduleBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  /* Continue button area */
  continueBtn: {
    padding: "12px 16px 18px",
    display: "flex",
    justifyContent: "flex-end",
  },

  /* ── Right panel ── */
  rightPanel: {
    display: "flex",
    flexDirection: "column",
    position: "sticky",
    top: "5px",
    overflow: "hidden",
   
  },
  liveBox: {
    border: "1px solid #E2E2E2",
    borderRadius: "10px",
  },
  liveBoxBar: {
    backgroundColor: "#F6F6F7",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "12px 16px 14px",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  liveTabs: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  tabDot: {
    borderRadius: "55px",
    width: "11px",
    height: "11px",
  },
  urlViewBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    padding: "8px 16px",
    flex: 1,
  },
  urlText: {
    color: "#a1a1a1",
    fontFamily: '"Inter", sans-serif',
    fontSize: "12px",
    fontWeight: "300",
    margin: 0,
  },

  previewBar: {
    // padding: "10px 16px",
    position: "relative",
  },
  previewInnerWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    justifyContent: "center",
  },
  previewBarContent: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  previewTextContent: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    width: "100%",
  },
  subHeading: {
    margin: "0",
    paddingTop: "2px",
    lineHeight: "1.4",
  },

  previewText: {
    margin: "0",
    // flex: "1",
    lineHeight: "1.2",
    fontWeight: "bold",
  },
  previewButton: {
    textDecoration: "none",
    whiteSpace: "nowrap",
    lineHeight: 1.5,
  },
  blurBackground: {
    position: "absolute",
    inset: "0px",
    backgroundColor: " rgba(255, 255, 255, 0)",
    backdropFilter: "blur(4px)",
    pointerEvents: "none",
  },
  closeIcon: {
    position: "relative",
    border: 0,
    outline: "none",
    background: "none",
    cursor: "pointer",
  },

  /* Skeleton card */
  skeletonCard: {
    backgroundColor: "#f6f6f7",
    border: "1px solid #e1e3e5",
    borderRadius: "0 0 4px 4px",
    padding: "22px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    border: "1px solid #f6f6f7",
  },
  boxGrid: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },
  skeletonThumb: {
    width: "130px",
    height: "38px",
    borderRadius: "4px",
    backgroundColor: "#e1e3e5",
    flexShrink: 0,
  },
  skeletonLines: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "9px",
  },
  skeletonLine: {
    height: "12px",
    borderRadius: "4px",
    backgroundColor: "#e1e3e5",
  },

  boxSkeleton: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  skeletonThumbBox: {
    flex: "1",
    height: "150px",
    borderRadius: "8px",
    backgroundColor: "#e1e3e5",
  },

  /* Combine banner */
  combineBanner: {
    backgroundColor: "#ffffff",
    border: "1px solid #e1e3e5",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  combineBannerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  combineBannerHeaderRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  /* Plain close button — no Polaris WC equivalent for icon-only dismiss */
  closeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    color: "#6d7175",
    padding: "2px 6px",
    borderRadius: "4px",
    lineHeight: 1,
  },

  /* Product card inside combine banner */
  productCard: {
    border: "1px solid #e1e3e5",
    borderRadius: "8px",
    overflow: "hidden",
  },
  productCardTopBar: {
    padding: "10px 14px",
    borderBottom: "1px solid #e1e3e5",
    textAlign: "center",
    backgroundColor: "#fafafa",
  },
  productCardBody: {
    padding: "12px 14px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  progressTrack: {
    height: "6px",
    backgroundColor: "#e1e3e5",
    borderRadius: "3px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#303030",
    borderRadius: "3px",
  },
  productRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  productThumb: {
    width: "44px",
    height: "44px",
    borderRadius: "6px",
    backgroundColor: "#f0e6da",
    border: "1px solid #e1e3e5",
    flexShrink: 0,
  },
  productInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  colorPickerWrapper: {},
  colorPicker: {
    height: "33px",
    width: "50px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  bgImageBoxContainer: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  bgImageBox: {
    width: "50px",
    height: "50px",
    objeftFit: "cover",
    borderRadius: "6px",
    border: "1px solid rgb(186, 191, 195)",
  },
  btn: {
    borderRadius: "0.5rem",
    backgroundColor: "#fff",
    border: "0",
    outline: "0",
    boxShadow:
      "0rem -.0625rem 0rem 0rem #b5b5b5 inset, 0rem 0rem 0rem .0625rem rgba(0, 0, 0, .1) inset, 0rem .03125rem 0rem .09375rem #FFF inset",
    padding: "6px 16px",
    width: "100%",
    cursor: "pointer",
    textAlign: "center",
    color: "#303030",
    fontWeight: "500",
    fontSize: "13px",
  },
  file: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0,
    cursor: "pointer",
    outline: "none",
    border: 0,
  },
  statNumberStyle: {
    fontSize: "1.3rem",
    fontWeight: "700",
    lineHeight: "1.2",
    margin: "0",
    color: "#000",
    marginTop: "0.3rem",
    paddingLeft: "4px",
  },

  emptyStateStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem",
    gap: "1rem",
    textAlign: "center",
  },

  emptyIconStyle: {
    width: "60px",
    height: "60px",
    color: "#000",
  },

  emptyTitleStyle: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "0",
    paddingBottom: "0.3rem",
    color: "#000",
  },

  emptySubtitleStyle: {
    fontSize: "0.875rem",
    margin: "0",
    color: "#000",
  },
};
