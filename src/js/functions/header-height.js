
export const getHeaderHeight = () => {
  const headerHeight = document?.querySelector('.header__inner')?.offsetHeight;
  if(!headerHeight) return
  if (isMobile()) {
    document.body.style.setProperty('--header-height', `${headerHeight}px`)
    
    const mobileLogo = document?.querySelector('.header__mobile-logo').offsetHeight;
    document.body.style.setProperty('--mobile-logo-height', `${mobileLogo}px`)
  }
  else {
    document.body.style.setProperty('--header-height', `${(headerHeight / window.innerWidth * 100)?.toFixed(3)}vw`);
  }
}
