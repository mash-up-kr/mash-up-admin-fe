interface OptionsOfScrollTo {
  useAnimation?: boolean;
}

export const scrollTo = (x: number, y: number, options?: OptionsOfScrollTo) => {
  if (options?.useAnimation) {
    document.documentElement.style.scrollBehavior = 'smooth';
    window.scrollTo(x, y);
    document.documentElement.style.scrollBehavior = 'auto';
  } else {
    window.scrollTo(x, y);
  }
};
