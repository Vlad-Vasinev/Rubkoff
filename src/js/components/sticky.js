

import Sticky from "sticky-js";

export function catalogStickyTagsInit(){
  if(!isMobile()) return
  const el = document.querySelector(".catalog-tags[js-sticky]")
  if(!el) return
  const wrp = el.closest(".sticky-wrapper")
  if(!wrp) return
  
  wrp.style.setProperty("height", getComputedStyle(wrp).height)

  el.dataset.stickyClass = "_sticked";
  const headerBottom = document.querySelector(".header .header__inner").getBoundingClientRect().bottom.toFixed(0)
  
  const marginTop = (+headerBottom) + "px";
  
  el.dataset.marginTop = marginTop;
  el.style.setProperty("--stickyMarginTop", marginTop);
  
  const sticky = new Sticky(".catalog-tags[js-sticky]");
}

export function projectStickyTableInit(){
  if(isMobile()) return
  
  const el = document.querySelector(".page__container_project .desc-table")
  if(!el) return

  el.dataset.stickyClass = "_sticked";
  const headerBottom = document.querySelector(".header .header__inner").getBoundingClientRect().bottom.toFixed(0)
  
  const marginTop = (+headerBottom) + aPixels(8) + "px";
  
  el.dataset.marginTop = marginTop;
  el.style.setProperty("--stickyMarginTop", marginTop);
  
  const sticky = new Sticky(".page__container_project .desc-table");
}

