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
    gridTemplateColumns: "340px 1fr",
    gap: "16px",
    alignItems: "start",
  },

  /* Left panel card */
  leftPanel: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    border: "1px solid #e1e3e5",
    overflow: "hidden",
  },

  /* Tab strip — custom, no Polaris web component equivalent */
  tabsBar: {
    display: "flex",
    borderBottom: "1px solid #e1e3e5",
  },
  tabBtn: {
    flex: 1,
    padding: "12px 4px",
    border: "none",
    borderBottom: "2px solid transparent",
    background: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "400",
    color: "#6d7175",
    transition: "color .15s, border-color .15s",
  },
  tabBtnActive: {
    fontWeight: "600",
    color: "#303030",
    borderBottom: "2px solid #303030",
    marginBottom: "-1px",
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
    gap: "12px",
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
  },
  iconButtons: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
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
  },

  /* ── Right panel ── */
  rightPanel: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  previewBar: {
    backgroundColor: "#ffffff",
    border: "1px solid #e1e3e5",
    borderRadius: "8px",
    padding: "20px 24px",
    textAlign: "center",
  },

  /* Skeleton card */
  skeletonCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e1e3e5",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    gap: "14px",
    alignItems: "flex-start",
  },
  skeletonThumb: {
    width: "52px",
    height: "52px",
    borderRadius: "6px",
    backgroundColor: "#e1e3e5",
    flexShrink: 0,
  },
  skeletonLines: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "9px",
    paddingTop: "6px",
  },
  skeletonLine: {
    height: "12px",
    borderRadius: "4px",
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
  colorPickerWrapper: {
    
  },
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
  },
  file: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0,
    cursor: "pointer",
  },
};
